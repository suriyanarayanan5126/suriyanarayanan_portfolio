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

  // Intelligent matching of uploaded video files to the project ID
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
    if (lower.includes('car') || lower.includes('surveillance') || lower.includes('robot')) {
      return 'surveillance-car';
    }
    return null;
  };

  const handleBatchVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const matched: Record<string, string> = { ...videoUrls };
    let matchCount = 0;

    Array.from(files).forEach((file) => {
      const targetId = matchFileToProjectId(file.name);
      if (targetId) {
        const url = URL.createObjectURL(file);
        matched[targetId] = url;
        matchCount++;
      }
    });

    setVideoUrls(matched);
    if (matchCount > 0) {
      setBatchNotice(`Connected ${matchCount} video file(s) to respective project demonstration cards!`);
    } else {
      setBatchNotice(`Selected ${files.length} video(s). Please use the individual 'Select Video' buttons on each card to map specific files.`);
    }

    try {
      sessionStorage.setItem('suriyanarayanan_project_videos', JSON.stringify(matched));
    } catch {
      // session fallback
    }

    if (batchFileInputRef.current) batchFileInputRef.current.value = '';
  };

  const handleSingleVideoUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updated = { ...videoUrls, [projectId]: url };
      setVideoUrls(updated);
      try {
        sessionStorage.setItem('suriyanarayanan_project_videos', JSON.stringify(updated));
      } catch {
        // session fallback
      }
    }
  };

  const getActiveTab = (projectId: string) => activeTabByProject[projectId] || 'interactive';
  const setActiveTab = (projectId: string, tab: 'interactive' | 'video') => {
    setActiveTabByProject(prev => ({ ...prev, [projectId]: tab }));
  };

  const filteredProjects = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === filter);

  // Count connected videos (excluding patent confidential which has no video slot)
  const nonPatentProjectsWithVideos = PROJECTS_DATA.filter(p => !p.isPatentConfidential && p.hasVideoSlot);
  const connectedVideosCount = nonPatentProjectsWithVideos.filter(p => !!videoUrls[p.id]).length;

  return (
    <section id="projects" className="relative py-28 bg-[#04070c] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500/6 blur-[180px] pointer-events-none rounded-full" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTOR 03 // ENGINEERING PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-200">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Real implementations spanning embedded hardware, sensor automation, robotics, and machine learning, with live interactive simulators and demonstration video players.
          </p>

          {/* Project Demonstration Videos Connection Banner */}
          <div className="w-full max-w-3xl mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#070d13] via-[#091118] to-[#070d13] border border-emerald-500/35 shadow-[0_0_30px_rgba(16,185,129,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {connectedVideosCount > 0 ? 'Project Videos Connected' : 'Connect Real Project Videos'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    connectedVideosCount > 0 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {connectedVideosCount} / {nonPatentProjectsWithVideos.length} Videos Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Connect Videos</span>
              </label>
            </div>
          </div>

          {/* Batch Notice Notification */}
          {batchNotice && (
            <div className="w-full max-w-3xl mt-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{batchNotice}</span>
              </span>
              <button onClick={() => setBatchNotice(null)} className="text-emerald-400 hover:text-white">
                ✕
              </button>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1 rounded-xl bg-slate-950/90 border border-slate-800/80 mt-6 shadow-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({PROJECTS_DATA.length})
            </button>
            <button
              onClick={() => setFilter('patent')}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                filter === 'patent'
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Patent Applied
            </button>
            <button
              onClick={() => setFilter('embedded')}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                filter === 'embedded'
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Embedded & IoT
            </button>
            <button
              onClick={() => setFilter('robotics')}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                filter === 'robotics'
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Robotics
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                filter === 'ai'
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Machine Learning
            </button>
          </div>
        </motion.div>

        {/* Projects Grid with Staggered 3D Depth Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            // PATENT CARD: STRICT CONFIDENTIALITY COMPLIANCE
            // "For 'Design and Implementation of a Digital Oorai Display using Embedded System', show only the project title.
            // Do not show a description, image, video, technologies, implementation details, source code, circuit diagrams, algorithms, or project links."
            if (project.isPatentConfidential) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c141d]/90 via-[#090d14]/90 to-[#05070a]/90 border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.18)] relative overflow-hidden backdrop-blur-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                          INTELLECTUAL PROPERTY · PATENT APPLICATION
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Application No: <span className="text-slate-200 font-semibold">{project.patentNumber}</span>
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5" />
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
                  <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 text-xs text-slate-400 font-mono space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
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
                className="p-6 sm:p-7 rounded-2xl bg-[#090e15]/90 border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between group backdrop-blur-sm"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
                      {project.category === 'embedded' && <Cpu className="w-5 h-5" />}
                      {project.category === 'robotics' && <Navigation className="w-5 h-5 text-lime-400" />}
                      {project.category === 'ai' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                    </div>

                    {/* Mode Switcher Tabs: Interactive vs Video Demo */}
                    <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                      <button
                        onClick={() => setActiveTab(project.id, 'interactive')}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          activeTab === 'interactive'
                            ? 'bg-emerald-500 text-black font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Simulation
                      </button>
                      <button
                        onClick={() => setActiveTab(project.id, 'video')}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'video'
                            ? 'bg-emerald-500 text-black font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Video className="w-3 h-3" />
                        <span>Video {activeVideoSrc ? '✓' : 'Slot'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                    {project.shortSummary}
                  </p>

                  {/* TAB 1: INTERACTIVE SIMULATIONS */}
                  {activeTab === 'interactive' && (
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 mb-5">
                      
                      {/* SMART HOME RELAY CONTROLLER */}
                      {project.interactiveType === 'smart-home' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                            <span className="flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>Simulated ESP32 Relay Console</span>
                            </span>
                            <span className="text-[10px] text-slate-400">Real-time Switching</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <button
                              onClick={() => setSmartHomeStates(s => ({ ...s, livingLight: !s.livingLight }))}
                              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                smartHomeStates.livingLight
                                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">Relay 1: Light</span>
                                <span className={`w-2 h-2 rounded-full ${smartHomeStates.livingLight ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-emerald-400">
                                {smartHomeStates.livingLight ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
                              </span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(s => ({ ...s, ceilingFan: !s.ceilingFan }))}
                              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                smartHomeStates.ceilingFan
                                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">Relay 2: Fan</span>
                                <span className={`w-2 h-2 rounded-full ${smartHomeStates.ceilingFan ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-emerald-400">
                                {smartHomeStates.ceilingFan ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
                              </span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(s => ({ ...s, smartPlug: !s.smartPlug }))}
                              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                smartHomeStates.smartPlug
                                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">Relay 3: Appliance</span>
                                <span className={`w-2 h-2 rounded-full ${smartHomeStates.smartPlug ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-emerald-400">
                                {smartHomeStates.smartPlug ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* BIDIRECTIONAL VISITOR COUNTER */}
                      {project.interactiveType === 'visitor-counter' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                            <span>Dual IR Beam Gate Simulator</span>
                            <span className="font-semibold">
                              Room Light: {visitorCount > 0 ? (
                                <span className="text-emerald-300 font-bold">ON (Occupied)</span>
                              ) : (
                                <span className="text-rose-400 font-bold">OFF (Power Save)</span>
                              )}
                            </span>
                          </div>

                          <div className="p-3 rounded-lg bg-black/80 border border-emerald-500/30 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] font-mono text-slate-400">CURRENT OCCUPANCY</div>
                              <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-wider">
                                {visitorCount < 10 ? `0${visitorCount}` : visitorCount} <span className="text-xs font-sans text-slate-400 font-normal">Persons</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={handleVisitorEnter}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono cursor-pointer transition-colors shadow-sm"
                                title="Simulate Entry"
                              >
                                + Enter (In)
                              </button>
                              <button
                                onClick={handleVisitorExit}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono cursor-pointer transition-colors border border-slate-700"
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
                          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                            <span className="flex items-center gap-1.5">
                              <Tv className="w-3.5 h-3.5" />
                              <span>Microcontroller Dot Matrix Simulator</span>
                            </span>
                            <span className="text-[10px] text-slate-400">Active Buffer</span>
                          </div>

                          {/* Matrix LED display marquee */}
                          <div className="p-3 rounded-lg bg-black border border-emerald-500/40 overflow-hidden relative">
                            <div className="text-sm font-mono text-emerald-400 font-bold tracking-widest whitespace-nowrap animate-marquee flex items-center gap-8">
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
                              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:border-emerald-400 outline-none"
                            />
                            <button
                              onClick={() => setScrollingText('HELLO FROM SURIYANARAYANAN R // ECE')}
                              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
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
                          <div className="flex items-center justify-between text-xs font-mono text-lime-400">
                            <span>Linear Regression Estimator</span>
                            <span>IBM SkillsBuild Model</span>
                          </div>

                          <div className="p-3.5 rounded-lg bg-black/80 border border-emerald-500/30 space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">Years of Experience:</span>
                              <span className="font-mono text-emerald-400 font-bold">{expYears.toFixed(1)} Years</span>
                            </div>

                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="0.5"
                              value={expYears}
                              onChange={(e) => setExpYears(parseFloat(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer"
                            />

                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                              <span className="text-[11px] font-mono text-slate-400">ESTIMATED COMPENSATION:</span>
                              <span className="text-base font-mono font-extrabold text-lime-400">
                                ₹{calculatePredictedSalary(expYears)} LPA
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SURVEILLANCE CAR */}
                      {project.interactiveType === 'surveillance-car' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-lime-400">
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
                                className="p-2 rounded bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <div className="flex gap-2">
                                <button
                                  onMouseDown={() => setCarDirection('LEFT')}
                                  onMouseUp={() => setCarDirection('IDLE')}
                                  onTouchStart={() => setCarDirection('LEFT')}
                                  onTouchEnd={() => setCarDirection('IDLE')}
                                  className="p-2 rounded bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700"
                                >
                                  <ArrowLeft className="w-4 h-4" />
                                </button>
                                <button
                                  onMouseDown={() => setCarDirection('REVERSE')}
                                  onMouseUp={() => setCarDirection('IDLE')}
                                  onTouchStart={() => setCarDirection('REVERSE')}
                                  onTouchEnd={() => setCarDirection('IDLE')}
                                  className="p-2 rounded bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>
                                <button
                                  onMouseDown={() => setCarDirection('RIGHT')}
                                  onMouseUp={() => setCarDirection('IDLE')}
                                  onTouchStart={() => setCarDirection('RIGHT')}
                                  onTouchEnd={() => setCarDirection('IDLE')}
                                  className="p-2 rounded bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Telemetry Display */}
                            <div className="p-2.5 rounded-lg bg-black/80 border border-slate-800 text-xs font-mono space-y-1">
                              <div className="text-[10px] text-slate-500">ROBOT STATE</div>
                              <div className="text-emerald-400 font-bold">{carDirection}</div>
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
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 mb-5">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
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
                          <div className="rounded-xl overflow-hidden border border-emerald-500/40 bg-black aspect-video flex items-center justify-center shadow-2xl relative">
                            <video
                              src={activeVideoSrc}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Native Video Active</span>
                            </span>
                            <label className="text-emerald-400 hover:underline cursor-pointer">
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
                        <div className="rounded-xl border border-dashed border-emerald-500/35 bg-[#060a0f] p-6 text-center flex flex-col items-center justify-center space-y-2.5">
                          <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                            <Film className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">
                              Connect Video for "{project.title}"
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-1">
                              Target file: <span className="text-emerald-300 font-semibold">{project.videoPath || `public/videos/${project.videoFileName}`}</span>
                            </div>
                          </div>

                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-colors shadow-sm cursor-pointer mt-1">
                            <Upload className="w-3.5 h-3.5" />
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
                  <div className="space-y-1.5 text-xs text-slate-400 mb-4 font-sans">
                    {project.features?.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with tags */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags?.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-emerald-400 font-medium text-[11px]">
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
