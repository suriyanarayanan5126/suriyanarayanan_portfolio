import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  Lock, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  TrendingUp, 
  Video, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  Tv, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Play,
  Film,
  Sparkles
} from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData.ts';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'embedded' | 'ai' | 'robotics' | 'patent'>('all');
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, 'interactive' | 'video'>>({});
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
  const [batchNotice, setBatchNotice] = useState<string | null>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // Interactive Smart Home state simulation
  const [smartHomeStates, setSmartHomeStates] = useState({
    livingLight: true,
    ceilingFan: false,
    smartPlug: true,
  });

  // Interactive Bidirectional Visitor Counter simulation
  const [visitorCount, setVisitorCount] = useState(3);
  const [lastVisitorEvent, setLastVisitorEvent] = useState<string>('System initialized (3 occupants)');

  // Interactive Scrolling Display simulation
  const [scrollingText, setScrollingText] = useState('WELCOME TO KINGS COLLEGE OF ENGINEERING // ECE 2026 // SURIYANARAYANAN R');

  // Interactive Surveillance Car simulation
  const [carDirection, setCarDirection] = useState<'IDLE' | 'FORWARD' | 'REVERSE' | 'LEFT' | 'RIGHT'>('IDLE');
  const [carSpeed] = useState(60);

  // Interactive Salary Prediction simulation
  const [expYears, setExpYears] = useState(2.5);

  const calculatePredictedSalary = (years: number) => {
    const val = 3.6 + years * 1.85;
    return val.toFixed(2);
  };

  const handleVisitorEnter = () => {
    setVisitorCount((prev) => {
      const next = prev + 1;
      setLastVisitorEvent(`Sensor A -> Sensor B tripped: Entry detected (Total: ${next})`);
      return next;
    });
  };

  const handleVisitorExit = () => {
    setVisitorCount((prev) => {
      const next = Math.max(0, prev - 1);
      setLastVisitorEvent(
        next === 0
          ? 'Sensor B -> Sensor A tripped: Room now empty, auto-lights off!'
          : `Sensor B -> Sensor A tripped: Exit detected (Total: ${next})`
      );
      return next;
    });
  };

  // Check on mount if videos exist in public/videos or in session
  useEffect(() => {
    // 1. Check local / session storage for attached video blobs
    try {
      const saved = sessionStorage.getItem('suriyanarayanan_project_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setVideoUrls(parsed);
        }
      }
    } catch {
      // Storage access fallback
    }

    // 2. Check if static files exist in public/videos/
    PROJECTS_DATA.forEach((project) => {
      if (project.hasVideoSlot && project.videoPath) {
        const video = document.createElement('video');
        video.src = project.videoPath;
        video.onloadeddata = () => {
          setVideoUrls(prev => ({ ...prev, [project.id]: project.videoPath! }));
        };
      }
    });
  }, []);

  const matchFileToProjectId = (filename: string): string | null => {
    const lower = filename.toLowerCase();
    if (lower.includes('home') || lower.includes('esp32') || lower.includes('iot')) {
      return 'smart-home-automation';
    }
    if (lower.includes('visitor') || lower.includes('counter') || lower.includes('bidirectional')) {
      return 'visitor-counter';
    }
    if (lower.includes('scroll') || lower.includes('matrix') || lower.includes('display')) {
      return 'smart-scrolling-display';
    }
    if (lower.includes('salary') || lower.includes('predict') || lower.includes('ai') || lower.includes('regression')) {
      return 'suriya-ai';
    }
    if (lower.includes('car') || lower.includes('robot') || lower.includes('surveillance') || lower.includes('obstacle')) {
      return 'surveillance-car';
    }
    return null;
  };

  const handleBatchVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let matchedCount = 0;
    const newUrls: Record<string, string> = { ...videoUrls };

    Array.from(files).forEach((file) => {
      const matchedId = matchFileToProjectId(file.name);
      if (matchedId) {
        const url = URL.createObjectURL(file);
        newUrls[matchedId] = url;
        matchedCount++;
      }
    });

    setVideoUrls(newUrls);
    try {
      sessionStorage.setItem('suriyanarayanan_project_videos', JSON.stringify(newUrls));
    } catch {
      // storage limit fallback
    }

    setBatchNotice(`Connected ${matchedCount} video file(s) successfully to project cards!`);
    setTimeout(() => setBatchNotice(null), 5000);

    if (batchFileInputRef.current) {
      batchFileInputRef.current.value = '';
    }
  };

  const handleSingleVideoUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const updated = { ...videoUrls, [projectId]: url };
    setVideoUrls(updated);
    try {
      sessionStorage.setItem('suriyanarayanan_project_videos', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const getActiveTab = (projectId: string): 'interactive' | 'video' => {
    return activeTabByProject[projectId] || 'interactive';
  };

  const setActiveTab = (projectId: string, tab: 'interactive' | 'video') => {
    setActiveTabByProject(prev => ({ ...prev, [projectId]: tab }));
  };

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'patent') return project.isPatentConfidential;
    return project.category === filter;
  });

  const nonPatentProjectsWithVideos = PROJECTS_DATA.filter(p => !p.isPatentConfidential && p.hasVideoSlot);
  const connectedVideosCount = Object.keys(videoUrls).length;

  return (
    <section id="projects" className="relative py-28 bg-[#030712] overflow-hidden scroll-mt-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/12 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 -left-40 w-[550px] h-[550px] bg-violet-600/12 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.18)]">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>SECTOR 03 // ENGINEERING PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">Projects</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans">
            Real implementations spanning embedded hardware, sensor automation, robotics, and machine learning, with live interactive simulators and demonstration video players.
          </p>

          {/* Project Demonstration Videos Connection Banner */}
          <div className="w-full max-w-3xl mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1228] to-slate-900 border border-blue-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-cyan-400 shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {connectedVideosCount > 0 ? 'Project Videos Connected' : 'Connect Real Project Videos'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    connectedVideosCount > 0 
                      ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {connectedVideosCount} / {nonPatentProjectsWithVideos.length} Videos Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 font-sans">
                  {connectedVideosCount > 0
                    ? `${connectedVideosCount} demonstration video(s) active with native player controls.`
                    : 'To play your project demonstration footage, select .mp4 / .webm / .mov files from your device.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input
                ref={batchFileInputRef}
                type="file"
                multiple
                accept="video/mp4,video/webm,video/quicktime,video/mov,.mp4,.webm,.mov"
                onChange={handleBatchVideoUpload}
                className="hidden"
                id="batch-video-upload"
              />
              <label
                htmlFor="batch-video-upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all cursor-pointer border border-blue-400/30"
              >
                <Upload className="w-3.5 h-3.5 text-cyan-300" />
                <span>Connect Videos</span>
              </label>
            </div>
          </div>

          {/* Batch Notice Notification */}
          {batchNotice && (
            <div className="w-full max-w-3xl mt-2 p-3 rounded-xl bg-blue-950/60 border border-blue-500/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>{batchNotice}</span>
              </span>
              <button onClick={() => setBatchNotice(null)} className="text-cyan-400 hover:text-white">
                ✕
              </button>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-950/90 border border-blue-500/20 mt-6 shadow-xl backdrop-blur-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md border border-blue-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({PROJECTS_DATA.length})
            </button>
            <button
              onClick={() => setFilter('patent')}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                filter === 'patent'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md border border-blue-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Patent Applied
            </button>
            <button
              onClick={() => setFilter('embedded')}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                filter === 'embedded'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md border border-blue-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Embedded & IoT
            </button>
            <button
              onClick={() => setFilter('robotics')}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                filter === 'robotics'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md border border-blue-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Robotics
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                filter === 'ai'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md border border-blue-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Machine Learning
            </button>
          </div>
        </motion.div>

        {/* Projects Grid with Staggered Depth Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            // PATENT CARD: STRICT CONFIDENTIALITY COMPLIANCE
            // For 'Design and Implementation of a Digital Oorai Display using Embedded System', show ONLY the title.
            // No technical details, images, videos, code, or links.
            if (project.isPatentConfidential) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/95 via-[#091124]/95 to-slate-950/95 border-2 border-blue-500/40 shadow-[0_15px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(59,130,246,0.2)] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-500/25">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/40 text-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                        <Lock className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                          INTELLECTUAL PROPERTY · PATENT APPLICATION
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                          Application No: <span className="text-white font-semibold">{project.patentNumber}</span>
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-xs font-mono text-cyan-300 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Formal Patent Protection Active</span>
                    </div>
                  </div>

                  {/* ONLY THE PROJECT TITLE AS INSTRUCTED */}
                  <div className="py-8">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* Confidentiality Notice */}
                  <div className="p-4 rounded-2xl bg-black/70 border border-blue-500/25 text-xs text-slate-300 font-mono space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Patent Confidentiality Protocol Active</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      In accordance with patent confidentiality guidelines, technical descriptions, images, videos, implementation details, source code, circuit diagrams, algorithms, and project links are withheld to safeguard intellectual property.
                    </p>
                  </div>
                </motion.div>
              );
            }

            // ALL OTHER REAL PROJECTS WITH INTERACTIVE SIMULATION & VIDEO PLAYERS
            const activeTab = getActiveTab(project.id);
            const activeVideoSrc = videoUrls[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.012 }}
                className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between group backdrop-blur-xl"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-blue-500/40 transition-colors">
                      {project.category === 'embedded' && <Cpu className="w-5 h-5 text-cyan-400" />}
                      {project.category === 'robotics' && <Navigation className="w-5 h-5 text-violet-400" />}
                      {project.category === 'ai' && <TrendingUp className="w-5 h-5 text-blue-400" />}
                    </div>

                    {/* Mode Switcher Tabs: Interactive vs Video Demo */}
                    <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-blue-500/20 text-[11px] font-mono">
                      <button
                        onClick={() => setActiveTab(project.id, 'interactive')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          activeTab === 'interactive'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Simulation
                      </button>
                      <button
                        onClick={() => setActiveTab(project.id, 'video')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                          activeTab === 'video'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Video {activeVideoSrc ? '✓' : 'Slot'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                    {project.shortSummary}
                  </p>

                  {/* TAB 1: INTERACTIVE SIMULATIONS */}
                  {activeTab === 'interactive' && (
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-blue-500/20 space-y-3 mb-5">
                      
                      {/* SMART HOME RELAY CONTROLLER */}
                      {project.interactiveType === 'smart-home' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                            <span className="flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>Simulated ESP32 Relay Console</span>
                            </span>
                            <span className="text-[10px] text-slate-400">Real-time Switching</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <button
                              onClick={() => setSmartHomeStates(s => ({ ...s, livingLight: !s.livingLight }))}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                smartHomeStates.livingLight
                                  ? 'bg-blue-950/40 border-cyan-500/50 text-white shadow-sm'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">Relay 1: Light</span>
                                <span className={`w-2 h-2 rounded-full ${smartHomeStates.livingLight ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-600'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-cyan-300">
                                {smartHomeStates.livingLight ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
                              </span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(s => ({ ...s, ceilingFan: !s.ceilingFan }))}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                smartHomeStates.ceilingFan
                                  ? 'bg-blue-950/40 border-cyan-500/50 text-white shadow-sm'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">Relay 2: Fan</span>
                                <span className={`w-2 h-2 rounded-full ${smartHomeStates.ceilingFan ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-600'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-cyan-300">
                                {smartHomeStates.ceilingFan ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
                              </span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(s => ({ ...s, smartPlug: !s.smartPlug }))}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                smartHomeStates.smartPlug
                                  ? 'bg-blue-950/40 border-cyan-500/50 text-white shadow-sm'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">Relay 3: Appliance</span>
                                <span className={`w-2 h-2 rounded-full ${smartHomeStates.smartPlug ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-600'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-cyan-300">
                                {smartHomeStates.smartPlug ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* BIDIRECTIONAL VISITOR COUNTER */}
                      {project.interactiveType === 'visitor-counter' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                            <span>Dual IR Beam Gate Simulator</span>
                            <span className="font-semibold">
                              Room Light: {visitorCount > 0 ? (
                                <span className="text-cyan-300 font-bold">ON (Occupied)</span>
                              ) : (
                                <span className="text-rose-400 font-bold">OFF (Power Save)</span>
                              )}
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-black/80 border border-blue-500/30 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] font-mono text-slate-400">CURRENT OCCUPANCY</div>
                              <div className="text-3xl font-extrabold text-cyan-300 font-mono tracking-wider">
                                {visitorCount < 10 ? `0${visitorCount}` : visitorCount} <span className="text-xs font-sans text-slate-400 font-normal">Persons</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={handleVisitorEnter}
                                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs font-mono cursor-pointer transition-colors shadow-sm"
                                title="Simulate Entry"
                              >
                                + Enter (In)
                              </button>
                              <button
                                onClick={handleVisitorExit}
                                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono cursor-pointer transition-colors border border-slate-700"
                                title="Simulate Exit"
                              >
                                - Exit (Out)
                              </button>
                            </div>
                          </div>

                          <div className="text-[11px] font-mono text-slate-400 truncate">
                            Log: {lastVisitorEvent}
                          </div>
                        </div>
                      )}

                      {/* SMART SCROLLING DISPLAY */}
                      {project.interactiveType === 'scrolling-display' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                            <span className="flex items-center gap-1.5">
                              <Tv className="w-3.5 h-3.5" />
                              <span>Microcontroller Dot Matrix Simulator</span>
                            </span>
                            <span className="text-[10px] text-slate-400">Active Buffer</span>
                          </div>

                          {/* Matrix LED display marquee */}
                          <div className="p-3 rounded-xl bg-black border border-cyan-500/40 overflow-hidden relative shadow-inner">
                            <div className="text-sm font-mono text-cyan-300 font-bold tracking-widest whitespace-nowrap animate-marquee flex items-center gap-8">
                              <span>*** {scrollingText} ***</span>
                              <span>*** {scrollingText} ***</span>
                            </div>
                          </div>

                          {/* Interactive Text Input */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={scrollingText}
                              onChange={(e) => setScrollingText(e.target.value)}
                              placeholder="Type a notice to scroll..."
                              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-400 outline-none"
                            />
                            <button
                              onClick={() => setScrollingText('HELLO FROM SURIYANARAYANAN R // ECE')}
                              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                              title="Reset text"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SURIYA AI & SALARY PREDICTION */}
                      {project.interactiveType === 'salary-predictor' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                            <span>Linear Regression Estimator</span>
                            <span>IBM SkillsBuild Model</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-black/80 border border-blue-500/30 space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">Years of Experience:</span>
                              <span className="font-mono text-cyan-300 font-bold">{expYears.toFixed(1)} Years</span>
                            </div>

                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="0.5"
                              value={expYears}
                              onChange={(e) => setExpYears(parseFloat(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />

                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                              <span className="text-[11px] font-mono text-slate-400">ESTIMATED COMPENSATION:</span>
                              <span className="text-base font-mono font-extrabold text-cyan-300">
                                ₹{calculatePredictedSalary(expYears)} LPA
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SURVEILLANCE CAR */}
                      {project.interactiveType === 'surveillance-car' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-violet-400">
                            <span className="flex items-center gap-1.5">
                              <Navigation className="w-3.5 h-3.5" />
                              <span>Robotics Chassis Telemetry</span>
                            </span>
                            <span className="text-[10px] text-slate-400">PWM: {carSpeed}%</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 items-center">
                            {/* Direction D-Pad */}
                            <div className="flex flex-col items-center gap-1">
                              <button
                                onMouseDown={() => setCarDirection('FORWARD')}
                                onMouseUp={() => setCarDirection('IDLE')}
                                onTouchStart={() => setCarDirection('FORWARD')}
                                onTouchEnd={() => setCarDirection('IDLE')}
                                className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600/20 text-slate-300 hover:text-cyan-400 border border-slate-700"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <div className="flex gap-2">
                                <button
                                  onMouseDown={() => setCarDirection('LEFT')}
                                  onMouseUp={() => setCarDirection('IDLE')}
                                  onTouchStart={() => setCarDirection('LEFT')}
                                  onTouchEnd={() => setCarDirection('IDLE')}
                                  className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600/20 text-slate-300 hover:text-cyan-400 border border-slate-700"
                                >
                                  <ArrowLeft className="w-4 h-4" />
                                </button>
                                <button
                                  onMouseDown={() => setCarDirection('REVERSE')}
                                  onMouseUp={() => setCarDirection('IDLE')}
                                  onTouchStart={() => setCarDirection('REVERSE')}
                                  onTouchEnd={() => setCarDirection('IDLE')}
                                  className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600/20 text-slate-300 hover:text-cyan-400 border border-slate-700"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>
                                <button
                                  onMouseDown={() => setCarDirection('RIGHT')}
                                  onMouseUp={() => setCarDirection('IDLE')}
                                  onTouchStart={() => setCarDirection('RIGHT')}
                                  onTouchEnd={() => setCarDirection('IDLE')}
                                  className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600/20 text-slate-300 hover:text-cyan-400 border border-slate-700"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Telemetry Display */}
                            <div className="p-3 rounded-xl bg-black/80 border border-slate-800 text-xs font-mono space-y-1">
                              <div className="text-[10px] text-slate-500">ROBOT STATE</div>
                              <div className="text-cyan-300 font-bold">{carDirection}</div>
                              <div className="text-[10px] text-slate-400">Motor: Dual H-Bridge</div>
                              <div className="text-[10px] text-slate-400">Video Link: Ready</div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* TAB 2: REAL PROJECT DEMONSTRATION VIDEO PLAYER */}
                  {activeTab === 'video' && (
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-blue-500/20 space-y-3 mb-5">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                        <span className="flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5" />
                          <span>{project.title} — Demonstration Video</span>
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {activeVideoSrc ? 'Active Player' : 'Pending Footage'}
                        </span>
                      </div>

                      {activeVideoSrc ? (
                        <div className="space-y-2">
                          <div className="rounded-2xl overflow-hidden border border-blue-500/40 bg-black aspect-video flex items-center justify-center shadow-2xl relative">
                            <video
                              src={activeVideoSrc}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                            <span className="flex items-center gap-1 text-cyan-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Native Video Active</span>
                            </span>
                            <label className="text-cyan-400 hover:underline cursor-pointer">
                              <span>Replace Video</span>
                              <input
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime,video/mov,.mp4,.webm,.mov"
                                onChange={(e) => handleSingleVideoUpload(project.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-blue-500/35 bg-slate-950/70 p-6 text-center flex flex-col items-center justify-center space-y-2.5">
                          <div className="p-3 rounded-full bg-blue-500/15 text-cyan-400">
                            <Film className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">
                              Connect Video for "{project.title}"
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-1">
                              Target file: <span className="text-cyan-300 font-semibold">{project.videoPath || `public/videos/${project.videoFileName}`}</span>
                            </div>
                          </div>

                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs font-mono transition-colors shadow-sm cursor-pointer mt-1 border border-blue-400/30">
                            <Upload className="w-3.5 h-3.5 text-cyan-300" />
                            <span>Select Video File (.mp4 / .webm / .mov)</span>
                            <input
                              type="file"
                              accept="video/mp4,video/webm,video/quicktime,video/mov,.mp4,.webm,.mov"
                              onChange={(e) => handleSingleVideoUpload(project.id, e)}
                              className="hidden"
                            />
                          </label>

                          <div className="text-[10px] font-mono text-slate-500 mt-1">
                            *No mockups or fake videos are displayed. Direct local playback supported.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features list */}
                  <div className="space-y-1.5 text-xs text-slate-300 mb-4 font-sans">
                    {project.features?.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with tags */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags?.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 text-[10px] border border-slate-800/80">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-cyan-400 font-medium text-[11px]">
                    Verified Project
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
