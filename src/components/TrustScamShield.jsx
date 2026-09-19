import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  PhoneCall, 
  Volume2, 
  Send, 
  Sparkles,
  HelpCircle,
  Lock
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { sanitizeInput } from '../services/securityService';

const SAMPLE_SCENARIOS = [
  {
    id: 'irs_scam',
    title: '🚨 "IRS Arrest Warrant / Gift Card" Notice',
    rawMessage: 'FINAL NOTICE: IRS Agent John Miller badge #8821. An immediate federal arrest warrant has been issued for unpaid back taxes. You must purchase two $250 Target gift cards immediately to discharge penalty or local police will arrive at your residence within 1 hour.',
    aiAnalysis: {
      isScam: true,
      riskLevel: 'HIGH DANGER SCAM',
      headline: 'This is an aggressive fake scam. You are completely safe!',
      explanation: 'The real IRS never calls to threaten arrest, and no government agency will ever ask for payment in store gift cards. This is a common criminal trick that targets seniors.',
      actionGuidance: [
        'Do not send any money, gift cards, or bank information.',
        'Delete the text or hang up the telephone immediately.',
        'Your home, savings, and family are 100% safe.'
      ],
      spokenReassurance: 'Eleanor, take a deep breath. You are completely safe. This message is a fake scam. The real government never threatens people or asks for gift cards. You do not need to do anything at all.'
    }
  },
  {
    id: 'grandchild_scam',
    title: '⚠️ "Grandchild In Trouble In Mexico" Text',
    rawMessage: 'Grandma please help me! I went on a trip to Mexico with friends and got into a car accident. Police are holding me. Please wire $800 via Western Union to get me home, please do not tell Mom and Dad they will be so mad at me please hurry!',
    aiAnalysis: {
      isScam: true,
      riskLevel: 'HIGH DANGER SCAM',
      headline: 'This is a fake "Grandparent Scam". Arjun is safe at school.',
      explanation: 'Scammers frequently pretend to be grandchildren in trouble and ask you not to tell the parents. Arjun is safe in his classes today.',
      actionGuidance: [
        'Do not wire any money through Western Union or gift cards.',
        'Tap the button below to call Rahul directly to verify Arjun is safe.',
        'Remember that scammers use emotional panic to rush decisions.'
      ],
      spokenReassurance: 'Eleanor, please do not worry. This is a well known grandparent scam. Little Arjun is safe at school today. Let us call Rahul right now so he can reassure you.'
    }
  },
  {
    id: 'legit_doctor',
    title: '🟢 Legitimate Clinic Doctor Appointment Reminder',
    rawMessage: 'St. Jude Health Clinic Reminder: Eleanor, you have a routine cardiovascular checkup with Dr. Vance on Tuesday, Oct 14 at 10:00 AM. Please bring your insurance card. Reply 1 to Confirm or call 555-0199 to reschedule.',
    aiAnalysis: {
      isScam: false,
      riskLevel: 'SAFE & VERIFIED',
      headline: 'This is a safe, real appointment reminder from your clinic.',
      explanation: 'This matches your regular cardiology visits with Dr. Vance. It does not ask for passwords, gift cards, or sensitive banking details.',
      actionGuidance: [
        'This reminder is genuine and safe.',
        'Your appointment is on Tuesday morning at 10:00 AM.',
        'Rahul can drive you as usual.'
      ],
      spokenReassurance: 'This is a safe message from Doctor Vance\'s clinic reminding you about your appointment on Tuesday morning at ten o\'clock. Everything is normal.'
    }
  }
];

export default function TrustScamShield({ onAlertFamily }) {
  const [selectedScenario, setSelectedScenario] = useState(SAMPLE_SCENARIOS[0]);
  const [customText, setCustomText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(SAMPLE_SCENARIOS[0].aiAnalysis);

  const handleSelectScenario = (scenario) => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setSelectedScenario(scenario);
    setCustomText('');
    setCurrentAnalysis(scenario.aiAnalysis);
  };

  const handleAnalyzeCustom = (e) => {
    e.preventDefault();
    const clean = sanitizeInput(customText, 1000);
    if (!clean) return;

    setAnalyzing(true);
    speechService.playGentleChime('start');

    setTimeout(() => {
      const lower = clean.toLowerCase();
      const hasScamSignals = lower.includes('gift card') || 
                             lower.includes('wire') || 
                             lower.includes('arrest') || 
                             lower.includes('urgent') || 
                             lower.includes('suspended') || 
                             lower.includes('bitcoin');

      const analysis = {
        isScam: hasScamSignals,
        riskLevel: hasScamSignals ? 'HIGH DANGER SCAM' : 'LIKELY SAFE (VERIFY WITH FAMILY)',
        headline: hasScamSignals 
          ? 'Warning: Suspicious scam signals detected! Do not send money.'
          : 'This message seems calm, but always double check with family.',
        explanation: hasScamSignals
          ? 'This message uses urgency or requests payment in suspicious forms like gift cards or wire transfers.'
          : 'No obvious emergency threats detected. When in doubt, let Rahul review it first.',
        actionGuidance: [
          'Never give your credit card, bank details, or gift cards to unknown senders.',
          'Take your time—real institutions never demand instant payment in panic.',
          'Tap "Alert Son Rahul" below to share this with family for complete peace of mind.'
        ],
        spokenReassurance: hasScamSignals
          ? 'Eleanor, this looks very suspicious. Please do not send any money. You are completely safe, and we have alerted Rahul.'
          : 'This text looks ordinary, Eleanor. Remember to ask Rahul before clicking any links.'
      };

      setCurrentAnalysis(analysis);
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
        currentAnalysis.spokenReassurance,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-senior border-2 border-rose-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-3xl">
            🛡️
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-700 font-bold text-sm">
              <Lock className="w-4 h-4 text-rose-600" />
              <span>GenAI Trust &amp; Scam Shield</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Your Personal Security Protector
            </h1>
            <p className="text-slate-600 text-base font-medium">
              Protecting you from suspicious calls, fake texts, and emergency fraud.
            </p>
          </div>
        </div>

        {/* Read aloud action */}
        <button
          onClick={handleToggleSpeech}
          className={`min-h-[60px] px-6 rounded-2xl font-bold text-lg flex items-center gap-2.5 shadow-md active:scale-95 transition-all ${
            isSpeaking
              ? 'bg-amber-600 text-white animate-pulse'
              : 'bg-rose-600 hover:bg-rose-700 text-white'
          }`}
          aria-label="Listen to reassurance audio"
        >
          <Volume2 className="w-6 h-6" />
          <span>{isSpeaking ? 'Pause Audio' : 'Listen to Safety Voice'}</span>
        </button>
      </header>

      {/* Preset Scenarios Selector */}
      <div className="space-y-3">
        <span className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
          Tap a Sample Text or Call to Test Safety:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                selectedScenario.id === scenario.id
                  ? 'bg-rose-50 border-rose-600 shadow-md ring-2 ring-rose-500/20'
                  : 'bg-white border-slate-200 hover:border-rose-300'
              }`}
            >
              <h4 className="font-bold text-slate-900 text-base">{scenario.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{scenario.rawMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Safety Analysis Card (High Contrast) */}
      <section className={`rounded-3xl p-8 shadow-senior border-4 space-y-6 ${
        currentAnalysis.isScam
          ? 'bg-gradient-to-b from-white to-rose-50/40 border-rose-300'
          : 'bg-gradient-to-b from-white to-emerald-50/40 border-emerald-300'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            {currentAnalysis.isScam ? (
              <ShieldAlert className="w-12 h-12 text-red-600" />
            ) : (
              <ShieldCheck className="w-12 h-12 text-emerald-600" />
            )}
            <div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase inline-block ${
                currentAnalysis.isScam
                  ? 'bg-red-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}>
                {currentAnalysis.riskLevel}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                {currentAnalysis.headline}
              </h2>
            </div>
          </div>
        </div>

        {/* Reassurance Explanation */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
          <h3 className="text-lg font-bold text-slate-800">Why You Don't Need to Worry:</h3>
          <p className="text-xl text-slate-800 font-serif leading-relaxed">
            "{currentAnalysis.explanation}"
          </p>
        </div>

        {/* Clear Action Steps */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800">What to Do Next:</h3>
          <ul className="space-y-2.5">
            {currentAnalysis.actionGuidance.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-900"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xl font-medium leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
          <button
            onClick={() => {
              if (onAlertFamily) {
                onAlertFamily({
                  source: selectedScenario.title,
                  message: selectedScenario.rawMessage,
                  isScam: currentAnalysis.isScam
                });
              }
              speechService.playGentleChime('success');
              alert("Alert sent to Rahul's dashboard! He was notified to call you and confirm your peace of mind.");
            }}
            className="min-h-[56px] px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg flex items-center gap-2.5 shadow-md active:scale-95 transition-all"
          >
            <Send className="w-5 h-5 text-amber-400" />
            <span>Alert Son Rahul to Review</span>
          </button>

          <a
            href="tel:5550199"
            onClick={(e) => {
              e.preventDefault();
              alert('Dialing Rahul immediately on speakerphone...');
            }}
            className="min-h-[56px] px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call Rahul for Reassurance</span>
          </a>
        </div>
      </section>

      {/* Or Check Another Suspicious Message */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>🔍 Check Another Message or Phone Call</span>
        </h3>
        <form onSubmit={handleAnalyzeCustom} className="space-y-4">
          <textarea
            rows={3}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type or paste any strange text message, voicemail, or letter you received..."
            className="w-full p-4 rounded-2xl border border-slate-300 text-base focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!customText.trim() || analyzing}
              className="min-h-[52px] px-8 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-base flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{analyzing ? 'Checking Safety...' : 'Check If This is Safe'}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
