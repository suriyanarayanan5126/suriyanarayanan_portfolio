import React, { useState } from 'react';
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
  Navigation, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Globe,
  Play,
  Volume2
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData.ts';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'embedded' | 'ai' | 'robotics' | 'web' | 'patent'>('all');
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, 'video' | 'interactive'>>({
    'smart-home-automation': 'video',
    'visitor-counter': 'video',
    'smart-scrolling-display': 'video',
    'suriya-ai': 'video',
    'surveillance-car': 'video',
  });

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
      setLastVisitorEvent(`Sensor A → Sensor B tripped: Entry detected (Total: ${next})`);
      return next;
    });
  };

  const handleVisitorExit = () => {
    setVisitorCount((prev) => {
      const next = Math.max(0, prev - 1);
      setLastVisitorEvent(
        next === 0
          ? 'Sensor B → Sensor A tripped: Room empty, auto-lighting standby'
          : `Sensor B → Sensor A tripped: Exit detected (Total: ${next})`
      );
      return next;
    });
  };

  const getActiveTab = (projectId: string) => activeTabByProject[projectId] || 'video';
  const setActiveTab = (projectId: string, tab: 'video' | 'interactive') => {
    setActiveTabByProject(prev => ({ ...prev, [projectId]: tab }));
  };

  const filteredProjects = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28 bg-[#fbfcfd] text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200/80">
      {/* Subtle Warm & Blue Background Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-100/40 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-100/35 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 shadow-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold tracking-wider uppercase">03. ENGINEERING & HARDWARE PORTFOLIO</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Projects</span>
          </h2>

          <p className="text-slate-600 text-base max-w-2xl font-sans">
            Hands-on implementations in embedded systems, IoT architectures, sensor automation, robotics, and machine learning models with playable demonstration videos.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'embedded', label: 'Embedded & IoT' },
              { id: 'robotics', label: 'Robotics' },
              { id: 'ai', label: 'Machine Learning' },
              { id: 'web', label: 'Web Applications' },
              { id: 'patent', label: 'Patent Project' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  filter === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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
            // STRICT PATENT CONFIDENTIALITY RULE (Requirement 9)
            // "Display only this exact project title:
            // 'Design and Implementation of a Digital Oorai Display using Embedded System'
            // Do not show its description, technical details, images, videos, source code, implementation information, circuit diagrams, algorithms, technology stack, or external project links."
            if (project.isPatentConfidential) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-2 p-7 sm:p-9 rounded-3xl bg-white border-2 border-blue-200 shadow-sm relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-blue-700 uppercase tracking-widest block font-bold">
                          INTELLECTUAL PROPERTY · PATENT APPLICATION
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          Status: <strong className="text-slate-800">Patent Applied (Confidential)</strong>
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Formal Patent Protection Protocol</span>
                    </div>
                  </div>

                  {/* ONLY THE EXACT MANDATED TITLE DISPLAYED */}
                  <div className="py-8">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                      Design and Implementation of a Digital Oorai Display using Embedded System
                    </h3>
                  </div>

                  {/* Non-technical Confidentiality Notice */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-sans leading-relaxed">
                    Technical details, circuit designs, source code, and implementation data are confidential pursuant to intellectual property patent filing.
                  </div>
                </motion.div>
              );
            }

            const activeTab = getActiveTab(project.id);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-blue-600 group-hover:bg-blue-50 transition-colors">
                      {project.category === 'embedded' && <Cpu className="w-5 h-5 text-blue-600" />}
                      {project.category === 'robotics' && <Navigation className="w-5 h-5 text-indigo-600" />}
                      {project.category === 'ai' && <TrendingUp className="w-5 h-5 text-sky-600" />}
                      {project.category === 'web' && <Globe className="w-5 h-5 text-emerald-600" />}
                    </div>

                    {/* Mode Switcher: Video Player vs Interactive Simulator */}
                    {project.hasVideoSlot && (
                      <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
                        <button
                          onClick={() => setActiveTab(project.id, 'video')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            activeTab === 'video'
                              ? 'bg-white text-blue-700 font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                          <span>Video Demonstration</span>
                        </button>
                        <button
                          onClick={() => setActiveTab(project.id, 'interactive')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            activeTab === 'interactive'
                              ? 'bg-white text-blue-700 font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Simulator
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 font-sans">
                    {project.shortSummary}
                  </p>

                  {/* TAB 1: GENUINE PLAYABLE HTML5 VIDEO PLAYER (Exact Requirement 4) */}
                  {activeTab === 'video' && project.hasVideoSlot && (
                    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm mb-5 flex flex-col">
                      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                        <video
                          id={`video-player-${project.id}`}
                          src={`/videos/${project.videoFileName}`}
                          poster={project.thumbnailUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain"
                        >
                          <source src={`/videos/${project.videoFileName}`} type="video/mp4" />
                          <source src={`/assets/projects/${project.videoFileName}`} type="video/mp4" />
                          Your browser does not support HTML5 video.
                        </video>

                        {/* Top Video Filename Tag */}
                        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-sm flex items-center gap-1.5">
                            <Video className="w-3 h-3 text-blue-600" />
                            <span>{project.videoFileName}</span>
                          </span>
                        </div>
                      </div>

                      {/* Video Player Caption */}
                      <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 text-blue-600" />
                          <span>Actual Video Demonstration</span>
                        </span>
                        <span className="text-[11px] text-slate-400">1080p Playable MP4</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: INTERACTIVE SIMULATION */}
                  {(activeTab === 'interactive' || !project.hasVideoSlot) && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 mb-5">
                      {/* SMART HOME RELAY CONTROLLER */}
                      {project.interactiveType === 'smart-home' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-blue-700">
                            <span className="flex items-center gap-1.5 font-semibold">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>ESP32 Solid-State Relay Matrix</span>
                            </span>
                            <span className="text-emerald-600 font-bold">● ONLINE</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => setSmartHomeStates(p => ({ ...p, livingLight: !p.livingLight }))}
                              className={`p-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                smartHomeStates.livingLight
                                  ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-500'
                              }`}
                            >
                              <span>Relay 1</span>
                              <span className="text-[11px]">{smartHomeStates.livingLight ? 'LIGHT: ON' : 'LIGHT: OFF'}</span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(p => ({ ...p, ceilingFan: !p.ceilingFan }))}
                              className={`p-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                smartHomeStates.ceilingFan
                                  ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-500'
                              }`}
                            >
                              <span>Relay 2</span>
                              <span className="text-[11px]">{smartHomeStates.ceilingFan ? 'FAN: ON' : 'FAN: OFF'}</span>
                            </button>

                            <button
                              onClick={() => setSmartHomeStates(p => ({ ...p, smartPlug: !p.smartPlug }))}
                              className={`p-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                smartHomeStates.smartPlug
                                  ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-500'
                              }`}
                            >
                              <span>Relay 3</span>
                              <span className="text-[11px]">{smartHomeStates.smartPlug ? 'PLUG: ON' : 'PLUG: OFF'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* BIDIRECTIONAL VISITOR COUNTER */}
                      {project.interactiveType === 'visitor-counter' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-blue-700">
                            <span className="font-semibold">Dual-Beam IR Gate Sensor Simulation</span>
                            <span className="text-slate-500 text-[10px]">Electrovibez '23 II Prize Winner</span>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                            <button
                              onClick={handleVisitorEnter}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                            >
                              + Enter (A→B)
                            </button>

                            <div className="text-center">
                              <span className="text-2xl font-black font-mono text-slate-900">
                                {visitorCount}
                              </span>
                              <span className="block text-[10px] text-slate-500 uppercase font-mono">
                                Occupants
                              </span>
                            </div>

                            <button
                              onClick={handleVisitorExit}
                              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold transition-all cursor-pointer border border-slate-200"
                            >
                              - Exit (B→A)
                            </button>
                          </div>

                          <div className="text-[11px] font-mono text-slate-500 truncate">
                            {lastVisitorEvent}
                          </div>
                        </div>
                      )}

                      {/* SMART SCROLLING DISPLAY */}
                      {project.interactiveType === 'scrolling-display' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-blue-700">
                            <span className="font-semibold">LED Dot Matrix Display Preview</span>
                            <span className="text-slate-500 text-[10px]">16x64 Dot Matrix</span>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative">
                            <div className="whitespace-nowrap font-mono text-xs text-sky-300 tracking-wider animate-marquee">
                              {scrollingText}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={scrollingText}
                              onChange={(e) => setScrollingText(e.target.value)}
                              placeholder="Type text to preview on moving marquee..."
                              className="flex-1 bg-white border border-slate-200 text-slate-800 text-xs px-2.5 py-1.5 rounded-lg font-mono focus:outline-none focus:border-blue-500 shadow-xs"
                            />
                            <button
                              onClick={() => setScrollingText('WELCOME TO KINGS COLLEGE OF ENGINEERING // ECE 2026 // SURIYANARAYANAN R')}
                              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                              title="Reset text"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SURVEILLANCE CAR ROBOTICS */}
                      {project.interactiveType === 'surveillance-car' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-indigo-700">
                            <span className="font-semibold">Robotics Remote Direction Pad</span>
                            <span className="text-slate-500 text-[10px]">H-Bridge Dual PWM</span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 py-1">
                            <button
                              onMouseDown={() => setCarDirection('FORWARD')}
                              onMouseUp={() => setCarDirection('IDLE')}
                              className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${carDirection === 'FORWARD' ? 'bg-blue-600 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-xs'}`}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onMouseDown={() => setCarDirection('LEFT')}
                                onMouseUp={() => setCarDirection('IDLE')}
                                className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${carDirection === 'LEFT' ? 'bg-blue-600 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-xs'}`}
                              >
                                <ArrowLeft className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 rounded-lg bg-white font-mono text-xs text-blue-700 border border-slate-200 min-w-20 text-center font-bold">
                                {carDirection}
                              </span>
                              <button
                                onMouseDown={() => setCarDirection('RIGHT')}
                                onMouseUp={() => setCarDirection('IDLE')}
                                className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${carDirection === 'RIGHT' ? 'bg-blue-600 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-xs'}`}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onMouseDown={() => setCarDirection('REVERSE')}
                              onMouseUp={() => setCarDirection('IDLE')}
                              className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${carDirection === 'REVERSE' ? 'bg-blue-600 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-xs'}`}
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SALARY PREDICTOR ML */}
                      {project.interactiveType === 'salary-predictor' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono text-sky-700">
                            <span className="font-semibold">Linear Regression Inference Model</span>
                            <span className="text-slate-500 text-[10px]">IBM SkillsBuild Project</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-slate-700">
                              <span>Experience: <strong>{expYears.toFixed(1)} yrs</strong></span>
                              <span className="text-blue-700 font-bold">Estimated: ₹{calculatePredictedSalary(expYears)} LPA</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="0.5"
                              value={expYears}
                              onChange={(e) => setExpYears(parseFloat(e.target.value))}
                              className="w-full accent-blue-600 cursor-pointer"
                            />
                          </div>
                        </div>
                      )}

                      {/* WEB APPLICATION SHOWCASE */}
                      {project.interactiveType === 'web-showcase' && (
                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-emerald-700 font-semibold">
                            <span>Verified Responsive Frontend</span>
                            <span className="text-[10px] text-slate-500">HTML5 · CSS3 · Bootstrap</span>
                          </div>
                          <p className="text-slate-600 text-xs font-sans leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Tag Badges */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
