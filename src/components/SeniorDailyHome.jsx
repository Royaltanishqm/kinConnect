import React from 'react';
import { 
  Sun, 
  Sparkles, 
  Pill, 
  FileText, 
  ShieldCheck, 
  Compass, 
  Mic, 
  PhoneCall, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  Heart,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { speechService } from '../services/speechService';

export default function SeniorDailyHome({ onNavigateTab, onOpenHelp }) {
  const handleReadMorningBriefing = () => {
    const briefing = "Good morning, Eleanor. Today is Saturday, seventy-two degrees and sunny. You took your morning heart medication with breakfast. Up next: remember to enjoy a cool glass of lemon water at eleven thirty. Your family sends their warmest love, and your home is completely peaceful and safe.";
    speechService.speakText(briefing);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-fadeIn">
      {/* Top Welcome Header */}
      <header className="bg-gradient-to-r from-white via-amber-50/50 to-orange-50/40 rounded-3xl p-6 md:p-8 shadow-senior border-2 border-amber-200 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-4xl shadow-md border-2 border-white">
            👵
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-lg">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Good morning, Eleanor</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-serif">
              KinConnect Senior Companion
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Saturday • 72° Sunny &amp; Peaceful • 442 Elm Creek Road
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleReadMorningBriefing}
            className="min-h-[64px] px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-lg flex items-center gap-2.5 shadow-md active:scale-95 transition-all"
            aria-label="Read morning briefing aloud"
          >
            <Volume2 className="w-6 h-6" />
            <span>Read Morning Briefing</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="min-h-[64px] px-6 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-bold text-lg flex items-center gap-2 active:scale-95 transition-all"
          >
            <HelpCircle className="w-6 h-6 text-amber-700" />
            <span>Need Help?</span>
          </button>
        </div>
      </header>

      {/* Proactive Needs Anticipator Card */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-500/50 pb-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Proactive Daily Assistance • Anticipating Your Needs
          </span>
          <span className="text-sm font-bold text-emerald-100">
            Next Reminder: 11:30 AM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Card 1 */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-1">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase">
              <Pill className="w-4 h-4 text-emerald-300" />
              <span>Morning Medications</span>
            </div>
            <div className="text-xl font-extrabold">Taken at 8:14 AM ✓</div>
            <p className="text-xs text-emerald-100">Metformin &amp; Lisinopril completed</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-1">
            <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>11:30 AM Fresh Lemon Water</span>
            </div>
            <div className="text-xl font-extrabold">Hydration Time</div>
            <p className="text-xs text-emerald-100">Keep joints supple and energy high</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-1">
            <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase">
              <Sun className="w-4 h-4 text-blue-300" />
              <span>Weather Comfort</span>
            </div>
            <div className="text-xl font-extrabold">Sunny 72° Pleasant</div>
            <p className="text-xs text-emerald-100">Light cardigan for afternoon porch</p>
          </div>
        </div>
      </section>

      {/* The 5 Core Everyday Task Navigation Pillars */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Can Your Companion Assist You Today?
          </h2>
          <span className="text-sm font-bold text-slate-500 hidden sm:inline">
            Tap any card for immediate guidance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Pillar 1: Simplify Letters & Bills */}
          <button
            onClick={() => onNavigateTab('docs')}
            className="p-6 rounded-3xl bg-white hover:bg-indigo-50/50 border-3 border-slate-200 hover:border-indigo-400 text-left transition-all active:scale-[0.98] shadow-senior group flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-3xl flex-shrink-0 transition-colors shadow-sm">
              📄
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                GenAI Plain-English Simplifier
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-950">
                Simplify Confusing Bills &amp; Letters
              </h3>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Translate medical notices, utility bills, and insurance letters into 3 simple bullets and clear cost verdicts.
              </p>
            </div>
          </button>

          {/* Pillar 2: Scam & Trust Shield */}
          <button
            onClick={() => onNavigateTab('shield')}
            className="p-6 rounded-3xl bg-white hover:bg-rose-50/50 border-3 border-slate-200 hover:border-rose-400 text-left transition-all active:scale-[0.98] shadow-senior group flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-50 group-hover:bg-rose-600 text-rose-600 group-hover:text-white flex items-center justify-center text-3xl flex-shrink-0 transition-colors shadow-sm">
              🛡️
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Trustworthy Security Shield
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-rose-950">
                Check Suspicious Calls &amp; Texts
              </h3>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Protect yourself from fake IRS calls, gift card scams, and emergency fraud with instant calm reassurance.
              </p>
            </div>
          </button>

          {/* Pillar 3: Everyday Task Navigator */}
          <button
            onClick={() => onNavigateTab('tasks')}
            className="p-6 rounded-3xl bg-white hover:bg-teal-50/50 border-3 border-slate-200 hover:border-teal-400 text-left transition-all active:scale-[0.98] shadow-senior group flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-teal-50 group-hover:bg-teal-600 text-teal-600 group-hover:text-white flex items-center justify-center text-3xl flex-shrink-0 transition-colors shadow-sm">
              🧭
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                Daily Chore Navigator
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-teal-950">
                Navigate Everyday Tasks
              </h3>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Step-by-step guidance for doctor appointments, booking senior transportation, and weekly pill sorting.
              </p>
            </div>
          </button>

          {/* Pillar 4: Daily Routine & Wellness */}
          <button
            onClick={() => onNavigateTab('routine')}
            className="p-6 rounded-3xl bg-white hover:bg-emerald-50/50 border-3 border-slate-200 hover:border-emerald-400 text-left transition-all active:scale-[0.98] shadow-senior group flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center text-3xl flex-shrink-0 transition-colors shadow-sm">
              ☀️
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Proactive Routine
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-950">
                Daily Routine &amp; Wellness
              </h3>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Track your morning medications, hydration reminders, and gentle chair stretches with spoken encouragement.
              </p>
            </div>
          </button>

          {/* Pillar 5: Voice Hub & Family Bridge (Full Width) */}
          <button
            onClick={() => onNavigateTab('voice')}
            className="md:col-span-2 p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-white hover:bg-orange-50 border-3 border-orange-300 hover:border-orange-500 text-left transition-all active:scale-[0.98] shadow-senior group flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
              🎙️
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full">
                Zero-Learning-Curve Voice Bridge
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-orange-950">
                Tap &amp; Speak to Family • Today's Family Story
              </h3>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Press one giant button to speak naturally. Listen to today's calm audio story created from family updates.
              </p>
            </div>
          </button>

        </div>
      </section>
    </div>
  );
}
