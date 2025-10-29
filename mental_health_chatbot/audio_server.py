#!/usr/bin/env python3
"""
Simple Flask server that handles AssemblyAI realtime transcription
and streams results back to the React frontend via WebSocket.
"""

import asyncio
import json
import threading
import time
import wave
from datetime import datetime
from urllib.parse import urlencode

import pyaudio
import websocket
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# AssemblyAI Configuration
API_KEY = "383eeaa46adb438eaee7e955a9fcc132"
CONNECTION_PARAMS = {
    "sample_rate": 16000,
    "format_turns": True
}
API_ENDPOINT_BASE_URL = "wss://streaming.assemblyai.com/v3/ws"
API_ENDPOINT = f"{API_ENDPOINT_BASE_URL}?{urlencode(CONNECTION_PARAMS)}"

# Audio Configuration
FRAMES_PER_BUFFER = 800  # 50ms of audio
SAMPLE_RATE = CONNECTION_PARAMS["sample_rate"]
CHANNELS = 1
FORMAT = pyaudio.paInt16

# Global state
active_sessions = {}

class TranscriptionSession:
    def __init__(self, session_id, socketio_session):
        self.session_id = session_id
        self.socketio_session = socketio_session
        self.audio = None
        self.stream = None
        self.ws_app = None
        self.audio_thread = None
        self.stop_event = threading.Event()
        self.recorded_frames = []
        self.recording_lock = threading.Lock()
        self.is_active = False

    def start_recording(self):
        """Start the transcription session."""
        try:
            # Initialize PyAudio
            self.audio = pyaudio.PyAudio()
            
            # Open microphone stream
            self.stream = self.audio.open(
                input=True,
                frames_per_buffer=FRAMES_PER_BUFFER,
                channels=CHANNELS,
                format=FORMAT,
                rate=SAMPLE_RATE,
            )
            
            # Create WebSocket connection to AssemblyAI
            self.ws_app = websocket.WebSocketApp(
                API_ENDPOINT,
                header={"Authorization": API_KEY},
                on_open=self.on_open,
                on_message=self.on_message,
                on_error=self.on_error,
                on_close=self.on_close,
            )
            
            # Start WebSocket in a separate thread
            ws_thread = threading.Thread(target=self.ws_app.run_forever)
            ws_thread.daemon = True
            ws_thread.start()
            
            self.is_active = True
            return True
            
        except Exception as e:
            print(f"Error starting recording: {e}")
            self.cleanup()
            return False

    def stop_recording(self):
        """Stop the transcription session."""
        self.stop_event.set()
        self.is_active = False
        
        if self.ws_app and self.ws_app.sock and self.ws_app.sock.connected:
            try:
                terminate_message = {"type": "Terminate"}
                self.ws_app.send(json.dumps(terminate_message))
                time.sleep(1)  # Give time for termination
            except Exception as e:
                print(f"Error sending termination: {e}")
        
        if self.ws_app:
            self.ws_app.close()
        
        self.cleanup()

    def cleanup(self):
        """Clean up audio resources."""
        if self.stream and self.stream.is_active():
            self.stream.stop_stream()
        if self.stream:
            self.stream.close()
        if self.audio:
            self.audio.terminate()

    def on_open(self, ws):
        """WebSocket opened - start streaming audio."""
        print(f"WebSocket opened for session {self.session_id}")
        
        def stream_audio():
            while not self.stop_event.is_set() and self.stream:
                try:
                    audio_data = self.stream.read(FRAMES_PER_BUFFER, exception_on_overflow=False)
                    
                    # Store for WAV recording
                    with self.recording_lock:
                        self.recorded_frames.append(audio_data)
                    
                    # Send to AssemblyAI
                    ws.send(audio_data, websocket.ABNF.OPCODE_BINARY)
                except Exception as e:
                    print(f"Error streaming audio: {e}")
                    break
        
        self.audio_thread = threading.Thread(target=stream_audio)
        self.audio_thread.daemon = True
        self.audio_thread.start()

    def on_message(self, ws, message):
        """Handle messages from AssemblyAI."""
        try:
            data = json.loads(message)
            msg_type = data.get('type')
            
            if msg_type == "Turn":
                transcript = data.get('transcript', '')
                formatted = data.get('turn_is_formatted', False)
                
                # Send to React frontend
                socketio.emit('transcript', {
                    'text': transcript,
                    'is_final': formatted,
                    'session_id': self.session_id
                }, room=self.socketio_session)
                
        except Exception as e:
            print(f"Error handling message: {e}")

    def on_error(self, ws, error):
        """Handle WebSocket errors."""
        print(f"WebSocket error for session {self.session_id}: {error}")
        socketio.emit('error', {'message': str(error)}, room=self.socketio_session)

    def on_close(self, ws, close_status_code, close_msg):
        """Handle WebSocket close."""
        print(f"WebSocket closed for session {self.session_id}: {close_status_code}")
        self.cleanup()
        socketio.emit('session_ended', {'session_id': self.session_id}, room=self.socketio_session)

@socketio.on('start_recording')
def handle_start_recording():
    """Start a new transcription session via SocketIO."""
    session_id = f"session_{int(time.time())}"
    
    # Create new session
    session = TranscriptionSession(session_id, request.sid)
    active_sessions[session_id] = session
    
    if session.start_recording():
        emit('recording_started', {'session_id': session_id})
    else:
        del active_sessions[session_id]
        emit('error', {'message': 'Failed to start recording'})

@socketio.on('stop_recording')
def handle_stop_recording(data):
    """Stop a transcription session via SocketIO."""
    session_id = data.get('session_id')
    if session_id and session_id in active_sessions:
        active_sessions[session_id].stop_recording()
        del active_sessions[session_id]
        emit('recording_stopped', {'session_id': session_id})
    else:
        emit('error', {'message': 'Session not found'})

@socketio.on('connect')
def handle_connect():
    """Handle client connection."""
    print(f"Client connected: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection."""
    print(f"Client disconnected: {request.sid}")
    # Clean up any active sessions for this client
    sessions_to_remove = [sid for sid, session in active_sessions.items() 
                         if session.socketio_session == request.sid]
    for sid in sessions_to_remove:
        active_sessions[sid].stop_recording()
        del active_sessions[sid]

if __name__ == '__main__':
    print("Starting audio transcription server...")
    print("Make sure to install dependencies: pip install flask flask-cors flask-socketio websocket-client pyaudio")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
