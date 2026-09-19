import React, { useState, useMemo, useCallback } from 'react';
import { 
  Heart, 
  Smartphone, 
  Tablet, 
  Columns, 
  Sparkles, 
  HelpCircle, 
  Award,
  Layers,
  FileText,
  ShieldCheck,
  Sun,
  Mic
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ErrorBoundary from './components/ErrorBoundary';
import SeniorVoiceHub from './components/SeniorVoiceHub';
import ComplexInfoSimplifier from './components/ComplexInfoSimplifier';
import TrustScamShield from './components/TrustScamShield';
import ProactiveDailyAssistant from './components/ProactiveDailyAssistant';
import FamilyDashboard from './components/FamilyDashboard';
import ConnectedWorkflowModal from './components/ConnectedWorkflowModal';
import HelpCompanionModal from './components/HelpCompanionModal';
import { 
  INITIAL_FAMILY_MEMBERS, 
  INITIAL_SENIOR_MESSAGES, 
  INITIAL_FAMILY_UPDATES 
} from './data/mockData';
import { 
  processSeniorVoice, 
  translateFamilyUpdateToStory, 
  compileDailyAudioStory 
} from './services/translatorService';
import { sanitizeInput } from './services/securityService';

export default function App() {
  const [currentView, setCurrentView] = useState('split'); // 'senior' | 'family' | 'split'
  const [seniorTab, setSeniorTab] = useState('voice'); // 'voice' | 'docs' | 'shield' | 'routine'
  
  const [familyMembers] = useState(INITIAL_FAMILY_MEMBERS);
  const [seniorMessages, setSeniorMessages] = useState(INITIAL_SENIOR_MESSAGES);
  const [familyUpdates, setFamilyUpdates] = useState(INITIAL_FAMILY_UPDATES);
  const [scamAlerts, setScamAlerts] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);
  
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Dynamically compile daily audio story whenever family updates change
  const dailyStory = useMemo(() => {
    return compileDailyAudioStory(familyUpdates);
  }, [familyUpdates]);

  // Senior speaks and sends message (sanitized)
  const handleSendSeniorMessage = useCallback((rawTranscript) => {
    const cleanTranscript = sanitizeInput(rawTranscript, 1000);
    const aiProcessed = processSeniorVoice(cleanTranscript);
    if (!aiProcessed) return null;

    const newMessage = {
      id: `msg-${Date.now()}`,
      author: 'Grandma Eleanor',
      timestamp: 'Just now',
      rawVoiceTranscript: cleanTranscript,
      intent: aiProcessed.intent,
      intentCategory: aiProcessed.intentCategory,
      polished_message_for_family: aiProcessed.polished_message_for_family,
      summary_for_senior: aiProcessed.summary_for_senior,
      readAloudConfirmation: aiProcessed.readAloudConfirmation,
      reactions: [],
      audioDuration: '16s'
    };

    setSeniorMessages((prev) => [newMessage, ...prev]);
    return aiProcessed;
  }, []);

  // Family adds emotional quick reaction
  const handleAddReaction = useCallback((messageId, sender, emoji, text) => {
    setSeniorMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const newReaction = { sender, emoji, text };
          return {
            ...msg,
            reactions: [...(msg.reactions || []), newReaction]
          };
        }
        return msg;
      })
    );
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  // Family posts an update (Prompt B)
  const handlePostFamilyUpdate = useCallback(({ author, authorRelation, avatar, rawText, photoUrl }) => {
    const translated = translateFamilyUpdateToStory(author, authorRelation, rawText);

    const newUpdate = {
      id: `upd-${Date.now()}`,
      author,
      authorRelation,
      avatar,
      timestamp: 'Just now',
      rawText,
      photoUrl,
      photoAlt: `Update from ${author}`,
      normalizedStory: translated.normalizedStory,
      audioReadyText: translated.audioReadyText
    };

    setFamilyUpdates((prev) => [newUpdate, ...prev]);
  }, []);

  // Handlers for cross-module integration
  const handleShareDocumentWithFamily = useCallback((docInfo) => {
    setSharedDocuments((prev) => [docInfo, ...prev]);
  }, []);

  const handleAlertFamilyScam = useCallback((scamInfo) => {
    setScamAlerts((prev) => [scamInfo, ...prev]);
  }, []);

  // Automated round-trip simulation for judges
  const handleRunSimulation = () => {
    setCurrentView('split');
    setSeniorTab('voice');

    // Step 1: Senior sends message
    setTimeout(() => {
      handleSendSeniorMessage("Hello children, I just made fresh tea and was thinking of little Riya's robotics prize. Tell her Grandma is so proud of her!");
    }, 800);

    // Step 2: Family reacts and posts update
    setTimeout(() => {
      handleAddReaction(seniorMessages[0]?.id || 'msg-1', 'Rahul', '❤️', 'Saw your message Mom! Riya is smiling so big!');
    }, 2500);

    setTimeout(() => {
      handlePostFamilyUpdate({
        author: 'Rahul',
        authorRelation: 'Son',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rawText: 'Ma!! Riya just set up her trophy in the living room rn, so hyped fr fr!! Calling you at 6pm sharp! 🏆❤️',
        photoUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80'
      });
    }, 4000);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col">
        {/* Top Application Bar & View Selector */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-xl shadow-md font-bold">
                K
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight font-serif">
                    KinConnect
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                    AI Senior Companion
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Intelligent, Accessible &amp; Trustworthy Daily Companion
                </p>
              </div>
            </div>

            {/* Perspective Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => setCurrentView('senior')}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
                  currentView === 'senior'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>👴 Senior Tablet Mode</span>
              </button>

              <button
                onClick={() => setCurrentView('family')}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
                  currentView === 'family'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>👨‍👩‍👧 Family Hub</span>
              </button>

              <button
                onClick={() => setCurrentView('split')}
                className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
                  currentView === 'split'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns className="w-4 h-4" />
                <span>⚡ Split Demo (Judges)</span>
              </button>
            </div>

            {/* Connected Workflow & Judge Tour Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsWorkflowModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Judge Architecture</span>
              </button>
            </div>

          </div>
        </header>

        {/* Senior Pillar Tabs (Visible when in Senior Mode or Split Mode) */}
        {(currentView === 'senior' || currentView === 'split') && (
          <nav className="bg-amber-50/60 border-b border-amber-200/70 px-4 py-2.5">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-2 hidden md:inline">
                Companion Pillars:
              </span>
              <button
                onClick={() => setSeniorTab('voice')}
                className={`px-4 py-2 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all ${
                  seniorTab === 'voice'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>1. Voice &amp; Family Story</span>
              </button>

              <button
                onClick={() => setSeniorTab('docs')}
                className={`px-4 py-2 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all ${
                  seniorTab === 'docs'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>2. Simplify Bills &amp; Letters</span>
              </button>

              <button
                onClick={() => setSeniorTab('shield')}
                className={`px-4 py-2 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all ${
                  seniorTab === 'shield'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>3. Scam &amp; Trust Shield</span>
              </button>

              <button
                onClick={() => setSeniorTab('routine')}
                className={`px-4 py-2 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all ${
                  seniorTab === 'routine'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>4. Daily Routine &amp; Wellness</span>
              </button>
            </div>
          </nav>
        )}

        {/* Main Content Area */}
        <main className="flex-1 pb-12">
          {/* SINGLE SENIOR VIEW */}
          {currentView === 'senior' && (
            <div className="pt-2 animate-fadeIn">
              {seniorTab === 'voice' && (
                <SeniorVoiceHub
                  onSendSeniorMessage={handleSendSeniorMessage}
                  familyUpdates={familyUpdates}
                  dailyStory={dailyStory}
                  onOpenHelp={() => setIsHelpModalOpen(true)}
                />
              )}
              {seniorTab === 'docs' && (
                <ComplexInfoSimplifier
                  onShareWithFamily={handleShareDocumentWithFamily}
                />
              )}
              {seniorTab === 'shield' && (
                <TrustScamShield
                  onAlertFamily={handleAlertFamilyScam}
                />
              )}
              {seniorTab === 'routine' && (
                <ProactiveDailyAssistant />
              )}
            </div>
          )}

          {/* SINGLE FAMILY VIEW */}
          {currentView === 'family' && (
            <div className="pt-2 animate-fadeIn">
              <FamilyDashboard
                seniorMessages={seniorMessages}
                onAddReaction={handleAddReaction}
                onPostFamilyUpdate={handlePostFamilyUpdate}
                familyMembers={familyMembers}
                scamAlerts={scamAlerts}
                sharedDocuments={sharedDocuments}
              />
            </div>
          )}

          {/* SPLIT DEMO VIEW (For Judges & Full Workflow) */}
          {currentView === 'split' && (
            <div className="max-w-[1700px] mx-auto px-4 pt-6 space-y-4">
              <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-indigo-50 border border-orange-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-bold text-sm">Synchronized Connected Daily Companion:</span>
                  <span className="text-slate-600">
                    Switch the companion tabs above to test Voice Hub, Document Simplifier, Scam Shield, and Daily Wellness. Watch family sync in real time!
                  </span>
                </div>
                <button
                  onClick={handleRunSimulation}
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold active:scale-95 transition-all shadow-sm"
                >
                  Run Live Round-Trip Simulation
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                {/* Left: Senior Mode Tabbed Experience */}
                <div className="bg-white/60 p-4 rounded-3xl border-2 border-orange-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                    <span className="text-sm font-extrabold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                      <Tablet className="w-4 h-4" />
                      Senior Daily Companion (Eleanor)
                    </span>
                    <span className="text-xs text-orange-700 font-medium">
                      Pillar Active: {seniorTab.toUpperCase()}
                    </span>
                  </div>

                  {seniorTab === 'voice' && (
                    <SeniorVoiceHub
                      onSendSeniorMessage={handleSendSeniorMessage}
                      familyUpdates={familyUpdates}
                      dailyStory={dailyStory}
                      onOpenHelp={() => setIsHelpModalOpen(true)}
                    />
                  )}
                  {seniorTab === 'docs' && (
                    <ComplexInfoSimplifier
                      onShareWithFamily={handleShareDocumentWithFamily}
                    />
                  )}
                  {seniorTab === 'shield' && (
                    <TrustScamShield
                      onAlertFamily={handleAlertFamilyScam}
                    />
                  )}
                  {seniorTab === 'routine' && (
                    <ProactiveDailyAssistant />
                  )}
                </div>

                {/* Right: Family Mode */}
                <div className="bg-white/60 p-4 rounded-3xl border-2 border-indigo-200/80 shadow-sm">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-indigo-100">
                    <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" />
                      Family Mobile / Web Dashboard
                    </span>
                    <span className="text-xs text-indigo-700 font-medium">
                      Intent Extraction • Scam Alerts • Doc Reviews
                    </span>
                  </div>
                  <FamilyDashboard
                    seniorMessages={seniorMessages}
                    onAddReaction={handleAddReaction}
                    onPostFamilyUpdate={handlePostFamilyUpdate}
                    familyMembers={familyMembers}
                    scamAlerts={scamAlerts}
                    sharedDocuments={sharedDocuments}
                  />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Connected Workflow Modal */}
        <ConnectedWorkflowModal
          isOpen={isWorkflowModalOpen}
          onClose={() => setIsWorkflowModalOpen(false)}
          onRunSimulation={handleRunSimulation}
        />

        {/* Senior Help & Companion Modal */}
        <HelpCompanionModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <p>
            KinConnect • Intelligent, Accessible &amp; Trustworthy Senior Daily Companion • GenAI Voice Hub, Document Simplifier, Scam Shield &amp; Family Bridge
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
