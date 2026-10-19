export interface Project {
  id: string;
  title: string;
  category: 'embedded' | 'ai' | 'robotics' | 'patent' | 'web';
  type: string;
  isPatentConfidential?: boolean;
  patentNumber?: string;
  shortSummary?: string;
  description?: string;
  tags?: string[];
  features?: string[];
  interactiveType?: 'smart-home' | 'visitor-counter' | 'salary-predictor' | 'scrolling-display' | 'surveillance-car' | 'web-showcase';
  hasVideoSlot?: boolean;
  videoPath?: string;
  videoFileName?: string;
  uploadedFileName?: string;
  thumbnailUrl?: string;
  videoAliases?: string[];
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
  id: string;                         // Unique identifier
  title: string;                      // Real verified title of certificate
  issuer: string;                     // Issuing authority / organization
  category: 'award' | 'certification' | 'workshop' | 'internship';
  date: string;                       // Date issued / period
  achievementLevel?: string;          // e.g. "First Prize Winner"
  verificationId?: string;            // Official certificate verification / roll / ID
  details: string;                    // Comprehensive description
  fileName: string;                   // Normalized or expected filename in public/certificates/
  filePath: string;                   // Web route to PDF
  imagePath?: string;                 // Preview image or fallback
  uploadedFileName?: string;          // The user's uploaded filename (e.g. "4elec23.pdf", "5.pdf", etc.)
  aliases?: string[];                 // Supported alternate names
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
  summary: "Motivated 2026 Electronics and Communication Engineering graduate from Kings College of Engineering with an academic standing of 80.6% under Anna University. Passionate builder with a strong foundation in Java, Object-Oriented Programming, HTML, CSS, and Bootstrap, complemented by hands-on embedded hardware engineering in ESP32, IoT architectures, sensor automation, and robotics."
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
    // Only the exact project title is shown:
    // "Design and Implementation of a Digital Oorai Display using Embedded System"
    // No description, image, video, technologies, implementation details, source code, circuit diagrams, algorithms, or project links.
    id: "patent-oorai-display",
    title: "Design and Implementation of a Digital Oorai Display using Embedded System",
    category: "patent",
    type: "Patent-Applied Academic Project",
    isPatentConfidential: true,
    hasVideoSlot: false,
  },
  {
    id: "smart-home-automation",
    title: "Smart Home Automation",
    category: "embedded",
    type: "IoT & Embedded System",
    shortSummary: "Developed an IoT-based system for controlling home appliances using embedded hardware.",
    description: "Architected a reliable home automation system integrating embedded hardware, relay controllers, and sensor interfaces to remotely manage electrical appliances with low latency and power efficiency.",
    tags: ["IoT", "Embedded Hardware", "Relay Switching", "ESP32", "Home Automation"],
    features: [
      "Appliance switching via solid-state and mechanical relays",
      "Wireless trigger interface for local and remote device management",
      "Fail-safe protection circuits for household electrical safety"
    ],
    interactiveType: "smart-home",
    hasVideoSlot: true,
    videoPath: "/videos/home%20automation%20video(1).mp4",
    videoFileName: "home automation video(1).mp4",
    uploadedFileName: "home automation video(1).mp4",
    thumbnailUrl: "/assets/projects/iot-smart-home-thumb.jpg",
    videoAliases: [
      "home automation video(1).mp4",
      "home automation video.mp4"
    ]
  },
  {
    id: "visitor-counter",
    title: "Bidirectional Visitor Counter",
    category: "embedded",
    type: "Sensor Automation & Hardware",
    shortSummary: "Developed an IR-sensor-based system for automated entry and exit counting with automated lighting control.",
    description: "Engineered an infrared dual-beam gate sensor mechanism that detects direction of movement, accurately tracks human occupancy in real time on a 16x2 LCD, and automatically actuates room lighting to conserve energy. Awarded II Prize at Electrovibez '23.",
    tags: ["IR Sensors", "Embedded Systems", "Hardware Integration", "Energy Conservation"],
    features: [
      "Dual infrared transmitter/receiver pairs with directional logic",
      "Accurate head-count increment on entry and decrement on exit",
      "Automatic relay triggering for ambient room lighting based on occupancy status",
      "Awarded 2nd Prize at Electrovibez '23 National Level Technical Symposium"
    ],
    interactiveType: "visitor-counter",
    hasVideoSlot: true,
    videoPath: "/videos/visitor%20counter%20video(1).mp4",
    videoFileName: "visitor counter video(1).mp4",
    uploadedFileName: "visitor counter video(1).mp4",
    thumbnailUrl: "/assets/projects/visitor-counter-thumb.jpg",
    videoAliases: [
      "visitor counter video(1).mp4",
      "visitor counter video.mp4"
    ]
  },
  {
    id: "smart-scrolling-display",
    title: "Smart Scrolling Display",
    category: "embedded",
    type: "Microcontroller LED System",
    shortSummary: "Microcontroller-based dynamic message broadcasting and real-time scrolling display system.",
    description: "Engineered an embedded digital message board capable of rendering real-time text notices, dynamic information feeds, and alerts using microcontroller multiplexing and 16x64 LED dot matrix drivers.",
    tags: ["Microcontroller", "Display Multiplexing", "Embedded Firmware", "Real-Time Systems"],
    features: [
      "High-refresh multiplexed LED matrix driving logic",
      "Programmable string buffers with directional smooth scroll",
      "Mobile Wi-Fi configuration app interface for instant text updates"
    ],
    interactiveType: "scrolling-display",
    hasVideoSlot: true,
    videoPath: "/videos/smart%20scrolling%20display%20video(1).mp4",
    videoFileName: "smart scrolling display video(1).mp4",
    uploadedFileName: "smart scrolling display video(1).mp4",
    thumbnailUrl: "/assets/projects/scrolling-display-thumb.jpg",
    videoAliases: [
      "smart scrolling display video(1).mp4",
      "smart scrolling display video.mp4"
    ]
  },
  {
    id: "suriya-ai",
    title: "Suriya AI",
    category: "ai",
    type: "AI-Powered Study Assistant",
    shortSummary: "Snap & Study assistant that analyzes diagrams, flowcharts, code, and notes with step-by-step explanations.",
    description: "Built an intelligent study assistant application powered by Gemini AI and Python Streamlit that allows students to upload image notes, algorithm flowcharts, or code, receiving instant structured explanations and email dispatch.",
    tags: ["AI Assistant", "Computer Vision", "Streamlit", "Gemini AI", "EdTech"],
    features: [
      "Study material image analysis and flowchart breakdown",
      "Interactive follow-up questions and conversational study guidance",
      "One-click automated email dispatch of explanations to students"
    ],
    interactiveType: "salary-predictor",
    hasVideoSlot: true,
    videoPath: "/videos/suriya%20ai%20video(1).mp4",
    videoFileName: "suriya ai video(1).mp4",
    uploadedFileName: "suriya ai video(1).mp4",
    thumbnailUrl: "/assets/projects/suriya-ai-thumb.jpg",
    videoAliases: [
      "suriya ai video(1).mp4",
      "suriya ai video.mp4"
    ]
  },
  {
    id: "surveillance-car",
    title: "Surveillance Car",
    category: "robotics",
    type: "Embedded Robotics & Remote Vision",
    shortSummary: "Embedded robotics vehicle system featuring wireless motor navigation and live surveillance monitoring.",
    description: "Constructed an agile motorized robotic rover chassis equipped with motor drivers, microcontroller control, and wireless visual telemetry for area inspection and remote surveillance.",
    tags: ["Robotics", "Embedded Motor Drivers", "Wireless Telemetry", "Hardware Prototyping"],
    features: [
      "Dual H-Bridge motor driver integration with PWM speed calibration",
      "Wireless web control pad for omnidirectional maneuverability",
      "Night illumination LED headlights and live video camera streaming"
    ],
    hasVideoSlot: true,
    videoPath: "/videos/survilliance%20car%20video(1).mp4",
    videoFileName: "survilliance car video(1).mp4",
    uploadedFileName: "survilliance car video(1).mp4",
    thumbnailUrl: "/assets/projects/surveillance-car-thumb.jpg",
    videoAliases: [
      "survilliance car video(1).mp4",
      "survilliance car video.mp4"
    ]
  },
  {
    id: "food-munch-website",
    title: "Food Munch Website",
    category: "web",
    type: "Responsive Web Application",
    shortSummary: "Developed a responsive food ordering and restaurant showcase platform with interactive menus and sleek UX.",
    description: "Architected a responsive multi-section web application utilizing HTML5, modern CSS3 animations, and Bootstrap grid systems. Features interactive menu filters, food delivery tracking layout, and cross-device optimization certified by NxtWave CCBP 4.0 Academy.",
    tags: ["HTML5", "CSS3", "Bootstrap", "Responsive Design", "Flexbox UI"],
    features: [
      "Custom responsive grid layouts with mobile-first viewport design",
      "Interactive dish item categorization with smooth CSS transitions",
      "Optimized DOM hierarchy for rapid load speed and accessible semantic structure"
    ],
    interactiveType: "web-showcase",
    hasVideoSlot: false,
  },
  {
    id: "college-symposium-website",
    title: "College Symposium Website",
    category: "web",
    type: "Technical Event Portal",
    shortSummary: "Engineered an official event registration and scheduling portal for inter-college technical symposiums.",
    description: "Designed and built the digital portal for technical symposium events, featuring dynamic schedule views, paper presentation track guidelines, online registration forms, and countdown timers for participant coordination.",
    tags: ["Web Architecture", "Event Management", "Responsive UI", "Form Validation"],
    features: [
      "Event registration interface with input validation and feedback notices",
      "Dynamic timeline schedule tracking multiple parallel technical tracks",
      "Symposium venue navigation and contact transmission console"
    ],
    interactiveType: "web-showcase",
    hasVideoSlot: false,
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
    location: "Virtual Technical Immersion",
    period: "18.06.2025 – 30.07.2025",
    roleType: "Government-Backed National AI Internship",
    description: "Successfully participated in an intensive 6-week curriculum on Artificial Intelligence and Machine Learning technologies under AICTE guidance.",
    keyLearnings: [
      "Core machine learning mathematical algorithms and data pipeline design",
      "Practical exploratory data analysis (EDA) and predictive modeling",
      "Implementation of applied machine learning projects"
    ],
    verifiedCredential: "Student STU ID: STU657aa855cd1cb1702537301"
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-electrovibez-23",
    title: "Electrovibez '23 National Level Technical Symposium — II Prize",
    issuer: "Kings College of Engineering (Dept of ECE & IEEE)",
    category: "award",
    date: "10.10.2023",
    achievementLevel: "Second Prize Winner",
    details: "Demonstrated project titled 'Bi-Directional visitor counter with light control' in the National Level Technical Symposium and won Second Prize.",
    fileName: "4elec23.pdf",
    filePath: "/certificates/4elec23.pdf",
    imagePath: "/certificates/4elec23.pdf",
    uploadedFileName: "4elec23.pdf",
    aliases: ["4elec23.pdf", "electrovibez-23.pdf", "visitor_counter_award.pdf"],
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
    fileName: "5.pdf",
    filePath: "/certificates/5.pdf",
    imagePath: "/certificates/5.pdf",
    uploadedFileName: "5.pdf",
    aliases: ["5.pdf", "mini-project-expo-2023.pdf"],
    pageNumber: 5
  },
  {
    id: "cert-mini-project-expo-2024",
    title: "Mini Project Expo 2024 — II nd Position",
    issuer: "Kings College of Engineering & ISTE Students Chapter [TN 217]",
    category: "award",
    date: "03.04.2024",
    achievementLevel: "2nd Position Winner",
    details: "Secured Second Position in the Mini Project Expo organized under ISTE Students Chapter TN 217.",
    fileName: "6.pdf",
    filePath: "/certificates/6.pdf",
    imagePath: "/certificates/6.pdf",
    uploadedFileName: "6.pdf",
    aliases: ["6.pdf", "mini-project-expo-2024.pdf"],
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
    fileName: "7.pdf",
    filePath: "/certificates/7.pdf",
    imagePath: "/certificates/7.pdf",
    uploadedFileName: "7.pdf",
    aliases: ["7.pdf", "ibm-skillsbuild-ai-fundamentals.pdf", "ibm_credly.pdf"],
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
    fileName: "8.pdf",
    filePath: "/certificates/8.pdf",
    imagePath: "/certificates/8.pdf",
    uploadedFileName: "8.pdf",
    aliases: ["8.pdf", "nxtwave-build-static-website.pdf"],
    pageNumber: 8
  },
  {
    id: "cert-java-fullstack",
    title: "Java Full Stack Development Certification",
    issuer: "Unique Innovibe",
    category: "certification",
    date: "2024 – 2025",
    details: "Comprehensive certification covering Core Java, Object-Oriented Programming, Java Full Stack architecture, database connectivity, and backend service integration.",
    fileName: "9.pdf",
    filePath: "/certificates/9.pdf",
    imagePath: "/certificates/9.pdf",
    uploadedFileName: "9.pdf",
    aliases: ["9.pdf", "java-full-stack-certification.pdf"],
    pageNumber: 9,
    isExcluded: true // STRICTLY EXCLUDED from public display per explicit user instruction
  },
  {
    id: "cert-nxtwave-responsive",
    title: "Build Your Own Responsive Website",
    issuer: "NxtWave CCBP 4.0 Academy (NASSCOM)",
    category: "certification",
    date: "25.02.2025",
    verificationId: "UFXPKMXZKP",
    details: "Successfully completed advanced coursework covering responsive web design paradigms, Bootstrap frameworks, and modern CSS Flexbox architectures.",
    fileName: "10.pdf",
    filePath: "/certificates/10.pdf",
    imagePath: "/certificates/10.pdf",
    uploadedFileName: "10.pdf",
    aliases: ["10.pdf", "nxtwave-build-responsive-website.pdf"],
    pageNumber: 10
  },
  {
    id: "cert-iot-workshop-kings",
    title: "Two Days Workshop on IoT with Arduino / Raspberry Pi",
    issuer: "Centre of Excellence - IoT, Kings College of Engineering & IEEE",
    category: "workshop",
    date: "26.10.2023 – 27.10.2023",
    details: "Hands-on two-day practical workshop on embedded prototyping, sensor integration, Arduino programming, and Raspberry Pi system interfacing.",
    fileName: "11.pdf",
    filePath: "/certificates/11.pdf",
    imagePath: "/certificates/11.pdf",
    uploadedFileName: "11.pdf",
    aliases: ["11.pdf", "iot-workshop-arduino-raspberry-pi.pdf"],
    pageNumber: 11
  },
  {
    id: "cert-ipr-mic-aicte",
    title: "Role of Innovation in Startup Success & IPR / Patents",
    issuer: "MIC AICTE Sponsored Impact Lecture Series & Kings College IIC",
    category: "workshop",
    date: "17.05.2024",
    details: "Attended MIC AICTE sponsored impact lecture series on 'Role of Innovation in Startup Success and Enforcement of Intellectual Property Rights - Patents and Design'.",
    fileName: "12 (2).pdf",
    filePath: "/certificates/12 (2).pdf",
    imagePath: "/certificates/12 (2).pdf",
    uploadedFileName: "12 (2).pdf",
    aliases: ["12 (2).pdf", "12.pdf", "ipr-patents-innovation-lecture.pdf"],
    pageNumber: 12
  },
  {
    id: "cert-edunet-internship",
    title: "Edunet & AICTE AI & Machine Learning 6-Week Internship",
    issuer: "Edunet Foundation in collaboration with AICTE & IBM SkillsBuild",
    category: "internship",
    date: "18.06.2025 – 30.07.2025",
    verificationId: "STU657aa855cd1cb1702537301",
    details: "Successfully completed 6-week intensive training in Artificial Intelligence & Machine Learning technologies.",
    fileName: "13.pdf",
    filePath: "/certificates/13.pdf",
    imagePath: "/certificates/13.pdf",
    uploadedFileName: "13.pdf",
    aliases: ["13.pdf", "edunet-aicte-ai-ml-internship.pdf"],
    pageNumber: 14
  },
  {
    id: "cert-bsnl-training",
    title: "BSNL Internship Training Certificate",
    issuer: "Bharat Sanchar Nigam Limited (BSNL), Govt of India Enterprise",
    category: "internship",
    date: "11.03.2024 – 15.03.2024",
    verificationId: "No. AGM(HR&A)/TNJ/157/2023",
    details: "Undergone practical telecom training covering digital communication, optical fibre infrastructure, and broadband technology at BSNL Thanjavur.",
    fileName: "bsnl-telecom-internship.pdf",
    filePath: "/certificates/bsnl-telecom-internship.pdf",
    imagePath: "/certificates/bsnl-telecom-internship.pdf",
    uploadedFileName: "bsnl-telecom-internship.pdf",
    aliases: ["bsnl-telecom-internship.pdf", "bsnl.pdf"],
    pageNumber: 13
  },
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
    uploadedFileName: "kings-project-expo-2026.pdf",
    aliases: ["kings-project-expo-2026.pdf", "kings_expo.pdf"],
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
    uploadedFileName: "freq-fest-24.pdf",
    aliases: ["freq-fest-24.pdf", "freq_fest.pdf"],
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
    uploadedFileName: "acmet-2k25.pdf",
    aliases: ["acmet-2k25.pdf", "acmet.pdf"],
    pageNumber: 3
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
    title: "Design and Implementation of a Digital Oorai Display using Embedded System",
    subtitle: "Patent-Applied Academic Project",
    description: "Confidential patent-pending intellectual property."
  }
];

export const AVATAR_SPEECH_SCRIPT = 
  "Hello, and welcome to my portfolio. I am Suriyanarayanan R, an Electronics and Communication Engineering graduate from Kings College of Engineering. I am passionate about embedded systems, the Internet of Things, hardware and software integration, and software development. I enjoy learning new technologies and building practical engineering projects. Thank you for visiting my portfolio.";
