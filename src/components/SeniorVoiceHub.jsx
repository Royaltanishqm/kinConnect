import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Heart, 
  PhoneCall, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Pause, 
  ArrowRight,
  Sun,
  Smile,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechService } from '../services/speechService';
import { SAMPLE_SENIOR_PRESETS } from '../data/mockData';

export default function SeniorVoiceHub({ 
  onSendSeniorMessage, 
  familyUpdates, 
  dailyStory,
  onOpenHelp 
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [recentSentSummary, setRecentSentSummary] = useState(null);
  const [feedbackNotice, setFeedbackNotice] = useState('');

  // Handle Speech Recognition toggle
  const handleToggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedbackNotice('');
      setIsListening(true);
      speechService.startListening(
        (text) => {
          setTranscript(text);
        },
        (err) => {
          setIsListening(false);
          setFeedbackNotice('Microphone not available. Please tap one of the quick suggestions below!');
        }
      );
    }
  };

  // Submit senior message to family
  const handleSendMessage = (textToSend) => {
    const text = textToSend || transcript;
    if (!text.trim()) return;

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    }

    const processed = onSendSeniorMessage(text);
    setRecentSentSummary(processed.summary_for_senior);
    setTranscript('');
    speechService.playGentleChime('success');

    // Friendly voice confirmation back to senior
    speechService.speakText(processed.readAloudConfirmation);

    // Celebratory visual warmth
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#EA580C', '#F59E0B', '#10B981']
      });
    } catch (e) {}

    setTimeout(() => {
      setRecentSentSummary(null);
    }, 9000);
  };

  // Play / Pause Today's Family Story
  const handleToggleStoryAudio = () => {
    if (isPlayingStory) {
      speechService.stopSpeaking();
      setIsPlayingStory(false);
    } else {
      setIsPlayingStory(true);
      speechService.speakText(
        dailyStory.fullStoryText,
        () => setIsPlayingStory(true),
        () => setIsPlayingStory(false)
      );
    }
  };

  // Preset selector
  const handleSelectPreset = (presetText) => {
    setTranscript(presetText);
    handleSendMessage(presetText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Top Senior Header: High contrast, large fonts, clear orientation */}
      <header className="bg-white rounded-3xl p-6 shadow-senior border-2 border-amber-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl border border-amber-200">
            👵
          </div>
          <div>
            <div className="flex items-center gap-2 text-amber-800 font-semibold text-lg">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Good morning, Eleanor</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              KinConnect Voice Home
            </h1>
            <p className="text-slate-600 text-base font-medium">
              Saturday • 72° Sunny & Peaceful
            </p>
          </div>
        </div>

        {/* Permanent friendly quick actions (Zero nested menus) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHelp}
            className="min-h-[64px] px-6 rounded-2xl bg-amber-50 text-amber-900 border-2 border-amber-300 font-bold text-lg flex items-center gap-2.5 hover:bg-amber-100 active:scale-95 transition-all shadow-sm"
            aria-label="Need Help or Ask AI Companion"
          >
            <HelpCircle className="w-6 h-6 text-amber-600" />
            <span>Need Help?</span>
          </button>

          <a
            href="tel:5550199"
            onClick={(e) => {
              e.preventDefault();
              alert('Calling your son Rahul on speakerphone...');
            }}
            className="min-h-[64px] px-6 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center gap-2.5 hover:bg-emerald-700 active:scale-95 transition-all shadow-md"
            aria-label="Call Rahul Now"
          >
            <PhoneCall className="w-6 h-6" />
            <span>Call Rahul</span>
          </a>
        </div>
      </header>

      {/* Main Voice Hub (The Central Experience) */}
      <section className="bg-gradient-to-b from-white to-amber-50/40 rounded-3xl p-8 md:p-10 shadow-senior border-2 border-orange-200 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-900 font-bold text-sm tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-orange-600" />
            Senior Voice Companion
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Tap Once &amp; Speak to Your Family
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed font-normal">
            No typing or complicated screens. Speak naturally—our warm AI polishes your message and delivers it with love.
          </p>

          {/* THE GIANT MICROPHONE BUTTON (Minimum 120px, high contrast, pulsing) */}
          <div className="py-6 flex flex-col items-center justify-center">
            <button
              onClick={handleToggleListening}
              className={`relative group w-36 h-36 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl focus:outline-none ${
                isListening
                  ? 'bg-red-600 text-white shadow-red-400/50 scale-105 animate-pulse'
                  : 'bg-gradient-to-br from-orange-500 to-amber-600 text-white hover:shadow-glow-mic hover:scale-105'
              }`}
              aria-label={isListening ? 'Stop Listening' : 'Tap & Speak to Family'}
            >
              {/* Pulsing ring indicator */}
              {isListening && (
                <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></span>
              )}

              {isListening ? (
                <>
                  <MicOff className="w-14 h-14 md:w-16 md:h-16 mb-1" />
                  <span className="text-sm font-bold tracking-wider uppercase">Listening</span>
                </>
              ) : (
                <>
                  <Mic className="w-14 h-14 md:w-16 md:h-16 mb-1 drop-shadow-md" />
                  <span className="text-sm font-extrabold tracking-wider uppercase">Tap &amp; Speak</span>
                </>
              )}
            </button>

            {/* Clear Status Under Button */}
            <div className="mt-4 min-h-[32px]">
              {isListening ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-900 rounded-full font-bold text-lg animate-pulse">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
                  Listening carefully... Speak anytime
                </div>
              ) : (
                <p className="text-slate-600 text-lg font-medium">
                  Tap the big button above when you're ready
                </p>
              )}
            </div>
          </div>

          {/* Live Transcript / Speech Input Card */}
          {(transcript || isListening) && (
            <div className="bg-white rounded-2xl p-6 border-2 border-orange-300 text-left shadow-md space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-slate-600 border-b pb-2">
                <span className="font-bold text-base flex items-center gap-2">
                  <Smile className="w-5 h-5 text-orange-600" />
                  What We Heard You Say:
                </span>
                <span className="text-xs uppercase font-bold text-orange-600 tracking-wider">
                  Live Audio Transcription
                </span>
              </div>

              <p className="text-2xl text-slate-900 font-serif leading-relaxed italic">
                "{transcript || 'Listening to your voice...'}"
              </p>

              {transcript && (
                <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                  <button
                    onClick={() => setTranscript('')}
                    className="min-h-[56px] px-5 rounded-xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-100 text-lg"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => handleSendMessage()}
                    className="min-h-[56px] px-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl flex items-center gap-3 shadow-lg transform active:scale-95 transition-all"
                  >
                    <Heart className="w-6 h-6 fill-white" />
                    <span>Send to Family with Love</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Success Reassurance Banner */}
          {recentSentSummary && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 text-emerald-950 text-left shadow-lg flex items-start gap-4 animate-fadeIn">
              <CheckCircle2 className="w-9 h-9 text-emerald-600 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-emerald-900">
                  Message Safely Sent!
                </h4>
                <p className="text-lg text-emerald-800 font-medium leading-snug">
                  {recentSentSummary}
                </p>
                <p className="text-sm text-emerald-700 pt-1 font-semibold">
                  ✓ Spoken confirmation played • Delivered to Rahul, Priya &amp; Riya
                </p>
              </div>
            </div>
          )}

          {/* Feedback notice if mic is blocked */}
          {feedbackNotice && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-amber-900 text-base font-medium text-center">
              {feedbackNotice}
            </div>
          )}

          {/* Quick Voice Suggestions / Presets (For zero-friction or 1-tap testing) */}
          <div className="pt-4 text-left border-t border-amber-200">
            <p className="text-slate-700 font-bold text-lg mb-3 flex items-center gap-2">
              <span>💡 Or Tap a Quick Topic to Share:</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAMPLE_SENIOR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset.transcript)}
                  className="p-4 rounded-2xl bg-white hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-400 text-left transition-all active:scale-[0.98] group flex items-start gap-3 shadow-sm"
                >
                  <span className="text-2xl mt-0.5">💬</span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-base group-hover:text-orange-950">
                      {preset.label}
                    </h5>
                    <p className="text-slate-600 text-sm line-clamp-2 mt-0.5 leading-snug">
                      "{preset.transcript}"
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Today's Family Story (Audio-First Intergenerational Translation Player) */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-senior border-2 border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-700 font-bold text-base mb-1">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>Intergenerational Translation Layer</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Today's Gentle Family Story
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              We translated family messages &amp; photos into an easy, peaceful audio digest.
            </p>
          </div>

          {/* Big Audio Story Playback Button */}
          <button
            onClick={handleToggleStoryAudio}
            className={`min-h-[64px] px-8 rounded-2xl font-bold text-xl flex items-center gap-3 shadow-md transition-all active:scale-95 ${
              isPlayingStory
                ? 'bg-amber-600 text-white hover:bg-amber-700 animate-pulse'
                : 'bg-indigo-700 text-white hover:bg-indigo-800'
            }`}
            aria-label={isPlayingStory ? 'Pause Family Story' : 'Listen to Family Story'}
          >
            {isPlayingStory ? (
              <>
                <Pause className="w-7 h-7" />
                <span>Pause Story</span>
              </>
            ) : (
              <>
                <Volume2 className="w-7 h-7" />
                <span>Listen to Story (Audio)</span>
              </>
            )}
          </button>
        </div>

        {/* Audio narration preview box */}
        <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-6 text-slate-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase tracking-wider text-indigo-900">
              {isPlayingStory ? '🔊 Speaking at Calm, Senior-Friendly Pace...' : '📖 Story Narrative'}
            </span>
            <span className="text-xs text-indigo-700 font-medium">
              {dailyStory.itemsCount} Family Updates Included
            </span>
          </div>
          <p className="text-xl md:text-2xl text-slate-800 font-serif leading-relaxed">
            "{dailyStory.fullStoryText}"
          </p>
        </div>

        {/* High-contrast, large-font Visual Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {familyUpdates.map((update) => (
            <article
              key={update.id}
              className="bg-[#FAF8F5] rounded-2xl overflow-hidden border-2 border-amber-200/80 shadow-sm flex flex-col"
            >
              {update.photoUrl && (
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={update.photoUrl}
                    alt={update.photoAlt || 'Family photo'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-white px-3 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm">
                    {update.author} ({update.authorRelation})
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-sm font-bold">
                    <span>{update.timestamp}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      ✓ Slang Removed
                    </span>
                  </div>

                  <p className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug font-serif">
                    {update.normalizedStory}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
                  <button
                    onClick={() => speechService.speakText(update.audioReadyText || update.normalizedStory)}
                    className="min-h-[48px] px-4 rounded-xl bg-white border-2 border-slate-300 hover:border-orange-400 text-slate-800 font-bold text-base flex items-center gap-2"
                  >
                    <Volume2 className="w-5 h-5 text-orange-600" />
                    <span>Read this card</span>
                  </button>

                  <button
                    onClick={() => {
                      speechService.playGentleChime('success');
                      alert(`Sent a warm smile & hug to ${update.author}!`);
                    }}
                    className="min-h-[48px] px-4 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-800 font-bold text-base flex items-center gap-1.5 hover:bg-rose-100"
                  >
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                    <span>Send Hug</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
