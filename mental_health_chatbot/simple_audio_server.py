#!/usr/bin/env python3
"""
Simple Flask-SocketIO server for speech-to-text functionality
"""

import json
import time
import threading
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

# Store active sessions
active_sessions = {}

@socketio.on('connect')
def handle_connect():
    print(f"✅ Client connected: {request.sid}")
    emit('connected', {'message': 'Connected to audio server'})

@socketio.on('disconnect')
def handle_disconnect():
    print(f"❌ Client disconnected: {request.sid}")
    # Clean up any active sessions for this client
    sessions_to_remove = [sid for sid, session in active_sessions.items() 
                         if session.get('client_id') == request.sid]
    for sid in sessions_to_remove:
        del active_sessions[sid]

@socketio.on('start_recording')
def handle_start_recording():
    print(f"🎤 Start recording requested from {request.sid}")
    session_id = f"session_{int(time.time())}"
    
    # Create session
    active_sessions[session_id] = {
        'client_id': request.sid,
        'start_time': time.time(),
        'is_recording': True
    }
    
    print(f"📝 Created session: {session_id}")
    emit('recording_started', {'session_id': session_id})
    
    # Simulate some transcription for testing
    def simulate_transcription():
        time.sleep(2)
        emit('transcript', {
            'text': 'Hello, this is a test transcription.',
            'is_final': True,
            'session_id': session_id
        })
        time.sleep(1)
        emit('transcript', {
            'text': 'This is another test message.',
            'is_final': True,
            'session_id': session_id
        })
    
    # Run simulation in background
    thread = threading.Thread(target=simulate_transcription)
    thread.daemon = True
    thread.start()

@socketio.on('stop_recording')
def handle_stop_recording(data):
    session_id = data.get('session_id')
    print(f"🛑 Stop recording requested for session: {session_id}")
    
    if session_id in active_sessions:
        active_sessions[session_id]['is_recording'] = False
        emit('recording_stopped', {'session_id': session_id})
        print(f"✅ Recording stopped for session: {session_id}")
    else:
        emit('error', {'message': 'Session not found'})
        print(f"❌ Session not found: {session_id}")

@socketio.on('test_message')
def handle_test_message(data):
    print(f"🧪 Test message received: {data}")
    emit('test_response', {'message': 'Test response from server', 'received': data})

if __name__ == '__main__':
    print("🚀 Starting simple audio transcription server...")
    print("📡 Server will run on http://localhost:5000")
    print("🔗 Socket.IO endpoint: http://localhost:5000/socket.io/")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)

