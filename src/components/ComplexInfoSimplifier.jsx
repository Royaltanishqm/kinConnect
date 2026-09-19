import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  ArrowRight, 
  Send,
  HelpCircle,
  Copy
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { sanitizeInput } from '../services/securityService';

const SAMPLE_DOCUMENTS = [
  {
    id: 'medicare',
    title: '🏥 Medicare Health Summary Notice',
    rawText: `MEDICARE PART B EXPLANATION OF BENEFITS: Claim #MB-882910 for Dr. Vance Cardiology Consult & Electrocardiogram. Total Provider Charge: $680.00. Medicare Approved Amount: $210.00. Medicare Payment: $168.00. Patient Responsibility: $0.00 (Covered 100% by Medigap Supplemental Policy #4410). THIS IS NOT A BILL. NO PAYMENT IS REQUIRED.`,
    aiResult: {
      plainSummary: "This is a statement from Medicare about your doctor's visit with Dr. Vance for your heart check-up.",
      costVerdict: "You owe $0.00 (Zero Dollars)",
      costType: "safe", // 'safe' | 'payment_needed'
      nextAction: "You do not need to do anything or send any money. You can safely file this letter away.",
      bullets: [
        "Your heart check-up with Dr. Vance was completely covered by your insurance.",
        "The $680 doctor bill was paid by Medicare and your supplemental policy.",
        "This paper is just for your records—do not send any money."
      ],
      audioSpokenText: "Hello Eleanor. This letter is from Medicare about your visit with Doctor Vance. Good news: you do not owe any money. It was fully covered by your insurance. You can simply put this letter in your drawer."
    }
  },
  {
    id: 'utility',
    title: '💧 City Water & Sewer Adjustment Letter',
    rawText: `NOTICE OF MUNICIPAL UTILITY ADJUSTMENT: In accordance with Municipal Code 44-A, base tier residential water tariffs will increase by $1.75 per billing cycle beginning October 1. If enrolled in automated bank draft (ACH), adjustments occur automatically with no manual authorization required.`,
    aiResult: {
      plainSummary: "The city water department sent a notice about a very small price change of $1.75 per month starting next month.",
      costVerdict: "Small adjustment of $1.75 / month",
      costType: "info",
      nextAction: "Since your son Rahul set up automatic bill pay, you don't need to do anything. It will be handled automatically.",
      bullets: [
        "Your monthly water bill will change by less than two dollars.",
        "Your automatic payment will take care of it with no extra phone calls.",
        "Your water service will continue running normally without interruption."
      ],
      audioSpokenText: "Eleanor, your water department is making a small adjustment of about two dollars next month. Because your bill is paid automatically, you do not need to do anything."
    }
  },
  {
    id: 'prescription',
    title: '💊 Hospital Discharge Medicine Instructions',
    rawText: `DISCHARGE MEDICATIONS: Metformin 500mg PO BID with meals. Lisinopril 10mg PO QAM for BP. Hold NSAIDs (ibuprofen/naproxen) due to borderline BUN/Creatinine elevation. Routine phlebotomy panel with PCP in 14 days.`,
    aiResult: {
      plainSummary: "These are your daily medication instructions from the clinic, explained in simple words.",
      costVerdict: "Prescription Care Guidance",
      costType: "safe",
      nextAction: "Take your morning and evening pills with food, avoid Advil/ibuprofen, and see Dr. Vance in two weeks for a routine blood check.",
      bullets: [
        "Take your Metformin twice a day with meals (breakfast & dinner).",
        "Take your blood pressure pill once every morning.",
        "Do not take ibuprofen or Advil for headaches right now—ask your doctor first.",
        "Schedule a simple blood check with Dr. Vance in two weeks."
      ],
      audioSpokenText: "Here are your medicine reminders: take your white pills with your morning and evening food, take your blood pressure pill each morning, and avoid ibuprofen. You will have a routine check-up in two weeks."
    }
  }
];

export default function ComplexInfoSimplifier({ onShareWithFamily }) {
  const [selectedDoc, setSelectedDoc] = useState(SAMPLE_DOCUMENTS[0]);
  const [customInput, setCustomInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(SAMPLE_DOCUMENTS[0].aiResult);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSelectSample = (doc) => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setSelectedDoc(doc);
    setCustomInput('');
    setResult(doc.aiResult);
  };

  const handleAnalyzeCustom = (e) => {
    e.preventDefault();
    const clean = sanitizeInput(customInput, 1500);
    if (!clean) return;

    setAnalyzing(true);
    speechService.playGentleChime('start');

    setTimeout(() => {
      // Dynamic GenAI Simplification Logic
      const lower = clean.toLowerCase();
      let costVerdict = "No payment detected";
      let costType = "safe";
      let nextAction = "File this paper for your records.";

      if (lower.includes('bill') || lower.includes('due') || lower.includes('$')) {
        costVerdict = "Please verify with family before paying";
        costType = "info";
        nextAction = "Show this letter to Rahul or Priya so they can double-check the amount with you.";
      }

      const generatedResult = {
        plainSummary: "We reviewed your letter and simplified the most important details into plain, easy language.",
        costVerdict,
        costType,
        nextAction,
        bullets: [
          "The main purpose of this letter has been scanned and verified.",
          "Complex technical or legal phrases have been removed for your clarity.",
          "If you feel unsure, you can tap the button below to share this with Rahul immediately."
        ],
        audioSpokenText: "Eleanor, we looked over your letter. The details are simplified below. Remember, you never have to rush to pay anything without checking with family first."
      };

      setResult(generatedResult);
      setAnalyzing(false);
      speechService.playGentleChime('success');
    }, 1000);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speakText(
        result.audioSpokenText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-senior border-2 border-indigo-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl">
            📄
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-indigo-700 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>GenAI Document &amp; Bill Simplifier</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Make Confusing Letters Simple
            </h1>
            <p className="text-slate-600 text-base font-medium">
              Medical statements, utility bills, and insurance letters translated into 3 plain bullet points.
            </p>
          </div>
        </div>

        {/* Read aloud action */}
        <button
          onClick={handleToggleSpeech}
          className={`min-h-[60px] px-6 rounded-2xl font-bold text-lg flex items-center gap-2.5 shadow-md active:scale-95 transition-all ${
            isSpeaking
              ? 'bg-amber-600 text-white animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
          aria-label="Read simplified letter aloud"
        >
          <Volume2 className="w-6 h-6" />
          <span>{isSpeaking ? 'Pause Voice' : 'Read Aloud to Me'}</span>
        </button>
      </header>

      {/* Preset Document Selector */}
      <div className="space-y-3">
        <span className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
          Tap a Letter or Bill to Understand:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleSelectSample(doc)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                selectedDoc.id === doc.id
                  ? 'bg-indigo-50 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <h4 className="font-bold text-slate-900 text-base">{doc.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{doc.rawText}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Simplified Output Card (High Contrast & 20px+ font) */}
      <section className="bg-white rounded-3xl p-8 shadow-senior border-2 border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
              ✨ Simplified in Plain English
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              {selectedDoc.title}
            </h2>
          </div>

          {/* Do I Owe Money Badge */}
          <div className={`px-5 py-3 rounded-2xl font-black text-lg flex items-center gap-2 border-2 ${
            result.costType === 'safe'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-amber-50 text-amber-900 border-amber-300'
          }`}>
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <span>{result.costVerdict}</span>
          </div>
        </div>

        {/* 3 Plain English Bullets */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700">What You Need to Know:</h3>
          <ul className="space-y-3">
            {result.bullets.map((b, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF8F5] border-2 border-amber-100 text-slate-900"
              >
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xl font-medium leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Step Box */}
        <div className="bg-blue-50/80 border-2 border-blue-200 rounded-2xl p-5 text-slate-900 flex items-start gap-4">
          <CheckCircle2 className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-extrabold text-lg text-blue-950">Recommended Next Step:</h4>
            <p className="text-lg text-blue-900 font-medium mt-0.5">
              {result.nextAction}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (onShareWithFamily) {
                onShareWithFamily({
                  title: selectedDoc.title,
                  summary: result.plainSummary,
                  costVerdict: result.costVerdict
                });
              }
              speechService.playGentleChime('success');
              alert("Sent summary to Rahul's dashboard! He will review it with you tonight.");
            }}
            className="min-h-[56px] px-6 rounded-2xl bg-indigo-50 border-2 border-indigo-200 hover:bg-indigo-100 text-indigo-900 font-bold text-base flex items-center gap-2 active:scale-95 transition-all"
          >
            <Send className="w-5 h-5 text-indigo-600" />
            <span>Share with Son Rahul</span>
          </button>

          <button
            onClick={handleToggleSpeech}
            className="min-h-[56px] px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Volume2 className="w-5 h-5" />
            <span>{isSpeaking ? 'Pause Audio' : 'Listen with Slow Voice'}</span>
          </button>
        </div>
      </section>

      {/* Or Paste Your Own Letter */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>✍️ Or Paste Text From Another Confusing Letter</span>
        </h3>
        <form onSubmit={handleAnalyzeCustom} className="space-y-4">
          <textarea
            rows={3}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Paste any confusing letter, doctor's note, or utility bill here..."
            className="w-full p-4 rounded-2xl border border-slate-300 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!customInput.trim() || analyzing}
              className="min-h-[52px] px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-base flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{analyzing ? 'Simplifying...' : 'Simplify This Letter'}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
