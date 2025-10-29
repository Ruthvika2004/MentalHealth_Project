/**
 * Speech-to-Text Service using Web Speech API
 * Provides real-time speech recognition functionality for the chatbot
 */

class SpeechToTextService {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.onResult = null;
    this.onError = null;
    this.onStart = null;
    this.onEnd = null;
    this.isSupported = false;
    
    this.initializeRecognition();
  }

  /**
   * Initialize the speech recognition
   */
  initializeRecognition() {
    // Check if speech recognition is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser');
      this.isSupported = false;
      return;
    }

    // Use the appropriate recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    // Configure recognition settings
    this.recognition.continuous = false; // Stop after user stops speaking
    this.recognition.interimResults = true; // Show interim results
    this.recognition.lang = 'en-US'; // Set language
    this.recognition.maxAlternatives = 1; // Only return the best result

    // Set up event handlers
    this.recognition.onstart = () => {
      console.log('Speech recognition started');
      this.isRecording = true;
      if (this.onStart) this.onStart();
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      // Process all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Call the result callback with both final and interim results
      if (this.onResult) {
        this.onResult({
          finalTranscript: finalTranscript.trim(),
          interimTranscript: interimTranscript.trim(),
          isFinal: finalTranscript.length > 0
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording = false;
      
      let errorMessage = 'Speech recognition error occurred';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech was detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone was found. Please check your microphone.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access was denied. Please allow microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error occurred. Please check your connection.';
          break;
        case 'aborted':
          errorMessage = 'Speech recognition was aborted.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      if (this.onError) this.onError(errorMessage);
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended');
      this.isRecording = false;
      if (this.onEnd) this.onEnd();
    };

    this.isSupported = true;
  }

  /**
   * Start speech recognition
   */
  startRecording() {
    if (!this.isSupported) {
      const error = 'Speech recognition is not supported in this browser';
      console.error(error);
      if (this.onError) this.onError(error);
      return false;
    }

    if (this.isRecording) {
      console.warn('Speech recognition is already running');
      return false;
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      if (this.onError) this.onError('Failed to start speech recognition');
      return false;
    }
  }

  /**
   * Stop speech recognition
   */
  stopRecording() {
    if (!this.isRecording) {
      console.warn('Speech recognition is not running');
      return false;
    }

    try {
      this.recognition.stop();
      return true;
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
      return false;
    }
  }

  /**
   * Abort speech recognition
   */
  abortRecording() {
    if (!this.isRecording) {
      return false;
    }

    try {
      this.recognition.abort();
      return true;
    } catch (error) {
      console.error('Failed to abort speech recognition:', error);
      return false;
    }
  }

  /**
   * Set event callbacks
   */
  setCallbacks({ onResult, onError, onStart, onEnd }) {
    this.onResult = onResult;
    this.onError = onError;
    this.onStart = onStart;
    this.onEnd = onEnd;
  }

  /**
   * Check if speech recognition is supported
   */
  isSpeechRecognitionSupported() {
    return this.isSupported;
  }

  /**
   * Get current recording state
   */
  getRecordingState() {
    return {
      isRecording: this.isRecording,
      isSupported: this.isSupported
    };
  }

  /**
   * Set recognition language
   */
  setLanguage(lang) {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  /**
   * Get available languages (if supported)
   */
  getAvailableLanguages() {
    // This is a basic list - in practice, you might want to check what's actually supported
    return [
      'en-US', 'en-GB', 'en-AU', 'en-CA',
      'es-ES', 'es-MX', 'fr-FR', 'de-DE',
      'it-IT', 'pt-BR', 'ru-RU', 'ja-JP',
      'ko-KR', 'zh-CN', 'zh-TW'
    ];
  }

  /**
   * Set continuous mode
   */
  setContinuous(continuous) {
    if (this.recognition) {
      this.recognition.continuous = continuous;
    }
  }

  /**
   * Set interim results
   */
  setInterimResults(interimResults) {
    if (this.recognition) {
      this.recognition.interimResults = interimResults;
    }
  }
}

// Create and export a singleton instance
const speechToTextService = new SpeechToTextService();

export default speechToTextService;
