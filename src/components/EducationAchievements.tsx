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
    <section id="education" className="relative py-28 bg-[#040609] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/6 blur-[160px] pointer-events-none rounded-full" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <GraduationCap className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTOR 06 // ACADEMIC RIGOR & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-200">Achievements</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
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
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Academic Pathway</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div
                  key={edu.institution}
                  className="p-6 rounded-2xl bg-[#090d14]/90 border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 shadow-lg relative overflow-hidden group backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-0.5 font-sans">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
                        {edu.score}
                      </span>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">
                        {edu.period}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-800 font-sans">
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
              <Trophy className="w-5 h-5 text-lime-400" />
              <span>Leadership & Milestone Recognitions</span>
            </h3>

            <div className="space-y-4">
              {/* Highlight 1: Resource Person */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c141d]/90 to-[#070b10]/90 border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      RESOURCE PERSON & INSTRUCTOR
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading">
                      Hands-on Workshop for 80+ Students
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-mono text-emerald-300 mb-2">
                  Topic: "IoT and AI in Electronics"
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify font-sans">
                  Served as an official Resource Person, delivering practical circuit demonstrations, microcontroller firmware programming, and AI sensor integration for over 80 engineering students.
                </p>
              </div>

              {/* Highlight 2: Symposium 1st Prizes */}
              <div className="p-6 rounded-2xl bg-[#090d14]/90 border border-emerald-500/20 hover:border-emerald-400/40 transition-all shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-lime-500/20 border border-lime-500/40 text-lime-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-lime-400 font-bold block">
                      TOP PODIUM FINISHES
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading">
                      Inter-College Technical Symposiums
                    </h4>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1st Place Winner:</strong> Freq Fest '24 International Symposium (EGS Pillay Engg College) — Economic Electronic Garments Design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1st Prize Winner:</strong> Acmet '2k25 13th National Level Fest (MAM School of Engg) — Innovation Expo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1st Place Winner:</strong> Kings College of Engineering Mini Project Expo 2023</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>II Prize Winner:</strong> Electrovibez '23 National Technical Symposium — Visitor counter with light control</span>
                  </li>
                </ul>
              </div>

              {/* Highlight 3: Patent Filing */}
              <div className="p-6 rounded-2xl bg-[#090d14]/90 border border-emerald-500/20 hover:border-emerald-400/40 transition-all shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      PATENT APPLICATION
                    </span>
                    <h4 className="text-base font-bold text-white font-heading">
                      Innovative Embedded Hardware Design
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400">
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
