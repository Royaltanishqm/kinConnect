import React from 'react';
import { X, Phone, Heart, Music, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function HelpCompanionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleCompanionSpeak = (text) => {
    speechService.speakText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-amber-200 overflow-hidden flex flex-col p-6 md:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border-2 border-amber-300 flex items-center justify-center text-3xl">
              🤝
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Friendly Help &amp; Companion
              </h3>
              <p className="text-base text-slate-600 font-medium">
                We are always right here with you, Eleanor.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center justify-center text-lg font-bold"
            aria-label="Close Help"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big Touch Targets (Minimum 64px height) */}
        <div className="grid grid-cols-1 gap-4">
          {/* Action 1: Call Rahul */}
          <button
            onClick={() => {
              speechService.playGentleChime('start');
              alert('Dialing your son Rahul directly on speakerphone...');
              onClose();
            }}
            className="min-h-[72px] p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl flex items-center justify-between shadow-md active:scale-98 transition-all"
          >
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8" />
              <div className="text-left">
                <div>Call Son Rahul</div>
                <div className="text-sm font-normal text-emerald-100">Direct phone call on speakerphone</div>
              </div>
            </div>
            <span className="text-2xl">📞</span>
          </button>

          {/* Action 2: Listen to calming words */}
          <button
            onClick={() => {
              handleCompanionSpeak("Hello dear Eleanor. Take a deep breath. Your family loves you dearly, you are safe, and everyone is thinking of you today.");
              onClose();
            }}
            className="min-h-[72px] p-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl flex items-center justify-between shadow-md active:scale-98 transition-all"
          >
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8" />
              <div className="text-left">
                <div>Speak with AI Companion</div>
                <div className="text-sm font-normal text-indigo-100">Listen to a calming reassuring voice</div>
              </div>
            </div>
            <span className="text-2xl">🕊️</span>
          </button>

          {/* Action 3: Play a favorite memory */}
          <button
            onClick={() => {
              handleCompanionSpeak("Playing the audio memo from last Thanksgiving, where little Riya and Arjun sang together.");
              speechService.playGentleChime('success');
              alert('Playing favorite family holiday recording...');
              onClose();
            }}
            className="min-h-[72px] p-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl flex items-center justify-between shadow-md active:scale-98 transition-all"
          >
            <div className="flex items-center gap-4">
              <Music className="w-8 h-8" />
              <div className="text-left">
                <div>Play Favorite Voice Memo</div>
                <div className="text-sm font-normal text-amber-100">Hear the grandkids' holiday singing</div>
              </div>
            </div>
            <span className="text-2xl">🎶</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center">
          <p className="text-sm text-slate-500 font-medium">
            For emergencies, please press 911 or your physical pendant button.
          </p>
        </div>

      </div>
    </div>
  );
}
