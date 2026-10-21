import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  Lock, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Video, 
  Navigation, 
  Globe,
  Play,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData.ts';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'embedded' | 'ai' | 'robotics' | 'web' | 'patent'>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28 bg-[#ffffff] text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Radiant ambient lighting on pure white background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-100/40 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-100/35 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 shadow-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold tracking-wider uppercase">03. ENGINEERING ARTIFACTS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-500">Projects</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            Hands-on hardware systems, microcontroller firmware, sensor automation, and real MP4 video demonstrations of working prototypes.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'embedded', label: 'Embedded & IoT' },
              { id: 'robotics', label: 'Robotics' },
              { id: 'ai', label: 'AI & ML' },
              { id: 'web', label: 'Web Applications' },
              { id: 'patent', label: 'Patent Inventions' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                  filter === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            // STRICT PATENT CONFIDENTIALITY:
            // Display ONLY the exact title:
            // "Design and Implementation of a Digital Oorai Display using Embedded System"
            // No technical details, circuit diagrams, code, algorithm, images, videos or links.
            if (project.isPatentConfidential) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-slate-50 border-2 border-dashed border-blue-300 shadow-md relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      <Lock className="w-3.5 h-3.5 text-blue-700" />
                      <span>Patent Application Status: Active</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Intellectual Property · Embedded System
                    </span>
                  </div>

                  {/* ONLY THE EXACT MANDATED TITLE DISPLAYED */}
                  <div className="py-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                      Design and Implementation of a Digital Oorai Display using Embedded System
                    </h3>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {project.category === 'embedded' && <Cpu className="w-5 h-5" />}
                      {project.category === 'robotics' && <Navigation className="w-5 h-5" />}
                      {project.category === 'ai' && <TrendingUp className="w-5 h-5" />}
                      {project.category === 'web' && <Globe className="w-5 h-5" />}
                    </div>

                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {project.type}
                    </span>
                  </div>

                  {/* Title & Short Summary */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 font-sans">
                    {project.shortSummary}
                  </p>

                  {/* GENUINE PLAYABLE HTML5 VIDEO PLAYER (Exact Uploaded Original MP4) */}
                  {project.hasVideoSlot && project.videoFileName && (
                    <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm mb-5 flex flex-col">
                      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          poster={project.thumbnailUrl}
                          className="w-full h-full object-contain"
                        >
                          <source src={`/assets/projects/${project.videoFileName}`} type="video/mp4" />
                          <source src={`/videos/${encodeURIComponent(project.videoFileName)}`} type="video/mp4" />
                          <source src={`/assets/projects/${encodeURIComponent(project.videoFileName)}`} type="video/mp4" />
                          <source src={project.videoPath} type="video/mp4" />
                          Your browser does not support HTML5 video.
                        </video>

                        {/* Top Video Filename Tag */}
                        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-xs flex items-center gap-1.5">
                            <Video className="w-3 h-3 text-blue-600" />
                            <span>{project.videoFileName}</span>
                          </span>
                        </div>
                      </div>

                      {/* Video Player Caption with Open Link */}
                      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 text-blue-600" />
                          <span>Original MP4 Video</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`/videos/${encodeURIComponent(project.videoFileName)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                            title="Open original MP4 in new tab"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Open</span>
                          </a>
                          <span className="text-slate-300">·</span>
                          <span className="text-[11px] text-slate-500 font-semibold">Playable</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Features Bullet List */}
                  {project.features && (
                    <div className="space-y-2 mb-5">
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags Strip */}
                {project.tags && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
