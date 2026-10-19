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
    <section id="training" className="relative py-28 bg-[#fafafc] text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Background radiant glow on white */}
      <div className="absolute top-1/2 -left-40 w-[550px] h-[550px] bg-blue-100/40 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold tracking-wider uppercase">04. INDUSTRY EXPOSURE & TRAINING</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Internships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Practical Training</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            Hands-on technical exposure in telecommunication hubs, artificial intelligence curricula, and national engineering initiatives.
          </p>
        </motion.div>

        {/* Timeline Grid with Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INTERNSHIPS_DATA.map((intern, idx) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {intern.id.includes('bsnl') ? (
                      <Radio className="w-6 h-6" />
                    ) : (
                      <Brain className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {intern.roleType}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-1.5 group-hover:text-blue-600 transition-colors">
                  {intern.title}
                </h3>

                <div className="text-xs font-mono font-semibold text-blue-700 mb-4">
                  {intern.organization}
                </div>

                {/* Period & Location Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 mb-5 pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{intern.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{intern.location}</span>
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5 font-sans">
                  {intern.description}
                </p>

                {/* Key Learnings */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    Key Practical Learnings:
                  </span>
                  {intern.keyLearnings.map((learning, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{learning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Credential Footer */}
              {intern.verifiedCredential && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Verified Credential:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="truncate max-w-[200px]">{intern.verifiedCredential}</span>
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
