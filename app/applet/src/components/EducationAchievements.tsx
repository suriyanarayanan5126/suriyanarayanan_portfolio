import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  Trophy, 
  CheckCircle2 
} from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData.ts';

export const EducationAchievements: React.FC = () => {
  return (
    <section id="education" className="relative py-28 bg-[#030712] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-blue-600/10 blur-[170px] pointer-events-none rounded-full" />
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
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            <span>SECTOR 06 // ACADEMIC RIGOR & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">Achievements</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans">
            A consistent record of academic excellence, peer mentorship, and podium finishes in technical symposiums.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Education Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Academic Pathway</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div
                  key={edu.institution}
                  className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-xl relative overflow-hidden group backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-blue-300 mt-0.5 font-sans">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono px-3 py-1 rounded-xl bg-blue-950/70 border border-blue-500/40 text-cyan-300 font-bold shadow-sm">
                        {edu.score}
                      </span>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        {edu.period}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-3 pt-3 border-t border-slate-800 font-sans">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Major Leadership & Honors */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Leadership & Milestone Recognitions</span>
            </h3>

            <div className="space-y-4">
              {/* Highlight 1: Resource Person */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0c142b]/90 to-slate-950/95 border-2 border-blue-500/35 shadow-[0_15px_40px_rgba(59,130,246,0.18)] relative backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-cyan-400 shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                      RESOURCE PERSON & INSTRUCTOR
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading">
                      Hands-on Workshop for 80+ Students
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-mono text-cyan-300 mb-2 font-semibold">
                  Topic: "IoT and AI in Electronics"
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify font-sans">
                  Served as an official Resource Person, delivering practical circuit demonstrations, microcontroller firmware programming, and AI sensor integration for over 80 engineering students.
                </p>
              </div>

              {/* Highlight 2: Symposium 1st Prizes */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-cyan-400/50 transition-all shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                      TOP PODIUM FINISHES
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading">
                      Inter-College Technical Symposiums
                    </h4>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>1st Place Winner:</strong> Freq Fest '24 International Symposium (EGS Pillay Engg College) — Economic Electronic Garments Design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>1st Prize Winner:</strong> Acmet '2k25 13th National Level Fest (MAM School of Engg) — Innovation Expo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>1st Place Winner:</strong> Kings College of Engineering Mini Project Expo 2023</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>II Prize Winner:</strong> Electrovibez '23 National Technical Symposium — Visitor counter with light control</span>
                  </li>
                </ul>
              </div>

              {/* Highlight 3: Patent Filing */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-cyan-400/50 transition-all shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                      PATENT APPLICATION
                    </span>
                    <h4 className="text-base font-bold text-white font-heading">
                      Innovative Embedded Hardware Design
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300">
                  Application No: <span className="text-white font-semibold">TN/PIC/20256-26-PA106</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
