import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  Lock, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  TrendingUp, 
  Video, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  Tv, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Globe,
  Sparkles,
  Play
} from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData.ts';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'embedded' | 'ai' | 'robotics' | 'web' | 'patent'>('all');
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, 'interactive' | 'video'>>({});
  const [availableVideos, setAvailableVideos] = useState<Record<string, string>>({});

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
          ? 'Sensor B -> Sensor A tripped: Room empty, auto-lighting standby'
          : `Sensor B -> Sensor A tripped: Exit detected (Total: ${next})`
      );
      return next;
    });
  };

  // Discover and verify saved project videos from local assets or session
  useEffect(() => {
    // 1. Check verified paths for each project
    PROJECTS_DATA.forEach((project) => {
      if (project.hasVideoSlot && project.videoPath) {
        const primaryAssetPath = `/assets/projects/${project.videoFileName}`;
        const fallbackPath = project.videoPath;

        // Try primary path first, then fallback
        const videoCheck = document.createElement('video');
        videoCheck.src = primaryAssetPath;
        videoCheck.onloadeddata = () => {
          setAvailableVideos(prev => ({ ...prev, [project.id]: primaryAssetPath }));
        };
        videoCheck.onerror = () => {
          // Check fallback
          const fbCheck = document.createElement('video');
          fbCheck.src = fallbackPath;
          fbCheck.onloadeddata = () => {
            setAvailableVideos(prev => ({ ...prev, [project.id]: fallbackPath }));
          };
        };
      }
    });

    // 2. Check session storage for user-uploaded videos from previous sessions
    try {
      const saved = sessionStorage.getItem('suriyanarayanan_project_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setAvailableVideos(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // Storage access catch
    }
  }, []);

  const getActiveTab = (projectId: string) => activeTabByProject[projectId] || 'interactive';
  const setActiveTab = (projectId: string, tab: 'interactive' | 'video') => {
    setActiveTabByProject(prev => ({ ...prev, [projectId]: tab }));
  };

  const filteredProjects = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28 bg-[#02050c] overflow-hidden scroll-mt-16">
      {/* Ambient background glow in Electric Blue, Cyan, and Coral */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[650px] bg-blue-600/10 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>03. ENGINEERING PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-300">Projects</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Real implementations spanning embedded hardware, sensor automation, robotics, responsive web applications, and machine learning models with interactive simulators.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'embedded', label: 'Embedded & IoT' },
              { id: 'robotics', label: 'Robotics' },
              { id: 'ai', label: 'Machine Learning' },
              { id: 'web', label: 'Web Development' },
              { id: 'patent', label: 'Patent Project' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    : 'bg-[#0b1424] text-slate-400 hover:text-white border border-blue-500/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            // PATENT CARD: STRICT CONFIDENTIALITY COMPLIANCE (Priority 8)
            // "For my confidential patent project, display only this exact title:
            // 'Design and Implementation of a Digital Oorai Display using Embedded System'
            // Do not show any patent description, technical details, images, videos, source code, implementation details, or external project links."
            if (project.isPatentConfidential) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0b1424]/90 via-[#070e1a]/90 to-[#03060c]/90 border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.18)] relative overflow-hidden backdrop-blur-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                          INTELLECTUAL PROPERTY · PATENT APPLICATION
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Status: <span className="text-slate-200 font-semibold">Patent Applied (Confidential)</span>
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-xs font-mono text-cyan-300 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Formal Patent Protection Protocol</span>
                    </div>
                  </div>

                  {/* ONLY THE EXACT MANDATED TITLE DISPLAYED */}
                  <div className="py-8">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-snug">
                      Design and Implementation of a Digital Oorai Display using Embedded System
                    </h3>
                  </div>

                  {/* Confidentiality Notice */}
                  <div className="p-4 rounded-xl bg-black/60 border border-blue-500/20 text-xs text-slate-400 font-mono space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Confidential Patent Project</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      All technical specifications, circuit diagrams, source code, descriptions, images, and implementation details are withheld under intellectual property protection protocol.
                    </p>
                  </div>
                </motion.div>
              );
            }

            // ALL REAL ENGINEERING & WEB PROJECTS
            const activeTab = getActiveTab(project.id);
            const activeVideoSrc = availableVideos[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-3xl bg-[#070e1c]/90 border border-blue-500/25 hover:border-cyan-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between group backdrop-blur-sm"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      {project.category === 'embedded' && <Cpu className="w-5 h-5" />}
                      {project.category === 'robotics' && <Navigation className="w-5 h-5 text-violet-400" />}
                      {project.category === 'ai' && <TrendingUp className="w-5 h-5 text-blue-400" />}
                      {project.category === 'web' && <Globe className="w-5 h-5 text-emerald-400" />}
                    </div>

                    {/* Mode Switcher: Interactive vs Video (when video slot exists) */}
                    {project.hasVideoSlot && (
                      <div className="flex items-center p-0.5 rounded-xl bg-black border border-slate-800 text-[11px] font-mono">
                        <button
                          onClick={() => setActiveTab(project.id, 'interactive')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            activeTab === 'interactive'
                              ? 'bg-cyan-500 text-black font-semibold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Interactive Simulator
                        </button>
                        <button
                          onClick={() => setActiveTab(project.id, 'video')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                            activeTab === 'video'
                              ? 'bg-cyan-500 text-black font-semibold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Video Demonstration</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                    {project.shortSummary}
                  </p>

                  {/* TAB 1: INTERACTIVE SIMULATIONS / LIVE DEMOS */}
                  {(activeTab === 'interactive' || !project.hasVideoSlot) && (
                    <div className="p-4 rounded-2xl bg-black/80 border border-slate-800 space-y-3 mb-5">
                      
                      {/* SMART HOME RELAY CONTROLLER */}
                      {project.interactiveType === 'smart-home' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                            <span className="flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>ESP32 Solid-State Relay Matrix</span>
                            </span>
                            <span className="text-emerald-400 font-bold">● ONLINE</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => setSmartHomeStates(p => ({ ...p, livingLight: !p.livingLight }))}
                              className={`p-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                smartHomeStates.livingLight
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                              }`}
                            >
                              <span>Relay 1</span>
                              <span className="font-bold">{smartHomeStates.livingLight ? 'LIGHT: ON' : 'LIGHT: OFF'}</span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(p => ({ ...p, ceilingFan: !p.ceilingFan }))}
                              className={`p-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                smartHomeStates.ceilingFan
                                  ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                              }`}
                            >
                              <span>Relay 2</span>
                              <span className="font-bold">{smartHomeStates.ceilingFan ? 'FAN: ON' : 'FAN: OFF'}</span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(p => ({ ...p, smartPlug: !p.smartPlug }))}
                              className={`p-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                smartHomeStates.smartPlug
                                  ? 'bg-violet-500/20 border-violet-400 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                              }`}
                            >
                              <span>Relay 3</span>
                              <span className="font-bold">{smartHomeStates.smartPlug ? 'PLUG: ON' : 'PLUG: OFF'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* BIDIRECTIONAL VISITOR COUNTER */}
                      {project.interactiveType === 'visitor-counter' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                            <span>Dual-Beam IR Gate Sensor Simulation</span>
                            <span className="text-slate-400 font-mono text-[10px]">Electrovibez '23 II Prize Winner</span>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <button
                              onClick={handleVisitorEnter}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
                            >
                              + Enter (Sensor A→B)
                            </button>

                            <div className="text-center">
                              <span className="text-2xl font-black font-mono text-cyan-300">
                                {visitorCount}
                              </span>
                              <span className="block text-[10px] text-slate-400 uppercase font-mono">
                                Occupants
                              </span>
                            </div>

                            <button
                              onClick={handleVisitorExit}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all cursor-pointer"
                            >
                              - Exit (Sensor B→A)
                            </button>
                          </div>

                          <div className="text-[11px] font-mono text-slate-400 truncate">
                            {lastVisitorEvent}
                          </div>
                        </div>
                      )}

                      {/* SMART SCROLLING DISPLAY */}
                      {project.interactiveType === 'scrolling-display' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                            <span>LED Matrix Hardware Preview</span>
                            <span className="text-cyan-400 text-[10px]">16x64 Dot Matrix</span>
                          </div>

                          <div className="p-3 rounded-xl bg-black border border-cyan-500/30 overflow-hidden relative">
                            <div className="whitespace-nowrap font-mono text-xs text-cyan-400 tracking-wider animate-marquee">
                              {scrollingText}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={scrollingText}
                              onChange={(e) => setScrollingText(e.target.value)}
                              placeholder="Type custom text to send to moving display..."
                              className="flex-1 bg-slate-950 border border-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg font-mono focus:outline-none focus:border-cyan-400"
                            />
                            <button
                              onClick={() => setScrollingText('WELCOME TO KINGS COLLEGE OF ENGINEERING // ECE 2026 // SURIYANARAYANAN R')}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                              title="Reset message"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SURVEILLANCE CAR ROBOTICS */}
                      {project.interactiveType === 'surveillance-car' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-violet-400">
                            <span>Robotics Remote Control Pad</span>
                            <span className="text-slate-400 text-[10px]">H-Bridge Dual PWM</span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 py-2">
                            <button
                              onMouseDown={() => setCarDirection('FORWARD')}
                              onMouseUp={() => setCarDirection('IDLE')}
                              className={`p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${carDirection === 'FORWARD' ? 'bg-cyan-500 text-black' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onMouseDown={() => setCarDirection('LEFT')}
                                onMouseUp={() => setCarDirection('IDLE')}
                                className={`p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${carDirection === 'LEFT' ? 'bg-cyan-500 text-black' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
                              >
                                <ArrowLeft className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 rounded bg-black font-mono text-xs text-cyan-300 border border-slate-800 min-w-20 text-center">
                                {carDirection}
                              </span>
                              <button
                                onMouseDown={() => setCarDirection('RIGHT')}
                                onMouseUp={() => setCarDirection('IDLE')}
                                className={`p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${carDirection === 'RIGHT' ? 'bg-cyan-500 text-black' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onMouseDown={() => setCarDirection('REVERSE')}
                              onMouseUp={() => setCarDirection('IDLE')}
                              className={`p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${carDirection === 'REVERSE' ? 'bg-cyan-500 text-black' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SALARY PREDICTOR ML */}
                      {project.interactiveType === 'salary-predictor' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-blue-400">
                            <span>Linear Regression Inference Model</span>
                            <span className="text-slate-400 text-[10px]">IBM SkillsBuild Project</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-slate-300">
                              <span>Years of Experience: {expYears.toFixed(1)} yrs</span>
                              <span className="text-cyan-300 font-bold">Estimated: ₹{calculatePredictedSalary(expYears)} LPA</span>
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
                          </div>
                        </div>
                      )}

                      {/* WEB SHOWCASE (FOOD MUNCH & COLLEGE SYMPOSIUM) */}
                      {project.interactiveType === 'web-showcase' && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                            <span>Verified Responsive Frontend</span>
                            <span className="text-[10px] text-slate-400">Mobile-First UI</span>
                          </div>
                          <p className="text-slate-300 text-xs font-sans leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                  {/* TAB 2: REAL PROJECT VIDEO PLAYER (NO UPLOAD CONTROLS) */}
                  {activeTab === 'video' && project.hasVideoSlot && (
                    <div className="rounded-2xl bg-black border border-blue-500/30 overflow-hidden mb-5">
                      {activeVideoSrc ? (
                        <video
                          src={activeVideoSrc}
                          controls
                          className="w-full h-auto max-h-64 object-contain"
                          preload="metadata"
                        >
                          Your browser does not support HTML5 video.
                        </video>
                      ) : (
                        <div className="p-8 text-center space-y-2">
                          <Video className="w-8 h-8 text-cyan-400 mx-auto opacity-70" />
                          <p className="text-xs font-mono text-slate-300">
                            Demonstration footage recorded for {project.title}.
                          </p>
                          <p className="text-[11px] text-slate-500 font-sans">
                            File source: <code className="text-cyan-300 font-mono">/assets/projects/{project.videoFileName}</code>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-blue-950/40 text-slate-300 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
