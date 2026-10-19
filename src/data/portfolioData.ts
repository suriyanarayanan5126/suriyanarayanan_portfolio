export interface Project {
  id: string;
  title: string;
  category: 'embedded' | 'ai' | 'robotics' | 'patent';
  type: string;
  isPatentConfidential?: boolean;
  patentNumber?: string;
  shortSummary?: string;
  description?: string;
  tags?: string[];
  features?: string[];
  interactiveType?: 'smart-home' | 'visitor-counter' | 'salary-predictor' | 'scrolling-display' | 'surveillance-car';
  hasVideoSlot?: boolean;
  videoPath?: string;
  videoFileName?: string;
}

export interface Internship {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  roleType: string;
  description: string;
  keyLearnings: string[];
  verifiedCredential?: string;
}

export interface CertificateItem {
  id: string;                         // Unique identifier, e.g. "cert-kings-project-expo-2026"
  title: string;                      // Display title of certificate
  issuer: string;                     // Issuing authority / organization
  category: 'award' | 'certification' | 'workshop' | 'internship';
  date: string;                       // Date issued / period
  achievementLevel?: string;          // e.g. "First Prize Winner"
  verificationId?: string;            // Official certificate verification / roll / ID
  details: string;                    // Comprehensive description
  fileName: string;                   // The EXACT filename of the uploaded PDF file in public/certificates/
  filePath: string;                   // The exact web path to the PDF, e.g. "/certificates/kings-project-expo-2026.pdf"
  imagePath?: string;                 // Web path to file (alias for backward compatibility)
  pageNumber?: number;                // Reference index
  isExcluded?: boolean;               // If true, hidden from gallery without deleting (used for Java Full Stack)
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  details: string;
}

export const PERSONAL_INFO = {
  name: "Suriyanarayanan R",
  nameUpper: "SURIYANARAYANAN R",
  title: "B.E. Electronics and Communication Engineering",
  tagline: "Engineer by degree. Builder by passion.",
  college: "Kings College of Engineering",
  university: "Anna University",
  graduationYear: "2026",
  academicScore: "80.6% — Anna University",
  phone: "+91 8667811037",
  email: "suriyanarayanan5126@gmail.com",
  location: "Mannargudi, Tamil Nadu, India",
  github: "https://github.com/suriyanarayanan5126",
  linkedin: "https://www.linkedin.com/in/suriya-narayanan-r-1690862a2/",
  summary: "Motivated 2026 Electronics and Communication Engineering graduate seeking an entry-level opportunity in IT/Software Development. Strong foundation in Java, HTML, CSS, and Bootstrap with hands-on experience in software projects, embedded systems, IoT, testing, and troubleshooting. Quick learner with strong problem-solving, teamwork, and adaptability skills, looking to contribute to software development and technology-driven projects."
};

export const SKILLS_DATA = {
  programming: ["Java", "Object-Oriented Programming (OOP)", "Embedded C / C++"],
  webTechnologies: ["HTML5", "CSS3", "Bootstrap", "Responsive Web Design", "Flexbox"],
  development: ["Java Full Stack Development", "Hardware-Software Integration", "Testing & Troubleshooting"],
  tools: ["Visual Studio Code", "Arduino IDE", "Git & GitHub"],
  hardwareIoT: ["Embedded Systems", "IoT Architecture", "ESP32", "Microcontrollers", "Sensors & Actuators"],
  telecomAI: ["Telecommunication Systems", "Digital Communication", "Optical Fibre (OFC)", "Broadband Tech", "Linear Regression ML"]
};

export const PROJECTS_DATA: Project[] = [
  {
    // STRICT PATENT CONFIDENTIALITY:
    // Only the project title is shown.
    // No description, image, video, technologies, implementation details, source code, circuit diagrams, algorithms, or project links.
    id: "patent-oorai-display",
    title: "Design and Implementation of a Digital Oorai Display using Embedded System",
    category: "patent",
    type: "Patent-Applied Academic Project",
    isPatentConfidential: true,
    patentNumber: "TN/PIC/20256-26-PA106",
    hasVideoSlot: false,
  },
  {
    id: "smart-home-automation",
    title: "Smart Home Automation",
    category: "embedded",
    type: "IoT & Embedded System",
    shortSummary: "Developed an IoT-based system for controlling home appliances using embedded hardware.",
    description: "Architected a reliable home automation system integrating embedded hardware, relay controllers, and sensor interfaces to remotely manage electrical appliances with low latency and power efficiency.",
    tags: ["IoT", "Embedded Hardware", "Relay Switching", "Microcontroller", "Home Automation"],
    features: [
      "Appliance switching via solid-state and mechanical relays",
      "Wireless trigger interface for local and remote device management",
      "Fail-safe protection circuits for household electrical safety"
    ],
    interactiveType: "smart-home",
    hasVideoSlot: true,
    videoPath: "/videos/iot-smart-home.mp4",
    videoFileName: "iot-smart-home.mp4",
  },
  {
    id: "visitor-counter",
    title: "Bidirectional Visitor Counter",
    category: "embedded",
    type: "Sensor Automation & Hardware",
    shortSummary: "Developed an IR-sensor-based system for automated entry and exit counting.",
    description: "Engineered an infrared dual-beam gate sensor mechanism that detects direction of movement, accurately tracks human occupancy in real time, and automatically actuates room lighting to conserve energy. Awarded II Prize at Electrovibez '23.",
    tags: ["IR Sensors", "Embedded Systems", "Hardware Integration", "Energy Conservation"],
    features: [
      "Dual infrared transmitter/receiver pairs with directional logic",
      "Accurate head-count increment on entry and decrement on exit",
      "Automatic relay triggering for ambient room lighting based on occupancy status",
      "Awarded 2nd Prize at Electrovibez '23 National Level Technical Symposium"
    ],
    interactiveType: "visitor-counter",
    hasVideoSlot: true,
    videoPath: "/videos/visitor-counter.mp4",
    videoFileName: "visitor-counter.mp4",
  },
  {
    id: "smart-scrolling-display",
    title: "Smart Scrolling Display",
    category: "embedded",
    type: "Microcontroller LED System",
    shortSummary: "Microcontroller-based dynamic message broadcasting and real-time scrolling display system.",
    description: "Engineered an embedded digital message board capable of rendering real-time text notices, dynamic information feeds, and alerts using microcontroller multiplexing and display drivers.",
    tags: ["Microcontroller", "Display Multiplexing", "Embedded Firmware", "Real-Time Systems"],
    features: [
      "High-refresh multiplexed LED matrix driving logic",
      "Programmable string buffers with directional smooth scroll",
      "Low-power stand-by mode and rapid memory refresh"
    ],
    interactiveType: "scrolling-display",
    hasVideoSlot: true,
    videoPath: "/videos/scrolling-display.mp4",
    videoFileName: "scrolling-display.mp4",
  },
  {
    id: "suriya-ai",
    title: "Suriya AI & Salary Prediction",
    category: "ai",
    type: "Machine Learning Intelligence",
    shortSummary: "Developed a machine-learning project using Linear Regression during internship training.",
    description: "Built and evaluated a supervised machine learning regression pipeline to predict professional salary compensation trends based on experience years, education, and domain variables, implemented during IBM SkillsBuild training.",
    tags: ["Machine Learning", "Linear Regression", "Predictive Analytics", "Model Evaluation"],
    features: [
      "Feature engineering and data preprocessing on compensation benchmarks",
      "Linear regression modeling with error minimization and coefficient analysis",
      "Trained model verification with realistic salary variance estimations"
    ],
    interactiveType: "salary-predictor",
    hasVideoSlot: true,
    videoPath: "/videos/salary-prediction.mp4",
    videoFileName: "salary-prediction.mp4",
  },
  {
    id: "surveillance-car",
    title: "Surveillance Car",
    category: "robotics",
    type: "Embedded Robotics & Remote Vision",
    shortSummary: "Embedded robotics vehicle system featuring wireless motor navigation and live surveillance monitoring.",
    description: "Constructed an agile motorized robotic chassis equipped with motor drivers, microcontroller control, and wireless visual telemetry for area inspection and remote surveillance.",
    tags: ["Robotics", "Embedded Motor Drivers", "Wireless Telemetry", "Hardware Prototyping"],
    features: [
      "Dual H-Bridge motor driver integration with PWM speed calibration",
      "Wireless command reception for omnidirectional maneuverability",
      "Hardware mounting plate configured for wireless video streaming payload"
    ],
    interactiveType: "surveillance-car",
    hasVideoSlot: true,
    videoPath: "/videos/surveillance-car.mp4",
    videoFileName: "surveillance-car.mp4",
  }
];

export const INTERNSHIPS_DATA: Internship[] = [
  {
    id: "ibm-skillbuild",
    title: "Artificial Intelligence Virtual Internship",
    organization: "IBM SkillsBuild",
    location: "Virtual",
    period: "June 2025 – July 2025",
    roleType: "Virtual Internship",
    description: "Completed virtual internship training in Artificial Intelligence and developed an Employee Salary Prediction project using Linear Regression.",
    keyLearnings: [
      "Supervised machine learning algorithms and linear regression mathematics",
      "Model training, loss optimization, and evaluation metrics",
      "Practical deployment and testing of predictive workflows"
    ],
    verifiedCredential: "Credly / IBM SkillsBuild AI Fundamentals Verified Badge"
  },
  {
    id: "bsnl-internship",
    title: "Telecommunication and Networking Practical Training",
    organization: "Bharat Sanchar Nigam Limited (BSNL)",
    location: "Thanjavur Business Area, Tamil Nadu",
    period: "11.03.2024 – 15.03.2024",
    roleType: "Industrial In-Plant Practical Training",
    description: "Underwent hands-on internship training at BSNL Thanjavur, gaining comprehensive exposure to telecom infrastructure, networking systems, communication protocols, and physical optical fibre cable networks.",
    keyLearnings: [
      "Fundamentals of telecommunication switches and digital communication protocols",
      "Optical Fibre Cable (OFC) splicing, transmission characteristics, and testing",
      "Broadband technologies, FTTH (Fiber to the Home), and routing architecture"
    ],
    verifiedCredential: "Cert No. AGM(HR&A)/TNJ/157/2023"
  },
  {
    id: "edunet-aicte",
    title: "AI & Machine Learning 6-Week Internship",
    organization: "Edunet Foundation in collaboration with AICTE & IBM SkillsBuild",
    location: "India / Collaborative Program",
    period: "18.06.2025 – 30.07.2025",
    roleType: "6-Week Intensive Internship",
    description: "Participated in an intensive technical curriculum on AI and Machine Learning technologies under the national initiative powered by AICTE and Edunet Foundation.",
    keyLearnings: [
      "Deep dive into machine learning workflows, dataset preparation, and supervised algorithms",
      "Collaboration on engineering problems under mentor guidance",
      "Student Identification: STU657aa855cd1cb1702537301"
    ],
    verifiedCredential: "Edunet Foundation & AICTE Certificate of Participation"
  },
  {
    id: "fantasy-solution",
    title: "Artificial Intelligence Inplant Training",
    organization: "Fantasy Solution Software Development and Training",
    location: "Melapudur, Trichy, Tamil Nadu",
    period: "01.07.2025 – 01.08.2025",
    roleType: "Software & AI Training",
    description: "Underwent hands-on training and coursework on Artificial Intelligence concepts, software engineering patterns, and practical implementation.",
    keyLearnings: [
      "Core AI architectures and real-world software integration paradigms",
      "Hands-on coding, debugging, and verification of intelligent software components"
    ],
    verifiedCredential: "Certificate of Accomplishment, Fantasy Solution Trichy"
  }
];

/**
 * CENTRALIZED CERTIFICATE CONFIGURATION LIST (PDF FORMAT)
 * 
 * Manage certificates individually in separate PDF format:
 * 1. Upload individual certificate PDF files (.pdf) to: public/certificates/
 * 2. Register or update the entry below with its exact `fileName` and `filePath`.
 * 3. Or upload each PDF directly through the UI card using the "Select Certificate PDF" button.
 * 
 * Each certificate PDF is rendered into a crisp preview automatically, and visitors can inspect
 * or download the authentic PDF file directly.
 */
export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-kings-project-expo-2026",
    title: "Kings Project Expo '26 — Digital Oorai Display",
    issuer: "Kings College of Engineering (Autonomous) & IEEE",
    category: "award",
    date: "16.04.2026",
    achievementLevel: "First / Second Prize Winner · ECE Track",
    details: "Certificate of Appreciation for project 'Design and Implementation of a Digital Oorai Real Time Display using Embedded System' organized by Centre for Promotion of Research, Kings College of Engineering.",
    fileName: "kings-project-expo-2026.pdf",
    filePath: "/certificates/kings-project-expo-2026.pdf",
    imagePath: "/certificates/kings-project-expo-2026.pdf",
    pageNumber: 1
  },
  {
    id: "cert-freq-fest-24",
    title: "Freq Fest 24 International Student Symposium — 1st Place",
    issuer: "E.G.S. Pillay Engineering College, Nagapattinam",
    category: "award",
    date: "05.10.2024",
    achievementLevel: "FIRST Place Winner",
    details: "Awarded FIRST place in the 'Economic Electronic Garments Design' competition as part of the International Level Technical Symposium Freq Fest 24, organized by SPARKS Student Association, Dept of ECE.",
    fileName: "freq-fest-24.pdf",
    filePath: "/certificates/freq-fest-24.pdf",
    imagePath: "/certificates/freq-fest-24.pdf",
    pageNumber: 2
  },
  {
    id: "cert-acmet-2k25",
    title: "Acmet '2k25 13th National Level Technical Fest — I Prize",
    issuer: "M.A.M. School of Engineering, Siruganur, Trichy",
    category: "award",
    date: "30.04.2025",
    achievementLevel: "1st Prize Winner · Innovation Expo",
    details: "Secured First Prize in Innovation Expo at the 13th National Level Technical Fest Acmet '2k25 for presenting innovative hardware solutions.",
    fileName: "acmet-2k25.pdf",
    filePath: "/certificates/acmet-2k25.pdf",
    imagePath: "/certificates/acmet-2k25.pdf",
    pageNumber: 3
  },
  {
    id: "cert-electrovibez-23",
    title: "Electrovibez '23 National Level Technical Symposium — II Prize",
    issuer: "Kings College of Engineering, Dept of ECE & IEEE",
    category: "award",
    date: "10.10.2023",
    achievementLevel: "Second Prize Winner",
    details: "Demonstrated project titled 'Bi-Directional visitor counter with light control' in the National Level Technical Symposium and won Second Prize.",
    fileName: "electrovibez-23.pdf",
    filePath: "/certificates/electrovibez-23.pdf",
    imagePath: "/certificates/electrovibez-23.pdf",
    pageNumber: 4
  },
  {
    id: "cert-mini-project-expo-2023",
    title: "Mini Project Expo 2023 — 1st Place",
    issuer: "Kings College of Engineering, Dept of ECE & S&H",
    category: "award",
    date: "25.05.2023",
    achievementLevel: "1st Place Winner",
    details: "Won 1st Place in the Mini Project Expo organized by Department of Electronics and Communication Engineering.",
    fileName: "mini-project-expo-2023.pdf",
    filePath: "/certificates/mini-project-expo-2023.pdf",
    imagePath: "/certificates/mini-project-expo-2023.pdf",
    pageNumber: 5
  },
  {
    id: "cert-mini-project-expo-2024",
    title: "Mini Project Expo 2024 — II nd Position",
    issuer: "Kings College of Engineering & ISTE Students Chapter",
    category: "award",
    date: "03.04.2024",
    achievementLevel: "2nd Position Winner",
    details: "Secured Second Position in the Mini Project Expo organized under ISTE Students Chapter TN 217.",
    fileName: "mini-project-expo-2024.pdf",
    filePath: "/certificates/mini-project-expo-2024.pdf",
    imagePath: "/certificates/mini-project-expo-2024.pdf",
    pageNumber: 6
  },
  {
    id: "cert-ibm-credly",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild & Credly",
    category: "certification",
    date: "01.07.2025",
    verificationId: "c9850c1b-ea3d-4e6c-a7f0-1ead9249e9b0",
    details: "Officially recognized for commitment to professional excellence and satisfying all requirements for Artificial Intelligence Fundamentals. Verified badge on Credly.",
    fileName: "ibm-skillsbuild-ai-fundamentals.pdf",
    filePath: "/certificates/ibm-skillsbuild-ai-fundamentals.pdf",
    imagePath: "/certificates/ibm-skillsbuild-ai-fundamentals.pdf",
    pageNumber: 7
  },
  {
    id: "cert-nxtwave-static",
    title: "Build Your Own Static Website",
    issuer: "NxtWave CCBP 4.0 Academy (NASSCOM)",
    category: "certification",
    date: "11.02.2025",
    verificationId: "FPSQRCSCGL",
    details: "Successfully completed hands-on coursework covering HTML5, CSS3, Bootstrap grid systems, and layout design designed by top alumni from Google, Amazon, and Microsoft.",
    fileName: "nxtwave-build-static-website.pdf",
    filePath: "/certificates/nxtwave-build-static-website.pdf",
    imagePath: "/certificates/nxtwave-build-static-website.pdf",
    pageNumber: 8
  },
  {
    id: "cert-java-fullstack",
    title: "Java Full Stack Development Certification",
    issuer: "Unique Innovibe",
    category: "certification",
    date: "2024 – 2025",
    details: "Comprehensive certification covering Core Java, Object-Oriented Programming, Java Full Stack architecture, database connectivity, and backend service integration.",
    fileName: "java-full-stack-certification.pdf",
    filePath: "/certificates/java-full-stack-certification.pdf",
    imagePath: "/certificates/java-full-stack-certification.pdf",
    pageNumber: 9,
    isExcluded: true // Preserved in file, not displayed in gallery per user request
  },
  {
    id: "cert-nxtwave-responsive",
    title: "Build Your Own Responsive Website",
    issuer: "NxtWave CCBP 4.0 Academy (NASSCOM)",
    category: "certification",
    date: "25.02.2025",
    verificationId: "UFXPKMXZKP",
    details: "Successfully completed advanced coursework covering responsive web design paradigms, Bootstrap frameworks, and modern CSS Flexbox architectures.",
    fileName: "nxtwave-build-responsive-website.pdf",
    filePath: "/certificates/nxtwave-build-responsive-website.pdf",
    imagePath: "/certificates/nxtwave-build-responsive-website.pdf",
    pageNumber: 10
  },
  {
    id: "cert-iot-workshop-kings",
    title: "Two Days Workshop on IoT with Arduino / Raspberry Pi",
    issuer: "Centre of Excellence - IoT, Kings College of Engineering & IEEE",
    category: "workshop",
    date: "26.10.2023 – 27.10.2023",
    details: "Hands-on two-day practical workshop on embedded prototyping, sensor integration, Arduino programming, and Raspberry Pi system interfacing.",
    fileName: "iot-workshop-arduino-raspberry-pi.pdf",
    filePath: "/certificates/iot-workshop-arduino-raspberry-pi.pdf",
    imagePath: "/certificates/iot-workshop-arduino-raspberry-pi.pdf",
    pageNumber: 11
  },
  {
    id: "cert-ipr-mic-aicte",
    title: "Role of Innovation in Startup Success & IPR / Patents",
    issuer: "MIC AICTE Sponsored Impact Lecture Series & Kings College IIC",
    category: "workshop",
    date: "17.05.2024",
    details: "Attended MIC AICTE sponsored impact lecture series on 'Role of Innovation in Startup Success and Enforcement of Intellectual Property Rights - Patents and Design'.",
    fileName: "ipr-patents-innovation-lecture.pdf",
    filePath: "/certificates/ipr-patents-innovation-lecture.pdf",
    imagePath: "/certificates/ipr-patents-innovation-lecture.pdf",
    pageNumber: 12
  },
  {
    id: "cert-edunet-internship",
    title: "Edunet & AICTE AI & Machine Learning 6-Week Internship",
    issuer: "Edunet Foundation in collaboration with AICTE & IBM SkillsBuild",
    category: "internship",
    date: "30.07.2025",
    verificationId: "STU657aa855cd1cb1702537301",
    details: "Successfully completed 6-week intensive training in Artificial Intelligence & Machine Learning technologies.",
    fileName: "edunet-aicte-ai-ml-internship.pdf",
    filePath: "/certificates/edunet-aicte-ai-ml-internship.pdf",
    imagePath: "/certificates/edunet-aicte-ai-ml-internship.pdf",
    pageNumber: 14
  },
  {
    id: "cert-bsnl-training",
    title: "BSNL Internship Training Certificate",
    issuer: "Bharat Sanchar Nigam Limited (BSNL), Govt of India Enterprise",
    category: "internship",
    date: "15.03.2024",
    verificationId: "AGM(HR&A)/TNJ/157/2023",
    details: "Undergone practical telecom training covering digital communication, optical fibre infrastructure, and broadband technology at BSNL Thanjavur.",
    fileName: "bsnl-telecom-internship.pdf",
    filePath: "/certificates/bsnl-telecom-internship.pdf",
    imagePath: "/certificates/bsnl-telecom-internship.pdf",
    pageNumber: 13
  },
  {
    id: "cert-fantasy-solution",
    title: "Fantasy Solution Certificate of Accomplishment",
    issuer: "Fantasy Solution Software Development and Training, Trichy",
    category: "internship",
    date: "01.08.2025",
    details: "Inplant training and internship course on Artificial Intelligence, practical algorithmic problem solving, and software engineering.",
    fileName: "fantasy-solution-ai-training.pdf",
    filePath: "/certificates/fantasy-solution-ai-training.pdf",
    imagePath: "/certificates/fantasy-solution-ai-training.pdf",
    pageNumber: 15,
    isExcluded: true
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Kings College of Engineering",
    degree: "B.E. Electronics and Communication Engineering",
    period: "2022 – 2026",
    score: "80.6% — Anna University",
    details: "Comprehensive coursework in Embedded Systems, Microcontrollers, Digital Signal Processing, VLSI, Communication Networks, and Hardware Architecture. Active researcher and symposium lead."
  },
  {
    institution: "National Government Aided Higher Secondary School, Mannargudi",
    degree: "Higher Secondary Certificate (HSC)",
    period: "Completed 2022",
    score: "First Class with Distinction",
    details: "Focused specialization in Mathematics, Physics, Chemistry, and Computer Science fundamentals."
  },
  {
    institution: "St. Joseph Matric High School, Mannargudi",
    degree: "Secondary School Leaving Certificate (SSLC)",
    period: "Completed 2020",
    score: "High Academic Standing",
    details: "Strong foundational academic track record in scientific disciplines and analytical problem solving."
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    title: "Resource Person for 80+ Students",
    subtitle: "Hands-on Workshop on IoT & AI in Electronics",
    description: "Invited to serve as a Resource Person and successfully conducted an intensive, hands-on workshop guiding 80+ engineering peers on microcontroller interfacing, sensor circuits, and practical AI implementations in hardware."
  },
  {
    title: "Multiple 1st Prizes & Cash Awards",
    subtitle: "Inter-College & National Technical Symposiums",
    description: "Consistently secured 1st place and top podium finishes at premier symposiums including Freq Fest '24 (EGS Pillay Engg College), Acmet '2k25 (MAM School of Engg), and Kings Project Expos."
  },
  {
    title: "Patent Applied Inventor",
    subtitle: "Application No: TN/PIC/20256-26-PA106",
    description: "Authored and filed a patent for an innovative embedded hardware system: 'Design and Implementation of a Digital Oorai Display using Embedded System'."
  }
];

export const AVATAR_SPEECH_SCRIPT = 
  "Hi, welcome to my portfolio! I’m Suriyanarayanan R, a 2026 Electronics and Communication Engineering graduate from Kings College of Engineering. I graduated with 80.6% under Anna University. I’m interested in Java, web development, embedded systems, and IoT. Explore my projects and achievements, and feel free to connect with me. Thanks for visiting!";
