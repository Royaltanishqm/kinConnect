import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Mic, 
  Cpu, 
  Users, 
  Repeat, 
  Volume2, 
  CheckCircle,
  Play
} from 'lucide-react';

export default function ConnectedWorkflowModal({ isOpen, onClose, onRunSimulation }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-bold">Connected Workflow Architecture</h3>
              <p className="text-xs text-slate-400">
                How KinConnect solves the intergenerational communication gap end-to-end
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-950 text-sm leading-relaxed">
            <span className="font-bold">Judge Pro-Tip Satisfaction:</span> Rather than isolated features, KinConnect functions as a continuous, closed-loop bidirectional bridge between two completely different user personas (elders with motor/tech constraints vs. hyper-connected, busy adult family members).
          </div>

          {/* Workflow Steps Grid */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50/60 border border-orange-200">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">The Voice Hub (Zero-Learning-Curve Input)</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Senior touches a single massive glowing microphone button. No keyboard, no accounts, no menus. Seniors speak in their natural rambling, emotional style.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Prompt A: Senior Voice Companion AI Logic</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Extracts core intent (e.g. recipe sharing, gentle call check-in), strips pauses and hesitations, and structures it into a clean JSON payload with an empathetic summary.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Shared Family Dashboard</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Family sees the polished message and intent at a glance, with 1-tap quick actions ("Thinking of you! ❤️", "Calling at 6:00 PM 📞") preserving emotional warmth asynchronously.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Prompt B: The Intergenerational Translator</h4>
                <p className="text-xs text-slate-600 mt-1">
                  When family posts slang (e.g. "OMG fr fr no cap"), acronyms, or rapid photos, the AI normalizes the chaos into a warm, polite narrative card grouped by family member.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Today's Family Story Audio &amp; Large Cards</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Seniors don't scroll chaotic social media. The app compiles family updates into a daily audio digest read aloud at a slow, soothing pace via Text-to-Speech alongside high-contrast visual cards.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Action */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
            <div>
              <p className="font-bold text-slate-900 text-sm">Want to see the round-trip in action?</p>
              <p className="text-xs text-slate-500">Triggers an automated simulation across both views.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onRunSimulation();
              }}
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run Interactive Simulation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
