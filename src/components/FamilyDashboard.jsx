import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Heart, 
  Phone, 
  Clock, 
  MessageSquare, 
  Image as ImageIcon, 
  Check, 
  ShieldCheck, 
  Smile, 
  Mic, 
  Activity, 
  ArrowRight,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { translateFamilyUpdateToStory } from '../services/translatorService';

export default function FamilyDashboard({ 
  seniorMessages, 
  onAddReaction, 
  onPostFamilyUpdate,
  familyMembers 
}) {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [rawText, setRawText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [showLiveTranslation, setShowLiveTranslation] = useState(true);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'compose' | 'overview'

  // Live preview of Intergenerational Translation
  const liveTranslation = translateFamilyUpdateToStory(
    selectedMember.name,
    selectedMember.relation,
    rawText
  );

  const handlePostUpdate = (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    onPostFamilyUpdate({
      author: selectedMember.name,
      authorRelation: selectedMember.relation,
      avatar: selectedMember.avatar,
      rawText: rawText,
      photoUrl: photoUrl || (selectedMember.id === 'riya' ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80')
    });

    setRawText('');
    setPhotoUrl('');
    alert('Update sent! Prompt B translated your message into Grandma Eleanor’s Daily Story.');
  };

  const handleApplyPreset = (presetText, presetImg) => {
    setRawText(presetText);
    if (presetImg) setPhotoUrl(presetImg);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Family Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Grandma Eleanor's Status: Active &amp; Well</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            KinConnect Family Dashboard
          </h2>
          <p className="text-slate-300 text-sm">
            Intergenerational hub for Eleanor's children &amp; grandchildren
          </p>
        </div>

        {/* Senior Care Quick Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2.5 text-center">
            <span className="block text-xs text-slate-400 font-semibold">Mood / Tone</span>
            <span className="text-base font-bold text-amber-400 flex items-center gap-1 justify-center">
              😊 Peaceful &amp; Loving
            </span>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2.5 text-center">
            <span className="block text-xs text-slate-400 font-semibold">Story Audio</span>
            <span className="text-base font-bold text-emerald-400">
              Listened Today ✓
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Senior Feed & AI Polished Updates, Right = Post & Intergenerational Translator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Incoming Senior Messages (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Incoming from Grandma Eleanor
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full">
              Prompt A: Voice Companion AI
            </span>
          </div>

          {seniorMessages.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
              No recent voice messages from Grandma yet.
            </div>
          ) : (
            seniorMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-5 transition-all hover:shadow-lg"
              >
                {/* Message Header */}
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl">
                      👵
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{msg.author}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* AI Intent Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    {msg.intentCategory || 'Family Check-in'}
                  </span>
                </div>

                {/* Polished Message For Busy Family */}
                <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block mb-1">
                    ✨ AI Polished Message for Family:
                  </span>
                  <p className="text-base text-slate-800 font-medium leading-relaxed">
                    {msg.polished_message_for_family}
                  </p>
                </div>

                {/* Raw Voice Transcript Toggle */}
                <details className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-200 group">
                  <summary className="cursor-pointer font-semibold text-slate-700 flex items-center gap-2 select-none">
                    <Mic className="w-4 h-4 text-orange-500" />
                    <span>View Raw Senior Voice Audio &amp; Transcript</span>
                  </summary>
                  <p className="mt-2 text-slate-700 italic border-l-2 border-orange-400 pl-3">
                    "{msg.rawVoiceTranscript}"
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Audio length: {msg.audioDuration || '18s'} • Extracted Intent: {msg.intent}
                  </p>
                </details>

                {/* Quick Resilient Emotional Reactions */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500">Quick Heartfelt Response:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onAddReaction(msg.id, 'Rahul', '❤️', 'Thinking of you Mom!')}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <span>❤️ Thinking of you</span>
                    </button>
                    <button
                      onClick={() => onAddReaction(msg.id, 'Rahul', '📞', 'Calling at 6:00 PM!')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Calling at 6pm</span>
                    </button>
                    <button
                      onClick={() => onAddReaction(msg.id, 'Riya', '🌸', 'Love you Dadi!')}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <span>🌸 Love you Dadi!</span>
                    </button>
                  </div>
                </div>

                {/* Existing Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.reactions.map((r, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-200"
                      >
                        <span>{r.emoji}</span>
                        <span className="font-bold text-slate-900">{r.sender}:</span>
                        <span>"{r.text}"</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: Post Family Update with Prompt B Intergenerational Translator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-5">
            <div className="border-b pb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Prompt B: Intergenerational Translator</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Post Update to Grandma
              </h3>
              <p className="text-xs text-slate-500">
                Type naturally (slang, shorthand, or voice note). Our AI translates it into Eleanor's gentle daily story.
              </p>
            </div>

            {/* Select Family Member Posting */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Posting As:</label>
              <div className="grid grid-cols-2 gap-2">
                {familyMembers.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                      selectedMember.id === member.id
                        ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{member.name}</div>
                      <div className="text-[10px] text-slate-500">{member.relation}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Test Presets */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-600">Quick Test Slang Updates:</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('OMG guys Rahul crushed his presentation fr fr no cap! Celebrating at dinner rn 🍕🥳')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 border border-slate-200 rounded-lg text-[11px] text-slate-700 font-medium"
                >
                  🚀 Rahul's Presentation (Slang)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('Dadi won 1st place in robotics fair!! 🤖🥇 check the trophy!! so hyped rn', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 border border-slate-200 rounded-lg text-[11px] text-slate-700 font-medium"
                >
                  🏆 Riya Trophy Win
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePostUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Your Message (Casual / Fast / Slang OK):
                </label>
                <textarea
                  rows={3}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="e.g. Wrapped up keynote at expo, heading to dinner rn..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Photo attachment simulation */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Photo Attachment (Optional URL):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    title="Add sample family picnic photo"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Sample</span>
                  </button>
                </div>
              </div>

              {/* LIVE INTERGENERATIONAL TRANSLATION PREVIEW */}
              {rawText.trim() && (
                <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Grandma's Story Preview (Prompt B):
                    </span>
                    <span className="bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full text-[10px]">
                      Slang Removed
                    </span>
                  </div>
                  <p className="text-sm font-serif text-slate-800 leading-relaxed italic">
                    "{liveTranslation.normalizedStory}"
                  </p>
                  <p className="text-[11px] text-amber-800 font-sans">
                    🔊 Spoken Audio Story: "{liveTranslation.audioReadyText}"
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!rawText.trim()}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send to Grandma's Daily Story</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
