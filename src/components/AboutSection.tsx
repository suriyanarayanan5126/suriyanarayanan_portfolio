import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Code2, 
  Users, 
  CheckCircle, 
  Compass, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { headerEntrance, containerStagger, cardEntrance, slideFromLeft, slideFromRight } from '../utils/motionVariants.ts';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      title: "Embedded & IoT Engineering",
      description: "Hands-on experience with microcontrollers, ESP32 boards, relay drivers, infrared sensors, and hardware-software integration for real-time applications."
    },
    {
      icon: <Code2 className="w-6 h-6 text-lime-400" />,
      title: "Java Full Stack & Web",
      description: "Solid grounding in Core Java, Object-Oriented Programming, HTML5, CSS3, Bootstrap grid architectures, and responsive web design certified by NxtWave & Unique Innovibe."
    },
    {
      icon: <Radio className="w-6 h-6 text-emerald-400" />,
      title: "Telecom & Networking",
      description: "Practical in-plant training at BSNL Thanjavur covering telecommunication switching, optical fibre cable (OFC) transmission, and broadband technology."
    },
    {
      icon: <Users className="w-6 h-6 text-lime-400" />,
      title: "Technical Leadership & Mentorship",
      description: "Served as a Resource Person conducting an interactive hands-on workshop on IoT and AI in Electronics for 80+ engineering peers."
    }
  ];

  const coreStrengths = [
    { name: "Problem Solving", desc: "Systematic circuit debugging, algorithmic logic, and code optimization" },
    { name: "Leadership", desc: "Project team lead for patent-applied embedded system and workshop mentor" },
    { name: "Teamwork", desc: "Collaborated in high-stakes hackathons, expos, and industrial training" },
    { name: "Communication", desc: "Articulate presenter at national symposiums and international student forums" },
    { name: "Adaptability", desc: "Quickly mastering emerging stacks across hardware, software, and AI paradigms" },
    { name: "Quick Learning", desc: "Transitioning rapidly from academic concepts to functioning physical prototypes" }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#04070b] overflow-hidden scroll-mt-16">
      {/* Cinematic Ambient Lighting for Sector 01 */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-emerald-500/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] bg-lime-500/6 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-circuit-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll-Triggered Reveal */}
        <motion.div
          variants={headerEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Compass className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTOR 01 // IDENTITY & ENGINEERING CORE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-200">Suriyanarayanan</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Bridging hardware circuits and software systems with rigorous engineering discipline and builder curiosity.
          </p>
        </motion.div>

        {/* Narrative & Pillars Grid with Staggered Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Narrative */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1219]/90 to-[#070b0f]/90 border border-emerald-500/25 shadow-[0_0_35px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-4">
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                <span>The Engineering Philosophy</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed text-justify font-sans">
                Currently pursuing a Bachelor of Engineering in Electronics and Communication Engineering at{' '}
                <strong className="text-white">Kings College of Engineering</strong>, graduating in <strong className="text-white">2026</strong>. 
                My academic result is <strong className="text-emerald-400">{PERSONAL_INFO.academicScore}</strong>. 
                My hometown is <span className="text-slate-200">Mannargudi, Tamil Nadu</span>, where I laid my academic foundation 
                at National Government Aided Higher Secondary School and St. Joseph Matric High School.
              </p>

              <p className="text-slate-300 text-sm leading-relaxed text-justify font-sans">
                What drives me is building tangible, high-impact systems. Whether writing object-oriented Java 
                applications, configuring responsive web layouts with Bootstrap, developing machine learning regression models, 
                or designing low-latency embedded systems with microcontrollers and sensor arrays, I focus on clean architecture, 
                meticulous testing, and real-world utility.
              </p>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Degree & Batch</span>
                  <span className="text-slate-200 font-medium">B.E. ECE · Class of 2026</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Academic Result</span>
                  <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.academicScore}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">College</span>
                  <span className="text-slate-200 font-medium">Kings College of Engg</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Target Roles</span>
                  <span className="text-slate-200 font-medium">Software Dev / Embedded</span>
                </div>
              </div>
            </div>

            {/* Core Strengths Grid with Staggered Entrance */}
            <motion.div 
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="p-6 rounded-2xl bg-[#090d13]/90 border border-slate-800/80 shadow-md"
            >
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Core Professional Strengths</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {coreStrengths.map((item) => (
                  <motion.div 
                    key={item.name} 
                    variants={cardEntrance}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{item.name}</div>
                      <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Pillars & Technical Breadth with Staggered Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={cardEntrance}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl bg-[#090e15]/90 border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/40 w-fit mb-4 transition-colors">
                    {pillar.icon}
                  </div>
                  <h4 className="text-base font-bold text-white font-heading mb-2 group-hover:text-emerald-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="text-slate-500">VERIFIED</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
