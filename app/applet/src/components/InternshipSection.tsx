import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Radio, 
  Brain 
} from 'lucide-react';
import { INTERNSHIPS_DATA } from '../data/portfolioData.ts';

export const InternshipSection: React.FC = () => {
  return (
    <section id="training" className="relative py-28 bg-[#040814] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -left-40 w-[550px] h-[550px] bg-blue-600/12 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-violet-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.18)]">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>SECTOR 04 // INDUSTRY EXPOSURE & TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Internships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">Practical Training</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans">
            Hands-on technical exposure in telecommunication hubs, artificial intelligence curricula, and national engineering initiatives.
          </p>
        </motion.div>

        {/* Timeline Grid with Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INTERNSHIPS_DATA.map((intern, idx) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-blue-500/40 transition-colors">
                    {intern.id.includes('bsnl') ? (
                      <Radio className="w-6 h-6 text-violet-400" />
                    ) : (
                      <Brain className="w-6 h-6 text-cyan-400" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
                    {intern.roleType}
                  </span>
                </div>

                {/* Organization & Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-1 group-hover:text-cyan-300 transition-colors">
                  {intern.title}
                </h3>
                <div className="text-sm font-semibold text-blue-300 font-sans mb-3">
                  {intern.organization}
                </div>

                {/* Metadata tags */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{intern.period}</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{intern.location}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 text-justify font-sans">
                  {intern.description}
                </p>

                {/* Key learnings */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Key Practical Deliverables:
                  </div>
                  {intern.keyLearnings.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Credential Tag */}
              {intern.verifiedCredential && (
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Industrial Record</span>
                  </span>
                  <span className="text-slate-400 truncate max-w-[180px] sm:max-w-[220px]">
                    {intern.verifiedCredential}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
