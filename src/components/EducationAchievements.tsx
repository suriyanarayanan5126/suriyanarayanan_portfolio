import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  Trophy, 
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { EDUCATION_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData.ts';

export const EducationAchievements: React.FC = () => {
  return (
    <section id="education" className="relative py-28 bg-white text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Background ambient light on white */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-blue-100/35 blur-[180px] pointer-events-none rounded-full" />
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
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>06. ACADEMIC RIGOR & LEADERSHIP</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Achievements</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            A consistent record of academic excellence, peer mentorship as workshop resource person, and top podium finishes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Education Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>Academic Pathway</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-3xl bg-[#fafafc] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-400 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {edu.period}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {edu.score}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 font-heading mb-1">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-mono text-slate-500 mb-3">
                    {edu.institution}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {edu.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Major Honors & Accolades */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Honors & Key Accolades</span>
            </h3>

            <div className="space-y-4">
              {/* Achievement 1: Resource Person */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-7 rounded-3xl bg-[#fafafc] border border-slate-200 hover:border-blue-400 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      Resource Person for 80+ Engineering Students
                    </h4>
                    <span className="text-xs font-mono text-blue-700">Hands-on IoT & AI Workshop</span>
                  </div>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Invited to serve as Resource Person guiding over 80 engineering students on microcontroller hardware, sensor interfacing, and practical AI implementations in electronics at Kings College of Engineering.
                </p>
              </motion.div>

              {/* Achievement 2: Symposium Prizes */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 sm:p-7 rounded-3xl bg-[#fafafc] border border-slate-200 hover:border-blue-400 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      Multiple 1st Prizes & Cash Awards
                    </h4>
                    <span className="text-xs font-mono text-amber-700">Inter-College Technical Symposiums</span>
                  </div>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Secured FIRST Place in international technical symposium Freq Fest '24 (E.G.S. Pillay Engg College), First Prize in Innovation Expo at Acmet '2k25 (M.A.M. School of Engg), and top podium awards at Kings Project Expos.
                </p>
              </motion.div>

              {/* Achievement 3: Patent Filing (Confidential Title Only) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 sm:p-7 rounded-3xl bg-slate-50 border-2 border-dashed border-blue-300 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      Design and Implementation of a Digital Oorai Display using Embedded System
                    </h4>
                    <span className="text-xs font-mono text-blue-700">Patent-Applied Academic Project</span>
                  </div>
                </div>
                <p className="text-slate-600 text-xs font-sans italic">
                  Confidential patent-pending intellectual property. Technical documentation, schematics, and code are protected under intellectual property filing protocol.
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
