# Speech-to-Text Integration

This document explains the speech-to-text functionality integrated into the mental health chatbot.

## Overview

The chatbot now includes real-time speech recognition using the Web Speech API, allowing users to speak their messages instead of typing them.

## Features

- **Real-time Speech Recognition**: Convert speech to text in real-time
- **Interim Results**: Shows partial transcription while speaking
- **Error Handling**: Comprehensive error handling for various scenarios
- **Browser Compatibility**: Works with Chrome, Edge, Safari, and other WebKit-based browsers
- **Visual Feedback**: Clear visual indicators for recording state and errors

## How It Works

### 1. Speech Recognition Service (`speechToTextService.js`)

The service provides a clean interface for speech recognition:

```javascript
import speechToTextService from './services/speechToTextService';

// Check if speech recognition is supported
if (speechToTextService.isSpeechRecognitionSupported()) {
  // Start recording
  speechToTextService.startRecording();
  
  // Stop recording
  speechToTextService.stopRecording();
}
```

### 2. Integration with Chat Interface

The speech recognition is integrated into the main chatbot interface:

- **Microphone Button**: Click to start/stop recording
- **Visual Feedback**: Button changes color and animates during recording
- **Interim Transcript**: Shows partial results while speaking
- **Error Display**: Shows helpful error messages if something goes wrong

### 3. User Experience

1. **Start Recording**: Click the microphone button
2. **Speak**: The system will show interim results as you speak
3. **Stop Recording**: Click the microphone button again or stop speaking
4. **Send Message**: The final transcript is automatically sent as a chat message

## Browser Support

### Supported Browsers
- **Chrome** (recommended)
- **Edge** (Chromium-based)
- **Safari** (iOS 14.5+)
- **Opera** (Chromium-based)

### Not Supported
- **Firefox** (limited support)
- **Internet Explorer**

## Error Handling

The system handles various error scenarios:

- **No Speech Detected**: "No speech was detected. Please try again."
- **Microphone Access Denied**: "Microphone access was denied. Please allow microphone access."
- **No Microphone**: "No microphone was found. Please check your microphone."
- **Network Issues**: "Network error occurred. Please check your connection."
- **Browser Not Supported**: "Speech recognition is not supported in this browser."

## Configuration

### Language Settings
The default language is set to English (US). You can change it:

```javascript
speechToTextService.setLanguage('es-ES'); // Spanish
speechToTextService.setLanguage('fr-FR'); // French
```

### Available Languages
- English (US, GB, AU, CA)
- Spanish (ES, MX)
- French (FR)
- German (DE)
- Italian (IT)
- Portuguese (BR)
- Russian (RU)
- Japanese (JP)
- Korean (KR)
- Chinese (CN, TW)

## Privacy and Security

- **Local Processing**: Speech recognition happens locally in the browser
- **No Data Storage**: Audio is not stored or transmitted to external servers
- **User Control**: Users can start/stop recording at any time
- **Permission Required**: Browser will ask for microphone permission on first use

## Troubleshooting

### Common Issues

1. **Microphone Not Working**
   - Check browser permissions
   - Ensure microphone is not being used by another application
   - Try refreshing the page

2. **Poor Recognition Accuracy**
   - Speak clearly and at a normal pace
   - Reduce background noise
   - Ensure good microphone quality

3. **Browser Compatibility**
   - Use Chrome or Edge for best results
   - Update your browser to the latest version
   - Check if JavaScript is enabled

### Development Notes

- The service uses the Web Speech API, which is built into modern browsers
- No external API keys or services are required
- The implementation is lightweight and doesn't require additional dependencies
- Error handling is comprehensive and user-friendly

## Future Enhancements

Potential improvements for future versions:

1. **Offline Support**: Implement offline speech recognition
2. **Custom Wake Words**: Add custom wake word detection
3. **Voice Commands**: Implement voice commands for navigation
4. **Multi-language Auto-detection**: Automatically detect the spoken language
5. **Audio Visualization**: Add audio waveform visualization during recording
