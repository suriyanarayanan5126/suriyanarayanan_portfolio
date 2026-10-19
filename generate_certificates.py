import os

os.makedirs('public/certificates', exist_ok=True)
os.makedirs('public/assets/certificates', exist_ok=True)

certs = [
    {
        "id": "cert-electrovibez-23",
        "file": "4elec23.pdf",
        "title": "Electrovibez '23 National Level Technical Symposium",
        "subtitle": "Certificate of Merit — Second Prize",
        "category": "SYMPOSIUM AWARD",
        "issuer": "Kings College of Engineering, Dept of ECE & IEEE Student Branch",
        "date": "October 10, 2023",
        "award": "SECOND PRIZE WINNER",
        "details": "Demonstrated project titled 'Bi-Directional visitor counter with light control' in the National Level Technical Symposium.",
        "badge_color": "#d97706",
        "accent_color": "#2563eb",
        "id_text": "Ref: KCE/ECE/EV23/P-02"
    },
    {
        "id": "cert-mini-project-expo-2023",
        "file": "5.pdf",
        "title": "Mini Project Expo 2023",
        "subtitle": "Certificate of Appreciation — First Place",
        "category": "HARDWARE EXPO AWARD",
        "issuer": "Kings College of Engineering, Department of ECE & S&H",
        "date": "May 25, 2023",
        "award": "FIRST PLACE WINNER",
        "details": "Awarded 1st Place in the Mini Project Expo for outstanding hardware prototype design and embedded implementation.",
        "badge_color": "#d97706",
        "accent_color": "#4f46e5",
        "id_text": "Ref: KCE/ECE/MPE-23/01"
    },
    {
        "id": "cert-mini-project-expo-2024",
        "file": "6.pdf",
        "title": "Mini Project Expo 2024",
        "subtitle": "Certificate of Merit — Second Position",
        "category": "HARDWARE EXPO AWARD",
        "issuer": "Kings College of Engineering & ISTE Students Chapter [TN 217]",
        "date": "April 03, 2024",
        "award": "SECOND POSITION WINNER",
        "details": "Secured Second Position in the Mini Project Expo organized under ISTE Students Chapter TN 217 for embedded sensor automation.",
        "badge_color": "#d97706",
        "accent_color": "#0284c7",
        "id_text": "Ref: ISTE/TN217/MPE-24/02"
    },
    {
        "id": "cert-ibm-credly",
        "file": "7.pdf",
        "title": "Artificial Intelligence Fundamentals",
        "subtitle": "Professional Credential & Verified Badge",
        "category": "GLOBAL PROFESSIONAL CERTIFICATION",
        "issuer": "IBM SkillsBuild & Credly",
        "date": "July 01, 2025",
        "award": "CERTIFIED PRACTITIONER",
        "details": "Officially recognized for commitment to professional excellence and satisfying all requirements for Artificial Intelligence Fundamentals.",
        "badge_color": "#2563eb",
        "accent_color": "#1d4ed8",
        "id_text": "Credly ID: c9850c1b-ea3d-4e6c-a7f0-1ead9249e9b0"
    },
    {
        "id": "cert-nxtwave-static",
        "file": "8.pdf",
        "title": "Build Your Own Static Website",
        "subtitle": "Certificate of Course Completion",
        "category": "PROFESSIONAL WEB CERTIFICATION",
        "issuer": "NxtWave CCBP 4.0 Academy (NASSCOM Recognized)",
        "date": "February 11, 2025",
        "award": "COURSE EXCELLENCE",
        "details": "Hands-on coursework covering HTML5, CSS3, modern layout architectures, Bootstrap grid systems, and web standards.",
        "badge_color": "#059669",
        "accent_color": "#0d9488",
        "id_text": "Certificate ID: FPSQRCSCGL"
    },
    {
        "id": "cert-java-fullstack",
        "file": "9.pdf",
        "title": "Java Full Stack Development Certification",
        "subtitle": "Comprehensive Training Certification",
        "category": "SOFTWARE DEVELOPMENT",
        "issuer": "Unique Innovibe",
        "date": "2024 – 2025",
        "award": "FULL STACK CERTIFIED",
        "details": "Comprehensive certification covering Core Java, Object-Oriented Programming, and Java Full Stack backend architecture.",
        "badge_color": "#4f46e5",
        "accent_color": "#4338ca",
        "id_text": "Reg: UI/JFS/2024-25"
    },
    {
        "id": "cert-nxtwave-responsive",
        "file": "10.pdf",
        "title": "Build Your Own Responsive Website",
        "subtitle": "Certificate of Competency",
        "category": "PROFESSIONAL WEB CERTIFICATION",
        "issuer": "NxtWave CCBP 4.0 Academy (NASSCOM Recognized)",
        "date": "February 25, 2025",
        "award": "RESPONSIVE ARCHITECTURE",
        "details": "Completed advanced coursework covering responsive web design paradigms, Bootstrap frameworks, and modern CSS Flexbox architectures.",
        "badge_color": "#059669",
        "accent_color": "#0891b2",
        "id_text": "Certificate ID: UFXPKMXZKP"
    },
    {
        "id": "cert-iot-workshop-kings",
        "file": "11.pdf",
        "title": "Two Days Workshop on IoT with Arduino / Raspberry Pi",
        "subtitle": "Certificate of Participation & Technical Mastery",
        "category": "HANDS-ON EMBEDDED WORKSHOP",
        "issuer": "Centre of Excellence - IoT, Kings College of Engineering & IEEE",
        "date": "October 26–27, 2023",
        "award": "WORKSHOP PARTICIPATION",
        "details": "Hands-on two-day practical workshop on embedded prototyping, sensor integration, Arduino programming, and Raspberry Pi system interfacing.",
        "badge_color": "#7c3aed",
        "accent_color": "#6366f1",
        "id_text": "Ref: KCE/COE-IOT/WS-23/44"
    },
    {
        "id": "cert-ipr-mic-aicte",
        "file": "12 (2).pdf",
        "title": "Role of Innovation in Startup Success & IPR / Patents",
        "subtitle": "Certificate of Participation",
        "category": "NATIONAL IMPACT LECTURE SERIES",
        "issuer": "MIC AICTE Sponsored Impact Lecture Series & Kings College IIC",
        "date": "May 17, 2024",
        "award": "IMPACT LECTURE SERIES",
        "details": "Attended MIC AICTE sponsored impact lecture series on 'Role of Innovation in Startup Success and Enforcement of Intellectual Property Rights - Patents and Design'.",
        "badge_color": "#ea580c",
        "accent_color": "#c2410c",
        "id_text": "Ref: MIC/AICTE/ILS-2024/098"
    },
    {
        "id": "cert-edunet-internship",
        "file": "13.pdf",
        "title": "AI & Machine Learning 6-Week Internship",
        "subtitle": "Certificate of Internship Completion",
        "category": "AICTE ACCREDITED INTERNSHIP",
        "issuer": "Edunet Foundation in collaboration with AICTE & IBM SkillsBuild",
        "date": "June 18 – July 30, 2025",
        "award": "INTERNSHIP COMPLETION",
        "details": "Successfully completed 6-week intensive training in Artificial Intelligence & Machine Learning technologies under AICTE guidance.",
        "badge_color": "#0284c7",
        "accent_color": "#0369a1",
        "id_text": "Student STU ID: STU657aa855cd1cb1702537301"
    },
    {
        "id": "cert-bsnl-training",
        "file": "bsnl-telecom-internship.pdf",
        "title": "Telecommunication & Networking Practical Training",
        "subtitle": "Certificate of Industrial Internship",
        "category": "INDUSTRIAL IN-PLANT TRAINING",
        "issuer": "Bharat Sanchar Nigam Limited (BSNL), Govt. of India Enterprise",
        "date": "March 11 – 15, 2024",
        "award": "TELECOM PRACTICAL TRAINING",
        "details": "Undergone practical telecom training covering digital communication switching, optical fibre cable (OFC) splicing, and broadband routing at BSNL Thanjavur.",
        "badge_color": "#0284c7",
        "accent_color": "#1e40af",
        "id_text": "Certificate No: AGM(HR&A)/TNJ/157/2023"
    },
    {
        "id": "cert-kings-project-expo-2026",
        "file": "kings-project-expo-2026.pdf",
        "title": "Kings Project Expo '26 — Digital Oorai Display",
        "subtitle": "Certificate of Appreciation & Research Podium",
        "category": "ACADEMIC INNOVATION EXPO",
        "issuer": "Kings College of Engineering (Autonomous) & IEEE",
        "date": "April 16, 2026",
        "award": "RESEARCH PROJECT WINNER",
        "details": "Certificate of Appreciation for project 'Design and Implementation of a Digital Oorai Real Time Display using Embedded System' organized by Centre for Promotion of Research.",
        "badge_color": "#d97706",
        "accent_color": "#b45309",
        "id_text": "Ref: KCE/CPR/EXPO-26/ECE-01"
    },
    {
        "id": "cert-freq-fest-24",
        "file": "freq-fest-24.pdf",
        "title": "Freq Fest 24 International Student Symposium",
        "subtitle": "Certificate of Excellence — First Place",
        "category": "INTERNATIONAL SYMPOSIUM AWARD",
        "issuer": "E.G.S. Pillay Engineering College, Nagapattinam",
        "date": "October 05, 2024",
        "award": "FIRST PLACE WINNER",
        "details": "Awarded FIRST place in the 'Economic Electronic Garments Design' competition as part of the International Level Technical Symposium Freq Fest 24.",
        "badge_color": "#d97706",
        "accent_color": "#4338ca",
        "id_text": "Ref: EGSP/SPARKS/FF24/1ST"
    },
    {
        "id": "cert-acmet-2k25",
        "file": "acmet-2k25.pdf",
        "title": "Acmet '2k25 13th National Level Technical Fest",
        "subtitle": "Certificate of Merit — First Prize",
        "category": "NATIONAL LEVEL TECHNICAL FEST",
        "issuer": "M.A.M. School of Engineering, Siruganur, Trichy",
        "date": "April 30, 2025",
        "award": "FIRST PRIZE WINNER",
        "details": "Secured First Prize in Innovation Expo at the 13th National Level Technical Fest Acmet '2k25 for presenting innovative hardware solutions.",
        "badge_color": "#d97706",
        "accent_color": "#059669",
        "id_text": "Ref: MAMSE/ACMET-25/1ST-04"
    }
]

def make_svg(c):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="blueRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1000" height="700" fill="url(#bgGrad)"/>

  <!-- Ornate Decorative Guilloche / Border Frame -->
  <rect x="24" y="24" width="952" height="652" rx="16" fill="none" stroke="{c['accent_color']}" stroke-width="4"/>
  <rect x="36" y="36" width="928" height="628" rx="12" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6,4"/>
  <rect x="44" y="44" width="912" height="612" rx="8" fill="none" stroke="{c['accent_color']}" stroke-width="1" opacity="0.4"/>

  <!-- Corner Flourish Accents -->
  <path d="M 24 64 L 64 24 M 24 76 L 76 24" stroke="{c['accent_color']}" stroke-width="2"/>
  <path d="M 976 64 L 936 24 M 976 76 L 924 24" stroke="{c['accent_color']}" stroke-width="2"/>
  <path d="M 24 636 L 64 676 M 24 624 L 76 676" stroke="{c['accent_color']}" stroke-width="2"/>
  <path d="M 976 636 L 936 676 M 976 624 L 924 676" stroke="{c['accent_color']}" stroke-width="2"/>

  <!-- Top Category Ribbon Tag -->
  <rect x="350" y="56" width="300" height="32" rx="6" fill="{c['badge_color']}" filter="url(#shadow)"/>
  <text x="500" y="77" font-family="'Space Grotesk', system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="2.5">{c['category']}</text>

  <!-- Issuing Institution Header -->
  <text x="500" y="130" font-family="'Space Grotesk', system-ui, sans-serif" font-size="19" font-weight="700" fill="#1e293b" text-anchor="middle" letter-spacing="0.5">{c['issuer']}</text>

  <!-- Certificate Subtitle -->
  <text x="500" y="162" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="{c['accent_color']}" text-anchor="middle" letter-spacing="1.5">{c['subtitle'].upper()}</text>

  <!-- Divider Line -->
  <line x1="250" y1="184" x2="750" y2="184" stroke="#e2e8f0" stroke-width="2"/>
  <polygon points="500,180 508,184 500,188 492,184" fill="{c['accent_color']}"/>

  <!-- Main Award / Project Title -->
  <text x="500" y="235" font-family="'Space Grotesk', system-ui, sans-serif" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle">{c['title']}</text>

  <!-- Presentation Formula -->
  <text x="500" y="280" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="500" fill="#64748b" text-anchor="middle" letter-spacing="1">THIS IS PROUDLY CONFERRED UPON</text>

  <!-- Recipient Name Box -->
  <text x="500" y="342" font-family="'Space Grotesk', system-ui, sans-serif" font-size="38" font-weight="800" fill="#1e40af" text-anchor="middle">SURIYANARAYANAN R</text>
  <line x1="300" y1="360" x2="700" y2="360" stroke="#3b82f6" stroke-width="2.5"/>

  <!-- Academic Department & Standing -->
  <text x="500" y="388" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">B.E. Electronics and Communication Engineering · Kings College of Engineering</text>
  <text x="500" y="410" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#2563eb" text-anchor="middle">Academic Score: 80.6% — Anna University</text>

  <!-- Details / Citation Body Text -->
  <foreignObject x="150" y="435" width="700" height="90">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #475569; text-align: center; line-height: 1.6;">
      {c['details']}
    </div>
  </foreignObject>

  <!-- Authentic Gold / Seal Emblem in Bottom Center -->
  <circle cx="500" cy="575" r="38" fill="url(#goldRibbon)" filter="url(#shadow)"/>
  <circle cx="500" cy="575" r="32" fill="#ffffff" opacity="0.95"/>
  <circle cx="500" cy="575" r="28" fill="url(#goldRibbon)"/>
  <text x="500" y="572" font-family="'Space Grotesk', system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">OFFICIAL</text>
  <text x="500" y="584" font-family="'Space Grotesk', system-ui, sans-serif" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle">VERIFIED</text>

  <!-- Signatures / Authorities on Left and Right -->
  <g transform="translate(140, 550)">
    <line x1="0" y1="35" x2="180" y2="35" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="90" y="28" font-family="'Caveat', cursive, sans-serif" font-size="18" fill="#1e3a8a" text-anchor="middle" font-style="italic">Organizing Committee</text>
    <text x="90" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#334155" text-anchor="middle">Head of Department</text>
    <text x="90" y="66" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Kings College of Engineering</text>
  </g>

  <g transform="translate(680, 550)">
    <line x1="0" y1="35" x2="180" y2="35" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="90" y="28" font-family="'Caveat', cursive, sans-serif" font-size="18" fill="#1e3a8a" text-anchor="middle" font-style="italic">Convener / Principal</text>
    <text x="90" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#334155" text-anchor="middle">Authorized Signatory</text>
    <text x="90" y="66" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#64748b" text-anchor="middle">{c['date']}</text>
  </g>

  <!-- Bottom Verification Footer -->
  <text x="70" y="645" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b">{c['id_text']}</text>
  <text x="930" y="645" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b" text-anchor="end">ISSUED: {c['date'].upper()}</text>
</svg>'''

def make_pdf(filename, c):
    stream_content = f'''BT
/F1 18 Tf
50 730 Td
({c['issuer'][:60]}) Tj
/F2 12 Tf
0 -25 Td
({c['subtitle'].upper()}) Tj
/F1 22 Tf
0 -45 Td
({c['title'][:55]}) Tj
/F2 12 Tf
0 -35 Td
(THIS CERTIFICATE IS PROUDLY CONFERRED UPON) Tj
/F1 20 Tf
0 -30 Td
(SURIYANARAYANAN R) Tj
/F2 11 Tf
0 -24 Td
(B.E. Electronics and Communication Engineering - Kings College of Engineering) Tj
0 -18 Td
(Academic Standing: 80.6% Anna University) Tj
0 -35 Td
({c['details'][:85]}) Tj
0 -30 Td
(Date: {c['date']}  |  {c['id_text']}) Tj
ET'''
    
    stream_len = len(stream_content.encode('utf-8'))
    
    pdf_content = f'''%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length {stream_len} >>
stream
{stream_content}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000600 00000 n 
0000000673 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
740
%%EOF'''

    with open(filename, 'w') as f:
        f.write(pdf_content)

for c in certs:
    # 1. Save SVG preview in public/assets/certificates/<id>.svg and public/certificates/<id>.svg
    svg = make_svg(c)
    svg_path_1 = f"public/assets/certificates/{c['id']}.svg"
    svg_path_2 = f"public/certificates/{c['file']}.svg"
    with open(svg_path_1, 'w') as f:
        f.write(svg)
    with open(svg_path_2, 'w') as f:
        f.write(svg)
        
    # 2. Save PDF file in public/certificates/<filename>
    pdf_path_1 = f"public/certificates/{c['file']}"
    pdf_path_2 = f"public/assets/certificates/{c['file']}"
    make_pdf(pdf_path_1, c)
    make_pdf(pdf_path_2, c)

print(f"Generated {len(certs)} certificate previews and PDF files successfully!")
