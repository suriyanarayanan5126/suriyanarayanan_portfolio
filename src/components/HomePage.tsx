import React, { useState } from 'react';
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
import { ResumeModal } from './ResumeModal.tsx';
import { CinematicDivider } from './CinematicDivider.tsx';

export const HomePage: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/15 selection:text-blue-900 relative overflow-x-hidden">
      {/* 60fps Ambient Subtle Particles & Custom Cursor */}
      <AmbientParticles />
      <CustomCursor />

      {/* Navigation Bar with Scroll Progress & Section Spy */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections with Predominantly Pure White Design */}
      <main className="relative z-10">
        {/* Section 00: Hero with Static Meet Me Photo & Spoken Male Voice Introduction */}
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Transition: Hero -> About */}
        <CinematicDivider 
          sectionNumber="01" 
          nextSectionTitle="Identity & Engineering Core" 
        />

        {/* Section 01: About Section */}
        <AboutSection />

        {/* Transition: About -> Skills */}
        <CinematicDivider 
          sectionNumber="02" 
          nextSectionTitle="Technical Arsenal & Skills" 
        />

        {/* Section 02: Skills Section */}
        <SkillsSection />

        {/* Transition: Skills -> Projects */}
        <CinematicDivider 
          sectionNumber="03" 
          nextSectionTitle="Engineering Artifacts & Original Videos" 
        />

        {/* Section 03: Projects Section with Uploaded Original MP4 Videos */}
        <ProjectsSection />

        {/* Transition: Projects -> Training */}
        <CinematicDivider 
          sectionNumber="04" 
          nextSectionTitle="Industry Exposure & Training" 
        />

        {/* Section 04: Internships & Practical Training */}
        <InternshipSection />

        {/* Transition: Training -> Certificates */}
        <CinematicDivider 
          sectionNumber="05" 
          nextSectionTitle="Credentials & Awards" 
        />

        {/* Section 05: Certificates & Awards Showcase with Original PDF Page Previews */}
        <CertificatesSection />

        {/* Transition: Certificates -> Education */}
        <CinematicDivider 
          sectionNumber="06" 
          nextSectionTitle="Academic Rigor & Leadership" 
        />

        {/* Section 06: Education & Major Achievements */}
        <EducationAchievements />

        {/* Transition: Education -> Contact */}
        <CinematicDivider 
          sectionNumber="07" 
          nextSectionTitle="Get In Touch" 
        />

        {/* Section 07: Contact & Transmission */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive ATS Resume & Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};
