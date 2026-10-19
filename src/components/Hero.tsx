import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Award, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Cpu, 
  Check, 
  FileText, 
  FolderGit2, 
  Phone,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-white">
      {/* Subtle luxury ambient background glows in soft royal blue and sky tint */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/40 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-indigo-100/40 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-sky-100/50 blur-[120px] pointer-events-none rounded-full" />

      {/* Gentle architectural grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Narrative, Name, Headline, Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Live Academic Standing Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 w-fit shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="font-semibold">Kings College of Engineering · Class of 2026</span>
              <span className="text-slate-300">|</span>
              <span className="font-bold text-blue-800">80.6% Anna Univ</span>
            </div>

            {/* Name Presentation */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Suriyanarayanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">R</span>
              </h1>

              {/* Exact Requested Title */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 font-heading tracking-tight leading-snug">
                Electronics and Communication Engineer <span className="text-blue-500 font-normal">|</span> Embedded Systems <span className="text-blue-500 font-normal">|</span> IoT <span className="text-blue-500 font-normal">|</span> Software Development
              </h2>
            </div>

            {/* Exact Requested Introduction */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              An enthusiastic engineering graduate with hands-on project experience, technical curiosity, and a passion for building practical technology solutions.
            </p>

            {/* Core Technical Highlights Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                "Java Full Stack",
                "ESP32 & Microcontrollers",
                "Sensor Automation",
                "Patent-Applied Inventor",
                "Workshop Resource Person"
              ].map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* 4 Polished Working Action Buttons (Exact Requirement) */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              {/* 1. View My Projects */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 2. View Certificates */}
              <a
                href="#certificates"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-600 font-semibold text-sm border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
              >
                <Award className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>View Certificates</span>
              </a>

              {/* 3. Download Resume */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-600 font-semibold text-sm border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Download Resume</span>
              </button>

              {/* 4. Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Contact & Verified Identity Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-t border-slate-200">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-700" />
                <span>github.com/suriyanarayanan5126</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#0077b5] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>LinkedIn Profile</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Mail className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedEmail ? 'Copied to Clipboard!' : PERSONAL_INFO.email}</span>
              </button>

              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Mannargudi, Tamil Nadu</span>
              </span>
            </div>

          </motion.div>

          {/* Right Column: STATIC Formal Profile Photograph Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Elegant Background Glow and Ring for Portrait */}
            <div className="relative w-full max-w-[340px] sm:max-w-[390px]">
              
              {/* Outer decorative ambient blur ring */}
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-sky-400/15 blur-2xl pointer-events-none" />

              {/* Main Portrait Card Layout */}
              <div className="relative rounded-3xl bg-white p-3.5 sm:p-4 border border-slate-200/90 shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
                
                {/* Header status bar inside portrait card */}
                <div className="flex items-center justify-between px-2.5 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-semibold text-slate-700">Verified Engineering Profile</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    B.E. ECE 2026
                  </span>
                </div>

                {/* STATIC Official Formal Profile Photo */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                  <img
                    src="/profile.jpg"
                    alt="Suriyanarayanan R — Electronics and Communication Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Soft Vignette / Gradient Overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent pointer-events-none" />

                  {/* Name and Designation Overlay at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white pointer-events-none">
                    <div className="font-heading font-bold text-lg sm:text-xl drop-shadow-sm">
                      Suriyanarayanan R
                    </div>
                    <div className="text-xs text-sky-200 font-mono drop-shadow-xs">
                      Anna University Result: 80.6%
                    </div>
                  </div>
                </div>

                {/* Footer Badges under Portrait */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="block text-[10px] text-slate-500 uppercase">Degree</span>
                    <span className="font-bold text-slate-800">B.E. ECE</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="block text-[10px] text-slate-500 uppercase">College</span>
                    <span className="font-bold text-slate-800">Kings College</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
