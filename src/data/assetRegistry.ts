/**
 * CENTRAL ASSET REGISTRY
 * Suriyanarayanan R — Portfolio
 * 
 * Provides a single, clean configuration source for:
 * 1. Individual certificate images (PNG, JPG, JPEG)
 * 2. Individual project demonstration videos (MP4, WebM, MOV)
 * 
 * New certificate images and project videos can be registered easily in the central lists below.
 */

export interface CertificateAssetEntry {
  id: string;
  filename: string;
  path: string;
  title: string;
  issuer: string;
  category: 'award' | 'certification' | 'workshop' | 'internship';
  date: string;
  achievementLevel?: string;
  verificationId?: string;
  details: string;
  pageNumber?: number;
  aliases: string[];
  isExcluded?: boolean;
}

export interface ProjectVideoAssetEntry {
  projectId: string;
  projectTitle: string;
  filename: string;
  path: string;
  supportedFormats: ('mp4' | 'webm' | 'mov')[];
  posterUrl?: string; // ONLY real thumbnail if available; never fake or placeholder
  aliases: string[];
  isPatentConfidential?: boolean;
}

/**
 * CENTRAL CERTIFICATE ASSET REGISTRY
 * Maps the 15 authentic credentials to their expected filenames, paths, and metadata.
 * Additional certificates can be appended here or registered dynamically via UI.
 */
export const CERTIFICATE_REGISTRY: CertificateAssetEntry[] = [
  {
    id: "cert-kings-project-expo-2026",
    filename: "kings-project-expo-2026.pdf",
    path: "/certificates/kings-project-expo-2026.pdf",
    title: "Kings Project Expo '26 — Digital Oorai Display",
    issuer: "Kings College of Engineering (Autonomous) & IEEE",
    category: "award",
    date: "16.04.2026",
    achievementLevel: "First / Second Prize Winner · ECE Track",
    details: "Certificate of Appreciation for project 'Design and Implementation of a Digital Oorai Real Time Display using Embedded System' organized by Centre for Promotion of Research, Kings College of Engineering.",
    pageNumber: 1,
    aliases: ["kings-project-expo-2026.pdf", "cert_page_01.pdf", "kings_expo.pdf", "oorai_display.pdf"]
  },
  {
    id: "cert-freq-fest-24",
    filename: "freq-fest-24.pdf",
    path: "/certificates/freq-fest-24.pdf",
    title: "Freq Fest 24 International Student Symposium — 1st Place",
    issuer: "E.G.S. Pillay Engineering College, Nagapattinam",
    category: "award",
    date: "05.10.2024",
    achievementLevel: "FIRST Place Winner",
    details: "Awarded FIRST place in the 'Economic Electronic Garments Design' competition as part of the International Level Technical Symposium Freq Fest 24, organized by SPARKS Student Association, Dept of ECE.",
    pageNumber: 2,
    aliases: ["freq-fest-24.pdf", "cert_page_02.pdf", "freq_fest.pdf", "freqfest.pdf"]
  },
  {
    id: "cert-acmet-2k25",
    filename: "acmet-2k25.pdf",
    path: "/certificates/acmet-2k25.pdf",
    title: "Acmet '2k25 13th National Level Technical Fest — I Prize",
    issuer: "M.A.M. School of Engineering, Siruganur, Trichy",
    category: "award",
    date: "30.04.2025",
    achievementLevel: "1st Prize Winner · Innovation Expo",
    details: "Secured First Prize in Innovation Expo at the 13th National Level Technical Fest Acmet '2k25 for presenting innovative hardware solutions.",
    pageNumber: 3,
    aliases: ["acmet-2k25.pdf", "cert_page_03.pdf", "acmet.pdf", "acmet_2k25.pdf"]
  },
  {
    id: "cert-electrovibez-23",
    filename: "electrovibez-23.pdf",
    path: "/certificates/electrovibez-23.pdf",
    title: "Electrovibez '23 National Level Technical Symposium — II Prize",
    issuer: "Kings College of Engineering, Dept of ECE & IEEE",
    category: "award",
    date: "10.10.2023",
    achievementLevel: "Second Prize Winner",
    details: "Demonstrated project titled 'Bi-Directional visitor counter with light control' in the National Level Technical Symposium and won Second Prize.",
    pageNumber: 4,
    aliases: ["electrovibez-23.pdf", "cert_page_04.pdf", "electrovibez.pdf", "visitor_counter_award.pdf"]
  },
  {
    id: "cert-mini-project-expo-2023",
    filename: "mini-project-expo-2023.pdf",
    path: "/certificates/mini-project-expo-2023.pdf",
    title: "Mini Project Expo 2023 — 1st Place",
    issuer: "Kings College of Engineering, Dept of ECE & S&H",
    category: "award",
    date: "25.05.2023",
    achievementLevel: "1st Place Winner",
    details: "Won 1st Place in the Mini Project Expo organized by Department of Electronics and Communication Engineering.",
    pageNumber: 5,
    aliases: ["mini-project-expo-2023.pdf", "cert_page_05.pdf", "mini_project_2023.pdf"]
  },
  {
    id: "cert-mini-project-expo-2024",
    filename: "mini-project-expo-2024.pdf",
    path: "/certificates/mini-project-expo-2024.pdf",
    title: "Mini Project Expo 2024 — II nd Position",
    issuer: "Kings College of Engineering & ISTE Students Chapter",
    category: "award",
    date: "03.04.2024",
    achievementLevel: "2nd Position Winner",
    details: "Secured Second Position in the Mini Project Expo organized under ISTE Students Chapter TN 217.",
    pageNumber: 6,
    aliases: ["mini-project-expo-2024.pdf", "cert_page_06.pdf", "mini_project_2024.pdf"]
  },
  {
    id: "cert-ibm-credly",
    filename: "ibm-skillsbuild-ai-fundamentals.pdf",
    path: "/certificates/ibm-skillsbuild-ai-fundamentals.pdf",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild & Credly",
    category: "certification",
    date: "01.07.2025",
    verificationId: "c9850c1b-ea3d-4e6c-a7f0-1ead9249e9b0",
    details: "Officially recognized for commitment to professional excellence and satisfying all requirements for Artificial Intelligence Fundamentals. Verified badge on Credly.",
    pageNumber: 7,
    aliases: ["ibm-skillsbuild-ai-fundamentals.pdf", "cert_page_07.pdf", "ibm_credly.pdf", "ibm_ai.pdf"]
  },
  {
    id: "cert-java-fullstack",
    filename: "java-full-stack-certification.pdf",
    path: "/certificates/java-full-stack-certification.pdf",
    title: "Java Full Stack Development Certification",
    issuer: "Unique Innovibe",
    category: "certification",
    date: "2024 – 2025",
    details: "Comprehensive certification covering Core Java, Object-Oriented Programming, Java Full Stack architecture, database connectivity, and backend service integration.",
    pageNumber: 9,
    aliases: ["java-full-stack-certification.pdf", "cert_page_09.pdf", "java_fullstack.pdf", "unique_innovibe.pdf"],
    isExcluded: true
  },
  {
    id: "cert-nxtwave-static",
    filename: "nxtwave-build-static-website.pdf",
    path: "/certificates/nxtwave-build-static-website.pdf",
    title: "Build Your Own Static Website",
    issuer: "NxtWave CCBP 4.0 Academy (NASSCOM)",
    category: "certification",
    date: "11.02.2025",
    verificationId: "FPSQRCSCGL",
    details: "Successfully completed hands-on coursework covering HTML5, CSS3, Bootstrap grid systems, and layout design designed by top alumni from Google, Amazon, and Microsoft.",
    pageNumber: 8,
    aliases: ["nxtwave-build-static-website.pdf", "cert_page_08.pdf", "nxtwave_static.pdf"]
  },
  {
    id: "cert-nxtwave-responsive",
    filename: "nxtwave-build-responsive-website.pdf",
    path: "/certificates/nxtwave-build-responsive-website.pdf",
    title: "Build Your Own Responsive Website",
    issuer: "NxtWave CCBP 4.0 Academy (NASSCOM)",
    category: "certification",
    date: "25.02.2025",
    verificationId: "UFXPKMXZKP",
    details: "Successfully completed advanced coursework covering responsive web design paradigms, Bootstrap frameworks, and modern CSS Flexbox architectures.",
    pageNumber: 10,
    aliases: ["nxtwave-build-responsive-website.pdf", "cert_page_10.pdf", "nxtwave_responsive.pdf"]
  },
  {
    id: "cert-iot-workshop-kings",
    filename: "iot-workshop-arduino-raspberry-pi.pdf",
    path: "/certificates/iot-workshop-arduino-raspberry-pi.pdf",
    title: "Two Days Workshop on IoT with Arduino / Raspberry Pi",
    issuer: "Centre of Excellence - IoT, Kings College of Engineering & IEEE",
    category: "workshop",
    date: "26.10.2023 – 27.10.2023",
    details: "Hands-on two-day practical workshop on embedded prototyping, sensor integration, Arduino programming, and Raspberry Pi system interfacing.",
    pageNumber: 11,
    aliases: ["iot-workshop-arduino-raspberry-pi.pdf", "cert_page_11.pdf", "iot_workshop.pdf"]
  },
  {
    id: "cert-ipr-mic-aicte",
    filename: "ipr-patents-innovation-lecture.pdf",
    path: "/certificates/ipr-patents-innovation-lecture.pdf",
    title: "Role of Innovation in Startup Success & IPR / Patents",
    issuer: "MIC AICTE Sponsored Impact Lecture Series & Kings College IIC",
    category: "workshop",
    date: "17.05.2024",
    details: "Attended MIC AICTE sponsored impact lecture series on 'Role of Innovation in Startup Success and Enforcement of Intellectual Property Rights - Patents and Design'.",
    pageNumber: 12,
    aliases: ["ipr-patents-innovation-lecture.pdf", "cert_page_12.pdf", "ipr_aicte.pdf"]
  },
  {
    id: "cert-bsnl-training",
    filename: "bsnl-telecom-internship.pdf",
    path: "/certificates/bsnl-telecom-internship.pdf",
    title: "BSNL Internship Training Certificate",
    issuer: "Bharat Sanchar Nigam Limited (BSNL), Govt of India Enterprise",
    category: "internship",
    date: "15.03.2024",
    verificationId: "AGM(HR&A)/TNJ/157/2023",
    details: "Undergone practical telecom training covering digital communication, optical fibre infrastructure, and broadband technology at BSNL Thanjavur.",
    pageNumber: 13,
    aliases: ["bsnl-telecom-internship.pdf", "cert_page_13.pdf", "bsnl_internship.pdf"]
  },
  {
    id: "cert-edunet-internship",
    filename: "edunet-aicte-ai-ml-internship.pdf",
    path: "/certificates/edunet-aicte-ai-ml-internship.pdf",
    title: "Edunet & AICTE AI & Machine Learning 6-Week Internship",
    issuer: "Edunet Foundation in collaboration with AICTE & IBM SkillsBuild",
    category: "internship",
    date: "30.07.2025",
    verificationId: "STU657aa855cd1cb1702537301",
    details: "Successfully completed 6-week intensive training in Artificial Intelligence & Machine Learning technologies.",
    pageNumber: 14,
    aliases: ["edunet-aicte-ai-ml-internship.pdf", "cert_page_14.pdf", "edunet_internship.pdf"]
  },
  {
    id: "cert-fantasy-solution",
    filename: "fantasy-solution-ai-training.pdf",
    path: "/certificates/fantasy-solution-ai-training.pdf",
    title: "Fantasy Solution Certificate of Accomplishment",
    issuer: "Fantasy Solution Software Development and Training, Trichy",
    category: "internship",
    date: "01.08.2025",
    details: "Inplant training and internship course on Artificial Intelligence, practical algorithmic problem solving, and software engineering.",
    pageNumber: 15,
    aliases: ["fantasy-solution-ai-training.pdf", "cert_page_15.pdf", "fantasy_solution.pdf"],
    isExcluded: true
  }
];

/**
 * CENTRAL PROJECT VIDEO ASSET REGISTRY
 * Maps project demonstration videos to their expected filenames, formats, and project associations.
 * Note: The Patent-applied project is strictly confidential and has NO video slot or technical disclosure.
 */
export const PROJECT_VIDEO_REGISTRY: ProjectVideoAssetEntry[] = [
  {
    projectId: "smart-home-automation",
    projectTitle: "Smart Home Automation",
    filename: "home automation video(1).mp4",
    path: "/videos/home automation video(1).mp4",
    supportedFormats: ["mp4", "webm", "mov"],
    posterUrl: "/assets/projects/iot-smart-home-thumb.jpg",
    aliases: [
      "home automation video(1).mp4",
      "home_automation_video_1.mp4",
      "home automation video.mp4",
      "iot-smart-home.mp4",
      "iot-smart-home.webm",
      "iot-smart-home.mov",
      "smart-home.mp4",
      "smart-home.webm",
      "smart-home.mov",
      "smart-home-automation.mp4",
      "smart_home.mp4",
      "home_automation.mp4"
    ]
  },
  {
    projectId: "visitor-counter",
    projectTitle: "Bidirectional Visitor Counter",
    filename: "visitor counter video(1).mp4",
    path: "/videos/visitor counter video(1).mp4",
    supportedFormats: ["mp4", "webm", "mov"],
    posterUrl: "/assets/projects/visitor-counter-thumb.jpg",
    aliases: [
      "visitor counter video(1).mp4",
      "visitor_counter_video_1.mp4",
      "visitor counter video.mp4",
      "visitor-counter.mp4",
      "visitor-counter.webm",
      "visitor-counter.mov",
      "visitor_counter.mp4",
      "bidirectional-visitor-counter.mp4",
      "visitor.mp4",
      "ir-counter.mp4"
    ]
  },
  {
    projectId: "smart-scrolling-display",
    projectTitle: "Smart Scrolling Display",
    filename: "smart scrolling display video(1).mp4",
    path: "/videos/smart scrolling display video(1).mp4",
    supportedFormats: ["mp4", "webm", "mov"],
    posterUrl: "/assets/projects/scrolling-display-thumb.jpg",
    aliases: [
      "smart scrolling display video(1).mp4",
      "smart_scrolling_display_video_1.mp4",
      "smart scrolling display video.mp4",
      "scrolling-display.mp4",
      "scrolling-display.webm",
      "scrolling-display.mov",
      "scrolling_display.mp4",
      "smart-scrolling-display.mp4",
      "dot-matrix.mp4",
      "display.mp4"
    ]
  },
  {
    projectId: "suriya-ai",
    projectTitle: "Suriya AI",
    filename: "suriya ai video(1).mp4",
    path: "/videos/suriya ai video(1).mp4",
    supportedFormats: ["mp4", "webm", "mov"],
    posterUrl: "/assets/projects/suriya-ai-thumb.jpg",
    aliases: [
      "suriya ai video(1).mp4",
      "suriya_ai_video_1.mp4",
      "suriya ai video.mp4",
      "salary-prediction.mp4",
      "salary-prediction.webm",
      "salary-prediction.mov",
      "salary_prediction.mp4",
      "salary-predictor.mp4",
      "suriya-ai.mp4",
      "salary.mp4"
    ]
  },
  {
    projectId: "surveillance-car",
    projectTitle: "Surveillance Car",
    filename: "survilliance car video(1).mp4",
    path: "/videos/survilliance car video(1).mp4",
    supportedFormats: ["mp4", "webm", "mov"],
    posterUrl: "/assets/projects/surveillance-car-thumb.jpg",
    aliases: [
      "survilliance car video(1).mp4",
      "survilliance_car_video_1.mp4",
      "surveillance car video(1).mp4",
      "surveillance-car.mp4",
      "surveillance-car.webm",
      "surveillance-car.mov",
      "surveillance_car.mp4",
      "robot-car.mp4",
      "surveillance.mp4",
      "car.mp4"
    ]
  },
  {
    projectId: "patent-oorai-display",
    projectTitle: "Design and Implementation of a Digital Oorai Display using Embedded System",
    filename: "",
    path: "",
    supportedFormats: [],
    aliases: [],
    isPatentConfidential: true // CONFIDENTIAL: Never attach or play video
  }
];

/**
 * Normalizes filenames for fuzzy comparison (removes extension, dashes, underscores, spaces, lowercase)
 */
export function normalizeAssetName(filename: string): string {
  return filename.toLowerCase().replace(/\.[^/.]+$/, "").replace(/[-_\s]+/g, "");
}

/**
 * Finds matching certificate entry by filename or returns null
 */
export function matchCertificateByFilename(filename: string): CertificateAssetEntry | null {
  const clean = filename.toLowerCase().trim();
  const norm = normalizeAssetName(clean);

  // Exact filename or alias match
  for (const entry of CERTIFICATE_REGISTRY) {
    if (entry.filename.toLowerCase() === clean) return entry;
    if (entry.aliases.some(a => a.toLowerCase() === clean)) return entry;
  }

  // Normalized name match
  for (const entry of CERTIFICATE_REGISTRY) {
    if (normalizeAssetName(entry.filename) === norm) return entry;
    if (entry.aliases.some(a => normalizeAssetName(a) === norm)) return entry;
  }

  // Number pattern match (e.g., "1.png", "page-1.jpg", "cert_01.jpeg")
  const numMatch = clean.match(/(?:page|cert|certificate)?[_-]?0*([1-9]|1[0-5])\b/i);
  if (numMatch && numMatch[1]) {
    const pageNum = parseInt(numMatch[1], 10);
    const found = CERTIFICATE_REGISTRY.find(e => e.pageNumber === pageNum);
    if (found) return found;
  }

  return null;
}

/**
 * Finds matching project video entry by filename or returns null
 */
export function matchProjectVideoByFilename(filename: string): ProjectVideoAssetEntry | null {
  const clean = filename.toLowerCase().trim();
  const norm = normalizeAssetName(clean);

  for (const entry of PROJECT_VIDEO_REGISTRY) {
    if (entry.isPatentConfidential) continue;
    if (entry.filename.toLowerCase() === clean) return entry;
    if (entry.aliases.some(a => a.toLowerCase() === clean)) return entry;
    if (normalizeAssetName(entry.filename) === norm) return entry;
    if (entry.aliases.some(a => normalizeAssetName(a) === norm)) return entry;
  }

  return null;
}
