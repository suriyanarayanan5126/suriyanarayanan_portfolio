import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { CinematicIntro } from './CinematicIntro.tsx';
import { AmbientParticles } from './AmbientParticles.tsx';
import { CustomCursor } from './CustomCursor.tsx';
import { Navbar } from './Navbar.tsx';
import { Hero } from './Hero.tsx';
import { AboutSection } from './AboutSection.tsx';
import { SkillsSection } from './SkillsSection.tsx';
import { ProjectsSection } from './ProjectsSection.tsx';
import { InternshipSection } from './InternshipSection.tsx';
import { CertificatesSection } from './CertificatesSection.tsx';
import { EducationAchievements } from './EducationAchievements.tsx';
import { ContactSection } from './ContactSection.tsx';
import { Footer } from './Footer.tsx';
import { TalkingAvatarModal } from './TalkingAvatarModal.tsx';
import { ResumeModal } from './ResumeModal.tsx';
import { CinematicDivider } from './CinematicDivider.tsx';
import { useTalkingAvatar } from '../hooks/useTalkingAvatar.ts';

export const HomePage: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Unified SpeechSynthesis Talking Avatar engine
  const talkingAvatar = useTalkingAvatar();

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('suriyanarayanan_intro_seen');
      if (seen === 'true') {
        setIntroFinished(true);
      }
    } catch {
      // Storage access catch
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroFinished(true);
    try {
      sessionStorage.setItem('suriyanarayanan_intro_seen', 'true');
    } catch {
      // Storage access catch
    }
  };

  const handleNavbarMeetMe = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
      if (!talkingAvatar.isSpeaking) {
        setTimeout(() => {
          talkingAvatar.start();
        }, 300);
      }
    } else {
      setIsAvatarOpen(true);
      talkingAvatar.start();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      {/* Cinematic Opening Intro */}
      <AnimatePresence>
        {!introFinished && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* 60fps Ambient Particles & Custom Cursor */}
      <AmbientParticles />
      <CustomCursor />

      {/* Navigation Bar with Scroll Progress & Section Spy */}
      <Navbar 
        onOpenAvatar={handleNavbarMeetMe}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections with Alternating Cinematic Dark & Luxurious Ivory Sections */}
      <main className="relative z-10">
        {/* Section 00: Advanced Cinematic Hero with Embedded Talking Avatar */}
        <Hero 
          onOpenAvatarModal={() => setIsAvatarOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          talkingAvatar={talkingAvatar}
        />

        {/* Transition: Hero -> About (Dark to Warm Ivory) */}
        <CinematicDivider 
          sectionNumber="01" 
          nextSectionTitle="Identity & Engineering Core" 
          gradientFrom="from-[#030712]"
          gradientTo="to-[#fafafc]"
        />

        {/* Section 01: About Section (Warm Ivory / Bright Editorial Section) */}
        <AboutSection />

        {/* Transition: About -> Skills (Ivory to Dark Cinematic) */}
        <CinematicDivider 
          sectionNumber="02" 
          nextSectionTitle="Technical Arsenal & Skills" 
          gradientFrom="from-[#fafafc]"
          gradientTo="to-[#030712]"
        />

        {/* Section 02: Technical Skills & Arsenal (Cinematic Dark Section) */}
        <SkillsSection />

        {/* Transition: Skills -> Projects (Dark to Deep Obsidian) */}
        <CinematicDivider 
          sectionNumber="03" 
          nextSectionTitle="Engineering Portfolio & Hardware" 
          gradientFrom="from-[#030712]"
          gradientTo="to-[#02050c]"
        />

        {/* Section 03: Projects Section with Simulators & Video Demonstrations */}
        <ProjectsSection />

        {/* Transition: Projects -> Training (Deep Obsidian to Dark Indigo) */}
        <CinematicDivider 
          sectionNumber="04" 
          nextSectionTitle="Industry Exposure & Training" 
          gradientFrom="from-[#02050c]"
          gradientTo="to-[#020612]"
        />

        {/* Section 04: Internships & Practical Training */}
        <InternshipSection />

        {/* Transition: Training -> Certificates (Dark to Luxurious Ivory) */}
        <CinematicDivider 
          sectionNumber="05" 
          nextSectionTitle="Credentials & Honors" 
          gradientFrom="from-[#020612]"
          gradientTo="to-[#fafaf8]"
        />

        {/* Section 05: Certificates & Awards Showcase (Warm Ivory / Bright Editorial Gallery) */}
        <CertificatesSection />

        {/* Transition: Certificates -> Education (Ivory to Deep Midnight Navy) */}
        <CinematicDivider 
          sectionNumber="06" 
          nextSectionTitle="Academic Rigor & Leadership" 
          gradientFrom="from-[#fafaf8]"
          gradientTo="to-[#030712]"
        />

        {/* Section 06: Education & Major Achievements (Deep Midnight Navy) */}
        <EducationAchievements />

        {/* Transition: Education -> Contact */}
        <CinematicDivider 
          sectionNumber="07" 
          nextSectionTitle="Initiate Transmission" 
          gradientFrom="from-[#030712]"
          gradientTo="to-[#02050c]"
        />

        {/* Section 07: Contact Transmission */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Talking Avatar Experience Modal */}
      <TalkingAvatarModal
        isOpen={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        talkingAvatar={talkingAvatar}
      />

      {/* Interactive ATS Resume & Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};
