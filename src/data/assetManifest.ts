/**
 * PERMANENT ASSET MANIFEST
 * Suriyanarayanan R — Portfolio
 * 
 * Records the complete inventory of all project assets, stable file paths,
 * verification statuses, and intended uses.
 */

export interface ManifestAsset {
  id: string;
  category: 'certificate' | 'video' | 'profile' | 'document';
  title: string;
  filename: string;
  primaryPath: string;
  fallbackPaths: string[];
  status: 'verified_available' | 'uploaded_session' | 'pending_upload' | 'hidden_confidential';
  isPubliclyVisible: boolean;
  notes: string;
}

export const ASSET_MANIFEST: ManifestAsset[] = [
  // --- PROFILE PHOTOGRAPH ---
  {
    id: 'asset-profile-photo',
    category: 'profile',
    title: 'Suriyanarayanan R — Official Portrait',
    filename: 'profile.jpg',
    primaryPath: '/assets/profile/profile.jpg',
    fallbackPaths: ['/assets/profile/avatar.png', '/profile.jpg'],
    status: 'uploaded_session',
    isPubliclyVisible: true,
    notes: 'Preserved in browser session storage and synced with profile display.'
  },

  // --- PROJECT DEMONSTRATION VIDEOS ---
  {
    id: 'video-smart-home',
    category: 'video',
    title: 'IoT Smart Home Automation Video Demonstration',
    filename: 'iot-smart-home.mp4',
    primaryPath: '/assets/projects/iot-smart-home.mp4',
    fallbackPaths: ['/videos/iot-smart-home.mp4'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Full working video demonstration for ESP32 relay switching and appliance control.'
  },
  {
    id: 'video-visitor-counter',
    category: 'video',
    title: 'Bidirectional Visitor Counter Video Demonstration',
    filename: 'visitor-counter.mp4',
    primaryPath: '/assets/projects/visitor-counter.mp4',
    fallbackPaths: ['/videos/visitor-counter.mp4'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'IR dual-beam sensor automated entry/exit counter with light control.'
  },
  {
    id: 'video-scrolling-display',
    category: 'video',
    title: 'Smart Scrolling Display Video Demonstration',
    filename: 'scrolling-display.mp4',
    primaryPath: '/assets/projects/scrolling-display.mp4',
    fallbackPaths: ['/videos/scrolling-display.mp4'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Microcontroller LED dot matrix moving message display.'
  },
  {
    id: 'video-surveillance-car',
    category: 'video',
    title: 'Surveillance Car Robotics Video Demonstration',
    filename: 'surveillance-car.mp4',
    primaryPath: '/assets/projects/surveillance-car.mp4',
    fallbackPaths: ['/videos/surveillance-car.mp4'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Remote robotics surveillance vehicle video footage.'
  },
  {
    id: 'video-salary-prediction',
    category: 'video',
    title: 'Suriya AI — Salary Prediction ML Video Demonstration',
    filename: 'salary-prediction.mp4',
    primaryPath: '/assets/projects/salary-prediction.mp4',
    fallbackPaths: ['/videos/salary-prediction.mp4'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Machine learning workflow demonstration using Linear Regression.'
  },

  // --- CERTIFICATES 4 THROUGH 13 (CONFIRMED UPLOADED IN BATCH) ---
  {
    id: 'cert-electrovibez-23',
    category: 'certificate',
    title: "Electrovibez '23 National Level Technical Symposium — II Prize",
    filename: 'electrovibez-23.pdf',
    primaryPath: '/assets/certificates/electrovibez-23.pdf',
    fallbackPaths: ['/certificates/electrovibez-23.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Kings College of Engineering Dept of ECE & IEEE Second Prize.'
  },
  {
    id: 'cert-mini-project-expo-2023',
    category: 'certificate',
    title: 'Mini Project Expo 2023 — 1st Place',
    filename: 'mini-project-expo-2023.pdf',
    primaryPath: '/assets/certificates/mini-project-expo-2023.pdf',
    fallbackPaths: ['/certificates/mini-project-expo-2023.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'First Place Winner in Mini Project Expo by Dept of ECE & S&H.'
  },
  {
    id: 'cert-mini-project-expo-2024',
    category: 'certificate',
    title: 'Mini Project Expo 2024 — II nd Position',
    filename: 'mini-project-expo-2024.pdf',
    primaryPath: '/assets/certificates/mini-project-expo-2024.pdf',
    fallbackPaths: ['/certificates/mini-project-expo-2024.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Secured Second Position under ISTE Students Chapter TN 217.'
  },
  {
    id: 'cert-ibm-credly',
    category: 'certificate',
    title: 'Artificial Intelligence Fundamentals',
    filename: 'ibm-skillsbuild-ai-fundamentals.pdf',
    primaryPath: '/assets/certificates/ibm-skillsbuild-ai-fundamentals.pdf',
    fallbackPaths: ['/certificates/ibm-skillsbuild-ai-fundamentals.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'IBM SkillsBuild & Credly verified badge (ID: c9850c1b-ea3d-4e6c-a7f0-1ead9249e9b0).'
  },
  {
    id: 'cert-nxtwave-static',
    category: 'certificate',
    title: 'Build Your Own Static Website',
    filename: 'nxtwave-build-static-website.pdf',
    primaryPath: '/assets/certificates/nxtwave-build-static-website.pdf',
    fallbackPaths: ['/certificates/nxtwave-build-static-website.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'NxtWave CCBP 4.0 Academy certified (ID: FPSQRCSCGL).'
  },
  {
    id: 'cert-java-fullstack',
    category: 'certificate',
    title: 'Java Full Stack Development Certification',
    filename: 'java-full-stack-certification.pdf',
    primaryPath: '/assets/certificates/java-full-stack-certification.pdf',
    fallbackPaths: ['/certificates/java-full-stack-certification.pdf'],
    status: 'hidden_confidential',
    isPubliclyVisible: false,
    notes: 'Original file preserved permanently; hidden from public portfolio gallery per explicit user instruction.'
  },
  {
    id: 'cert-nxtwave-responsive',
    category: 'certificate',
    title: 'Build Your Own Responsive Website',
    filename: 'nxtwave-build-responsive-website.pdf',
    primaryPath: '/assets/certificates/nxtwave-build-responsive-website.pdf',
    fallbackPaths: ['/certificates/nxtwave-build-responsive-website.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'NxtWave CCBP 4.0 Academy certified (ID: UFXPKMXZKP).'
  },
  {
    id: 'cert-iot-workshop-kings',
    category: 'certificate',
    title: 'Two Days Workshop on IoT with Arduino / Raspberry Pi',
    filename: 'iot-workshop-arduino-raspberry-pi.pdf',
    primaryPath: '/assets/certificates/iot-workshop-arduino-raspberry-pi.pdf',
    fallbackPaths: ['/certificates/iot-workshop-arduino-raspberry-pi.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Centre of Excellence - IoT, Kings College & IEEE.'
  },
  {
    id: 'cert-ipr-mic-aicte',
    category: 'certificate',
    title: 'Role of Innovation in Startup Success & IPR / Patents',
    filename: 'ipr-patents-innovation-lecture.pdf',
    primaryPath: '/assets/certificates/ipr-patents-innovation-lecture.pdf',
    fallbackPaths: ['/certificates/ipr-patents-innovation-lecture.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'MIC AICTE Sponsored Impact Lecture Series & Kings College IIC.'
  },
  {
    id: 'cert-edunet-internship',
    category: 'certificate',
    title: 'Edunet & AICTE AI & Machine Learning 6-Week Internship',
    filename: 'edunet-aicte-ai-ml-internship.pdf',
    primaryPath: '/assets/certificates/edunet-aicte-ai-ml-internship.pdf',
    fallbackPaths: ['/certificates/edunet-aicte-ai-ml-internship.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'AICTE & Edunet Foundation (Student ID: STU657aa855cd1cb1702537301).'
  },

  // --- CERTIFICATES PENDING DIRECT UPLOAD ---
  {
    id: 'cert-kings-project-expo-2026',
    category: 'certificate',
    title: "Kings Project Expo '26 — Digital Oorai Display",
    filename: 'kings-project-expo-2026.pdf',
    primaryPath: '/assets/certificates/kings-project-expo-2026.pdf',
    fallbackPaths: ['/certificates/kings-project-expo-2026.pdf'],
    status: 'pending_upload',
    isPubliclyVisible: true,
    notes: 'Pending initial upload; will automatically activate as soon as file is placed.'
  },
  {
    id: 'cert-freq-fest-24',
    category: 'certificate',
    title: 'Freq Fest 24 International Student Symposium — 1st Place',
    filename: 'freq-fest-24.pdf',
    primaryPath: '/assets/certificates/freq-fest-24.pdf',
    fallbackPaths: ['/certificates/freq-fest-24.pdf'],
    status: 'pending_upload',
    isPubliclyVisible: true,
    notes: 'Pending initial upload; 1st prize certificate from E.G.S. Pillay Engg College.'
  },
  {
    id: 'cert-acmet-2k25',
    category: 'certificate',
    title: "Acmet '2k25 13th National Level Technical Fest — I Prize",
    filename: 'acmet-2k25.pdf',
    primaryPath: '/assets/certificates/acmet-2k25.pdf',
    fallbackPaths: ['/certificates/acmet-2k25.pdf'],
    status: 'pending_upload',
    isPubliclyVisible: true,
    notes: 'Pending initial upload; First prize certificate from M.A.M. School of Engg.'
  },
  {
    id: 'cert-bsnl-training',
    category: 'certificate',
    title: 'BSNL Internship Training Certificate',
    filename: 'bsnl-telecom-internship.pdf',
    primaryPath: '/assets/certificates/bsnl-telecom-internship.pdf',
    fallbackPaths: ['/certificates/bsnl-telecom-internship.pdf'],
    status: 'pending_upload',
    isPubliclyVisible: true,
    notes: 'Pending initial upload; Industrial training at BSNL Thanjavur.'
  }
];

export const getPublicCertificates = () => {
  return ASSET_MANIFEST.filter(a => a.category === 'certificate' && a.isPubliclyVisible);
};

export const getVerifiedCertificates = () => {
  return ASSET_MANIFEST.filter(a => a.category === 'certificate' && a.status === 'verified_available' && a.isPubliclyVisible);
};

export const getPendingCertificates = () => {
  return ASSET_MANIFEST.filter(a => a.category === 'certificate' && a.status === 'pending_upload');
};
