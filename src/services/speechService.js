// Speech Recognition & Synthesis Service tailored for seniors

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.initRecognition();
  }

  initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  isSpeechSupported() {
    return Boolean(this.recognition);
  }

  /**
   * Play a calm, gentle chime using Web Audio API
   */
  playGentleChime(type = 'start') {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'start') {
        // Ascending pleasant major chord (C5 -> E5 -> G5)
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3);
      } else if (type === 'stop') {
        // Calming resolved chord
        osc.frequency.setValueAtTime(659.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.25);
      } else {
        // Success celebration chime
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3);
      }

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn('Audio chime unsupported or blocked:', e);
    }
  }

  /**
   * Start listening to senior's microphone
   */
  startListening(onTranscript, onError) {
    if (!this.recognition) {
      if (onError) onError('Microphone recognition not supported in this browser. You can click any sample preset below!');
      return;
    }

    this.playGentleChime('start');
    this.isListening = true;

    this.recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const text = final || interim;
      if (onTranscript) onTranscript(text);
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('Recognition already started or error:', e);
    }
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.playGentleChime('stop');
    }
  }

  /**
   * Read aloud with slow, warm tone for seniors
   */
  speakText(text, onStart, onEnd) {
    if (!this.synth) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Slow, soothing cadence tailored for older adults
    utterance.rate = 0.88; 
    utterance.pitch = 1.02;
    utterance.volume = 1.0;

    // Pick a natural, warm voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}

export const speechService = new SpeechService();
