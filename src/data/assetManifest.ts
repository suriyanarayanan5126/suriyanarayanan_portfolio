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
    notes: 'Preserved in project assets and browser session storage.'
  },

  // --- PROJECT DEMONSTRATION VIDEOS (EXACT UPLOADED ASSETS) ---
  {
    id: 'video-smart-home',
    category: 'video',
    title: 'Smart Home Automation Video Demonstration',
    filename: 'home automation video(1).mp4',
    primaryPath: '/videos/home%20automation%20video(1).mp4',
    fallbackPaths: [
      '/assets/projects/home%20automation%20video(1).mp4',
      '/videos/home automation video(1).mp4'
    ],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Real demonstration footage of ESP32 smart home automation controlling lights and fan.'
  },
  {
    id: 'video-visitor-counter',
    category: 'video',
    title: 'Bidirectional Visitor Counter Video Demonstration',
    filename: 'visitor counter video(1).mp4',
    primaryPath: '/videos/visitor%20counter%20video(1).mp4',
    fallbackPaths: [
      '/assets/projects/visitor%20counter%20video(1).mp4',
      '/videos/visitor counter video(1).mp4'
    ],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Real demonstration footage of IR dual-beam bidirectional visitor counter with automated light control.'
  },
  {
    id: 'video-scrolling-display',
    category: 'video',
    title: 'Smart Scrolling Display Video Demonstration',
    filename: 'smart scrolling display video(1).mp4',
    primaryPath: '/videos/smart%20scrolling%20display%20video(1).mp4',
    fallbackPaths: [
      '/assets/projects/smart%20scrolling%20display%20video(1).mp4',
      '/videos/smart scrolling display video(1).mp4'
    ],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Real demonstration footage of LED dot matrix moving message board controlled via mobile app.'
  },
  {
    id: 'video-surveillance-car',
    category: 'video',
    title: 'Surveillance Car Video Demonstration',
    filename: 'survilliance car video(1).mp4',
    primaryPath: '/videos/survilliance%20car%20video(1).mp4',
    fallbackPaths: [
      '/assets/projects/survilliance%20car%20video(1).mp4',
      '/videos/survilliance car video(1).mp4'
    ],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Real demonstration footage of wireless motorized surveillance rover with headlight navigation.'
  },
  {
    id: 'video-suriya-ai',
    category: 'video',
    title: 'Suriya AI Video Demonstration',
    filename: 'suriya ai video(1).mp4',
    primaryPath: '/videos/suriya%20ai%20video(1).mp4',
    fallbackPaths: [
      '/assets/projects/suriya%20ai%20video(1).mp4',
      '/videos/suriya ai video(1).mp4'
    ],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Real demonstration footage of Suriya AI Snap & Study assistant powered by Gemini AI and Streamlit.'
  },

  // --- CERTIFICATES (ALL CONFIRMED UPLOADED ASSETS) ---
  {
    id: 'cert-ibm-credly',
    category: 'certificate',
    title: 'Artificial Intelligence Fundamentals',
    filename: '7.pdf',
    primaryPath: '/certificates/7.pdf',
    fallbackPaths: ['/assets/certificates/7.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'IBM SkillsBuild & Credly verified badge (ID: c9850c1b-ea3d-4e6c-a7f0-1ead9249e9b0).'
  },
  {
    id: 'cert-nxtwave-static',
    category: 'certificate',
    title: 'Build Your Own Static Website',
    filename: '8.pdf',
    primaryPath: '/certificates/8.pdf',
    fallbackPaths: ['/assets/certificates/8.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'NxtWave CCBP 4.0 Academy certified (ID: FPSQRCSCGL).'
  },
  {
    id: 'cert-bsnl-training',
    category: 'certificate',
    title: 'Telecommunication & Networking Practical Training (BSNL)',
    filename: '9c.jpeg',
    primaryPath: '/assets/certificates/9c.jpeg',
    fallbackPaths: ['/assets/certificates/bsnl-telecom-internship.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Industrial internship practical training at BSNL Thanjavur (Ref: AGM(HR&A)/TNJ/157/2023).'
  },
  {
    id: 'cert-java-fullstack',
    category: 'certificate',
    title: 'Java Full Stack Development Certification',
    filename: '9.pdf',
    primaryPath: '/assets/certificates/9.pdf',
    fallbackPaths: ['/certificates/9.pdf'],
    status: 'hidden_confidential',
    isPubliclyVisible: false,
    notes: 'Original 9.pdf preserved permanently; hidden from public portfolio gallery per explicit user instruction.'
  },
  {
    id: 'cert-nxtwave-responsive',
    category: 'certificate',
    title: 'Build Your Own Responsive Website',
    filename: '10.pdf',
    primaryPath: '/certificates/10.pdf',
    fallbackPaths: ['/assets/certificates/10.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'NxtWave CCBP 4.0 Academy certified (ID: UFXPKMXZKP).'
  },
  {
    id: 'cert-iot-workshop-kings',
    category: 'certificate',
    title: 'Two Days Workshop on IoT with Arduino / Raspberry Pi',
    filename: '11.pdf',
    primaryPath: '/certificates/11.pdf',
    fallbackPaths: ['/assets/certificates/11.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Centre of Excellence - IoT, Kings College of Engineering & IEEE.'
  },
  {
    id: 'cert-ipr-mic-aicte',
    category: 'certificate',
    title: 'Role of Innovation in Startup Success & IPR / Patents',
    filename: '12 (2).pdf',
    primaryPath: '/certificates/12%20(2).pdf',
    fallbackPaths: ['/assets/certificates/12%20(2).pdf', '/certificates/12.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'MIC AICTE Sponsored Impact Lecture Series & Kings College IIC.'
  },
  {
    id: 'cert-edunet-internship',
    category: 'certificate',
    title: 'Edunet & AICTE AI & Machine Learning 6-Week Internship',
    filename: '13.pdf',
    primaryPath: '/certificates/13.pdf',
    fallbackPaths: ['/assets/certificates/13.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'AICTE & Edunet Foundation (Student STU ID: STU657aa855cd1cb1702537301).'
  },
  {
    id: 'cert-electrovibez-23',
    category: 'certificate',
    title: "Electrovibez '23 National Level Technical Symposium — II Prize",
    filename: '4elec23.pdf',
    primaryPath: '/certificates/4elec23.pdf',
    fallbackPaths: ['/assets/certificates/4elec23.pdf', '/certificates/electrovibez-23.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Kings College of Engineering Dept of ECE & IEEE Second Prize.'
  },
  {
    id: 'cert-mini-project-expo-2023',
    category: 'certificate',
    title: 'Mini Project Expo 2023 — 1st Place',
    filename: '5.pdf',
    primaryPath: '/certificates/5.pdf',
    fallbackPaths: ['/assets/certificates/5.pdf', '/certificates/mini-project-expo-2023.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'First Place Winner in Mini Project Expo by Dept of ECE & S&H.'
  },
  {
    id: 'cert-mini-project-expo-2024',
    category: 'certificate',
    title: 'Mini Project Expo 2024 — II nd Position',
    filename: '6.pdf',
    primaryPath: '/certificates/6.pdf',
    fallbackPaths: ['/assets/certificates/6.pdf', '/certificates/mini-project-expo-2024.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'Secured Second Position under ISTE Students Chapter TN 217.'
  },
  {
    id: 'cert-kings-project-expo-2026',
    category: 'certificate',
    title: "Kings Project Expo '26 — Digital Oorai Display",
    filename: 'kings26.pdf',
    primaryPath: '/certificates/kings26.pdf',
    fallbackPaths: ['/assets/certificates/kings26.pdf', '/certificates/kings-project-expo-2026.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: "Kings College of Engineering (Autonomous) & IEEE Certificate of Appreciation."
  },
  {
    id: 'cert-freq-fest-24',
    category: 'certificate',
    title: 'Freq Fest 24 International Student Symposium — 1st Place',
    filename: '2egs.pdf',
    primaryPath: '/certificates/2egs.pdf',
    fallbackPaths: ['/assets/certificates/2egs.pdf', '/certificates/freq-fest-24.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'First place winner in Economic Electronic Garments Design at E.G.S. Pillay Engg College.'
  },
  {
    id: 'cert-acmet-2k25',
    category: 'certificate',
    title: "Acmet '2k25 13th National Level Technical Fest — I Prize",
    filename: '3mam.pdf',
    primaryPath: '/certificates/3mam.pdf',
    fallbackPaths: ['/assets/certificates/3mam.pdf', '/certificates/acmet-2k25.pdf'],
    status: 'verified_available',
    isPubliclyVisible: true,
    notes: 'First prize in Innovation Expo at M.A.M. School of Engineering.'
  }
];

export const getPublicCertificates = () => {
  return ASSET_MANIFEST.filter(a => a.category === 'certificate' && a.isPubliclyVisible);
};

export const getVerifiedCertificates = () => {
  return ASSET_MANIFEST.filter(a => a.category === 'certificate' && a.status === 'verified_available' && a.isPubliclyVisible);
};
