import React, { useState } from 'react';
import { 
  Sun, 
  Pill, 
  Droplet, 
  Activity, 
  CloudSun, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  Sparkles, 
  Heart,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechService } from '../services/speechService';

const INITIAL_ROUTINE_ITEMS = [
  {
    id: 'med_morning',
    time: '8:00 AM',
    title: 'Morning Heart & Blood Pressure Medication',
    description: 'Take Metformin (white oval) and Lisinopril with breakfast and full glass of water.',
    category: 'Medication',
    icon: 'pill',
    completed: true,
    completedAt: '8:14 AM',
    encouragement: 'Great job taking your morning medicine on time, Eleanor!'
  },
  {
    id: 'hydration',
    time: '11:30 AM',
    title: 'Mid-Day Fresh Lemon Hydration',
    description: 'Drink 1 full glass of cool water to keep joints supple and energy high.',
    category: 'Hydration',
    icon: 'droplet',
    completed: false,
    completedAt: null,
    encouragement: 'Refreshing! Staying well-hydrated helps your body feel light and comfortable.'
  },
  {
    id: 'stretch',
    time: '2:00 PM',
    title: 'Gentle 10-Minute Chair Stretch',
    description: 'Slow shoulder rolls, ankle rotations, and 3 gentle deep breaths near the garden window.',
    category: 'Gentle Activity',
    icon: 'activity',
    completed: false,
    completedAt: null,
    encouragement: 'Wonderful stretching! Regular gentle movement keeps your circulation strong.'
  },
  {
    id: 'weather',
    time: '5:00 PM',
    title: 'Evening Porch Walk & Cardigan Reminder',
    description: 'It will be 68° and breezy. Wear your light knit cardigan if stepping outside to admire the garden.',
    category: 'Outerwear & Comfort',
    icon: 'weather',
    completed: false,
    completedAt: null,
    encouragement: 'Enjoy your peaceful walk in the fresh evening air, Eleanor.'
  }
];

export default function ProactiveDailyAssistant() {
  const [items, setItems] = useState(INITIAL_ROUTINE_ITEMS);
  const [activeSpeech, setActiveSpeech] = useState(null);

  const handleToggleItem = (itemId) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextState = !item.completed;
          if (nextState) {
            speechService.playGentleChime('success');
            speechService.speakText(item.encouragement);
            try {
              confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 }
              });
            } catch (e) {}
          }
          return {
            ...item,
            completed: nextState,
            completedAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
          };
        }
        return item;
      })
    );
  };

  const handleReadRoutineSummary = () => {
    const completedCount = items.filter(i => i.completed).length;
    const pendingItems = items.filter(i => !i.completed).map(i => i.title).join(', and ');
    const text = `Good day, Eleanor. You have completed ${completedCount} out of ${items.length} daily wellness steps. Up next is: ${pendingItems || 'You are all caught up for today! Have a wonderful relaxing evening.'}`;
    
    speechService.speakText(text, () => setActiveSpeech(true), () => setActiveSpeech(false));
  };

  const completedCount = items.filter(i => i.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-senior border-2 border-emerald-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl">
            ☀️
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Proactive Daily Wellness &amp; Routine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Today's Gentle Daily Schedule
            </h1>
            <p className="text-slate-600 text-base font-medium">
              We anticipate your comfort throughout the day with medicine, hydration, and outdoor reminders.
            </p>
          </div>
        </div>

        <button
          onClick={handleReadRoutineSummary}
          className="min-h-[60px] px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-lg flex items-center gap-2.5 shadow-md active:scale-95 transition-all"
        >
          <Volume2 className="w-6 h-6" />
          <span>Read Daily Summary</span>
        </button>
      </header>

      {/* Daily Progress Overview Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-emerald-100 font-bold text-sm uppercase tracking-wider">
            Daily Progress Tracker
          </span>
          <h3 className="text-2xl font-black">
            {completedCount} of {items.length} Steps Completed Today
          </h3>
          <p className="text-emerald-100 text-sm font-medium">
            Take your time—every step is designed for your peace and comfort.
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30 text-center">
          <span className="block text-xs uppercase font-bold text-emerald-100">Status</span>
          <span className="text-xl font-extrabold">
            {completedCount === items.length ? '🌟 All Done!' : '🌿 In Progress'}
          </span>
        </div>
      </div>

      {/* Routine Cards List (High Contrast, Large Touch Targets) */}
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            onClick={() => handleToggleItem(item.id)}
            className={`p-6 rounded-3xl border-3 cursor-pointer transition-all active:scale-[0.99] flex flex-wrap items-center justify-between gap-4 ${
              item.completed
                ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                : 'bg-white border-slate-200 hover:border-emerald-400 shadow-senior'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleItem(item.id);
                }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                  item.completed
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 border-2 border-slate-300 text-slate-400 hover:border-emerald-500'
                }`}
                aria-label={item.completed ? 'Mark as not done' : 'Mark as done'}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <Circle className="w-8 h-8" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {item.time}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  {item.completed && (
                    <span className="text-xs text-emerald-800 font-bold">
                      ✓ Completed at {item.completedAt}
                    </span>
                  )}
                </div>

                <h4 className={`text-xl md:text-2xl font-bold leading-snug ${
                  item.completed ? 'text-slate-600 line-through' : 'text-slate-900'
                }`}>
                  {item.title}
                </h4>

                <p className="text-base text-slate-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speechService.speakText(item.description);
                }}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                title="Read instructions aloud"
              >
                <Volume2 className="w-5 h-5 text-emerald-700" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
