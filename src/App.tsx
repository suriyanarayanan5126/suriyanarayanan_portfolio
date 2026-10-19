import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { CinematicIntro } from './components/CinematicIntro.tsx';
import { AmbientParticles } from './components/AmbientParticles.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { InternshipSection } from './components/InternshipSection.tsx';
import { CertificatesSection } from './components/CertificatesSection.tsx';
import { EducationAchievements } from './components/EducationAchievements.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { TalkingAvatarModal } from './components/TalkingAvatarModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { CinematicDivider } from './components/CinematicDivider.tsx';
import { useTalkingAvatar } from './hooks/useTalkingAvatar.ts';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Unified SpeechSynthesis Talking Avatar engine
  const talkingAvatar = useTalkingAvatar();

  useEffect(() => {
    // Check if user already saw intro in current session
    try {
      const seen = sessionStorage.getItem('suriyanarayanan_intro_seen');
      if (seen === 'true') {
        setIntroFinished(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroFinished(true);
    try {
      sessionStorage.setItem('suriyanarayanan_intro_seen', 'true');
    } catch {
      // ignore
    }
  };

  const handleNavbarMeetMe = () => {
    // Smoothly focus on hero portrait talking avatar and start playback
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
      // If already speaking, leave it; otherwise start speaking
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
    <div className="min-h-screen bg-[#030508] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden">
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

      {/* Main Content Sections with Cinematic Laser HUD Transitions */}
      <main className="relative z-10">
        {/* Advanced Hero Section with Embedded Talking Avatar */}
        <Hero 
          onOpenAvatarModal={() => setIsAvatarOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          talkingAvatar={talkingAvatar}
        />

        {/* Transition: Hero -> About */}
        <CinematicDivider 
          sectionNumber="01" 
          nextSectionTitle="Identity & Engineering Core" 
          gradientFrom="from-[#030508]"
          gradientTo="to-[#04070b]"
        />

        {/* About Section */}
        <AboutSection />

        {/* Transition: About -> Skills */}
        <CinematicDivider 
          sectionNumber="02" 
          nextSectionTitle="Technical Arsenal & Skills" 
          gradientFrom="from-[#04070b]"
          gradientTo="to-[#040609]"
        />

        {/* Technical Skills Section */}
        <SkillsSection />

        {/* Transition: Skills -> Projects */}
        <CinematicDivider 
          sectionNumber="03" 
          nextSectionTitle="Engineering Portfolio & Hardware" 
          gradientFrom="from-[#040609]"
          gradientTo="to-[#04070c]"
        />

        {/* Projects Section with Live Simulators & Video Slots */}
        <ProjectsSection />

        {/* Transition: Projects -> Training */}
        <CinematicDivider 
          sectionNumber="04" 
          nextSectionTitle="Industry Exposure & Training" 
          gradientFrom="from-[#04070c]"
          gradientTo="to-[#040609]"
        />

        {/* Internships & Industrial Training Section */}
        <InternshipSection />

        {/* Transition: Training -> Certificates */}
        <CinematicDivider 
          sectionNumber="05" 
          nextSectionTitle="Credentials & Honors" 
          gradientFrom="from-[#040609]"
          gradientTo="to-[#04070b]"
        />

        {/* Certificates & Awards Section */}
        <CertificatesSection />

        {/* Transition: Certificates -> Education */}
        <CinematicDivider 
          sectionNumber="06" 
          nextSectionTitle="Academic Rigor & Leadership" 
          gradientFrom="from-[#04070b]"
          gradientTo="to-[#040609]"
        />

        {/* Education & Major Achievements Section */}
        <EducationAchievements />

        {/* Transition: Education -> Contact */}
        <CinematicDivider 
          sectionNumber="07" 
          nextSectionTitle="Initiate Transmission" 
          gradientFrom="from-[#040609]"
          gradientTo="to-[#040609]"
        />

        {/* Contact Section */}
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

      {/* Interactive ATS Resume & PDF Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
