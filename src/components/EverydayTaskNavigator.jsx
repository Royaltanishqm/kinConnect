import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Calendar, 
  Car, 
  Pill, 
  Tv, 
  ArrowRight,
  Send,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { sanitizeInput } from '../services/securityService';

const COMMON_TASKS = [
  {
    id: 'doctor_prep',
    icon: 'calendar',
    title: '🩺 Preparing for Doctor Appointment',
    subtitle: 'What to bring and questions to ask Dr. Vance',
    prompt: 'Help me prepare for my visit with Dr. Vance on Tuesday.',
    aiGuidance: {
      summary: "Here is your gentle 3-step checklist for your Tuesday appointment with Dr. Vance.",
      steps: [
        "Put your Medicare card and list of current medicines in your handbag the night before.",
        "Write down your 2 main questions: 'How are my blood pressure numbers?' and 'Can I reduce my Metformin?'",
        "Rahul will arrive at 9:30 AM to drive you. Drink a glass of water before leaving."
      ],
      audioSpokenText: "Eleanor, to prepare for Doctor Vance: pack your Medicare card and medication bottles, write down your two health questions, and relax—Rahul will arrive at nine-thirty to drive you."
    }
  },
  {
    id: 'ride_transport',
    icon: 'car',
    title: '🚗 Booking Senior Transportation',
    subtitle: 'Simple steps to request a ride to the grocery or community center',
    prompt: 'How do I arrange a ride to the senior center?',
    aiGuidance: {
      summary: "Arranging a ride is simple and completely handled for you.",
      steps: [
        "Tap 'Call Rahul' or the Senior Shuttle number (555-RIDE).",
        "State your pickup address: 442 Elm Creek Road, Apt 3B.",
        "The gentle driver will arrive 10 minutes before your requested time and assist you to the door."
      ],
      audioSpokenText: "To get a ride to the senior center, you can call the shuttle or ask Rahul. The driver will assist you right from your front door."
    }
  },
  {
    id: 'pill_organizer',
    icon: 'pill',
    title: '💊 Organising Weekly Pill Box',
    subtitle: 'Calm step-by-step guidance for Sunday pill sorting',
    prompt: 'How do I organize my morning and evening pills for the week?',
    aiGuidance: {
      summary: "Here is a safe, relaxed routine to organize your medications for the week.",
      steps: [
        "Sit comfortably at the kitchen table in good lighting with your pill bottles.",
        "Fill the morning compartments first: 1 Metformin and 1 Lisinopril for each day.",
        "Fill the evening compartments with your evening vitamins. Close all bottle caps securely."
      ],
      audioSpokenText: "When organizing your weekly pills, sit at the well-lit kitchen table. Fill the morning boxes first with Metformin and Lisinopril, then fill the evening boxes, and tighten each cap."
    }
  },
  {
    id: 'tv_troubleshoot',
    icon: 'tv',
    title: '📺 Simple TV & Remote Fixes',
    subtitle: 'Fixing common remote confusion without frustration',
    prompt: 'My TV screen is dark or on the wrong input.',
    aiGuidance: {
      summary: "Don't worry, television remotes can be confusing. Here is the easiest fix.",
      steps: [
        "Locate the big green 'Power' button at the top of your remote and press it once firmly.",
        "Press the 'Home' button (the one shaped like a little house) to return to your favorite channels.",
        "If the screen is still quiet, tap 'Call Rahul' and he will reset it remotely in 30 seconds."
      ],
      audioSpokenText: "If your television screen looks strange, press the power button once, then press the little home button. If you need assistance, Rahul can fix it remotely."
    }
  }
];

export default function EverydayTaskNavigator({ onShareWithFamily }) {
  const [selectedTask, setSelectedTask] = useState(COMMON_TASKS[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [guidance, setGuidance] = useState(COMMON_TASKS[0].aiGuidance);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSelectTask = (task) => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setSelectedTask(task);
    setCustomQuestion('');
    setGuidance(task.aiGuidance);
  };

  const handleCustomTaskSubmit = (e) => {
    e.preventDefault();
    const clean = sanitizeInput(customQuestion, 500);
    if (!clean) return;

    setAnalyzing(true);
    speechService.playGentleChime('start');

    setTimeout(() => {
      const generated = {
        summary: `Here is gentle, clear guidance to help you navigate "${clean}" with ease and confidence.`,
        steps: [
          "Take this task one small step at a time without any rush.",
          "Check your home notebook or tap 'Call Rahul' if you'd like a family member by your side.",
          "Remember that you are doing great, and our AI companion is always right here to guide you."
        ],
        audioSpokenText: `Eleanor, for your question about ${clean}: take it one step at a time. You are doing wonderful, and you can always ask Rahul or me for assistance.`
      };

      setGuidance(generated);
      setAnalyzing(false);
      speechService.playGentleChime('success');
    }, 900);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speakText(
        guidance.audioSpokenText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-senior border-2 border-teal-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-3xl">
            🧭
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-teal-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Everyday Task Navigator</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Navigate Daily Chores with Confidence
            </h1>
            <p className="text-slate-600 text-base font-medium">
              Step-by-step guidance for appointments, rides, prescriptions, and home routines.
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleSpeech}
          className={`min-h-[60px] px-6 rounded-2xl font-bold text-lg flex items-center gap-2.5 shadow-md active:scale-95 transition-all ${
            isSpeaking
              ? 'bg-amber-600 text-white animate-pulse'
              : 'bg-teal-700 hover:bg-teal-800 text-white'
          }`}
        >
          <Volume2 className="w-6 h-6" />
          <span>{isSpeaking ? 'Pause Voice' : 'Read Steps Aloud'}</span>
        </button>
      </header>

      {/* Task Selector */}
      <div className="space-y-3">
        <span className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
          Tap an Everyday Task for Clear Step-by-Step Guidance:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMON_TASKS.map((task) => (
            <button
              key={task.id}
              onClick={() => handleSelectTask(task)}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                selectedTask.id === task.id
                  ? 'bg-teal-50 border-teal-600 shadow-md ring-2 ring-teal-500/20'
                  : 'bg-white border-slate-200 hover:border-teal-300 shadow-sm'
              }`}
            >
              <div className="p-3 rounded-xl bg-teal-100/60 text-2xl flex-shrink-0">
                {task.icon === 'calendar' && '🩺'}
                {task.icon === 'car' && '🚗'}
                {task.icon === 'pill' && '💊'}
                {task.icon === 'tv' && '📺'}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg leading-snug">{task.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{task.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Guidance Output Card */}
      <section className="bg-white rounded-3xl p-8 shadow-senior border-2 border-slate-200 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
            ✨ GenAI Everyday Task Guidance
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
            {selectedTask.title}
          </h2>
          <p className="text-lg text-slate-600 font-medium mt-1">
            {guidance.summary}
          </p>
        </div>

        {/* 3 Clear Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700">Simple Step-by-Step Action Plan:</h3>
          <ul className="space-y-3">
            {guidance.steps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF8F5] border-2 border-teal-100 text-slate-900"
              >
                <span className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center font-black text-lg flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xl font-medium leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (onShareWithFamily) {
                onShareWithFamily({
                  title: selectedTask.title,
                  summary: guidance.summary,
                  costVerdict: "Everyday Task Completed ✓"
                });
              }
              speechService.playGentleChime('success');
              alert("Shared task checklist with Rahul's dashboard!");
            }}
            className="min-h-[56px] px-6 rounded-2xl bg-teal-50 border-2 border-teal-200 text-teal-900 font-bold text-base flex items-center gap-2 hover:bg-teal-100"
          >
            <Send className="w-5 h-5 text-teal-700" />
            <span>Share Checklist with Family</span>
          </button>

          <button
            onClick={handleToggleSpeech}
            className="min-h-[56px] px-8 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Volume2 className="w-5 h-5" />
            <span>{isSpeaking ? 'Pause Audio' : 'Listen to Steps Aloud'}</span>
          </button>
        </div>
      </section>

      {/* Ask Any Everyday Question */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>💡 Need Help with Another Everyday Task?</span>
        </h3>
        <form onSubmit={handleCustomTaskSubmit} className="space-y-4">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="e.g. How do I renew my library books? Or check trash pickup day?"
            className="w-full p-4 rounded-2xl border border-slate-300 text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!customQuestion.trim() || analyzing}
              className="min-h-[52px] px-8 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-base flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{analyzing ? 'Thinking...' : 'Get Simple Steps'}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
