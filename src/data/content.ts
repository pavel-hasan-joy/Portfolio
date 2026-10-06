export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "AI & Geospatial" | "Full-Stack" | "Computer Vision";
  summary: string;
  role: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  impact: string;
  keyFeatures: string[];
  toolsUsed: string[];
  accentColor: string;
}

export interface EducationExperience {
  period: string;
  title: string;
  organization: string;
  location: string;
  type: "education" | "experience" | "achievement";
  description: string;
  bullets: string[];
  badge?: string;
}

export interface SiteContent {
  personal: {
    name: string;
    bengaliName: string;
    roles: string[];
    tagline: string;
    oneLineValueProp: string;
    location: string;
    institution: string;
    degree: string;
    avatarUrl: string;
    availability: string;
    status: string;
    responseTime: string;
    phone?: string;
    summary?: string;
    bioParagraphs: string[];
  };
  socials: {
    github: string;
    linkedin: string;
    email: string;
    phone?: string;
  };
  cv: {
    fileName: string;
    filePath: string;
    isAvailable: boolean; // Set to true when PDF is placed in public/cv/
    placeholderNotice: string;
    downloadFallbackUrl: string;
  };
  techStack: {
    category: string;
    description: string;
    skills: {
      name: string;
      level: string;
      description: string;
      icon: string;
    }[];
  }[];
  stats: {
    label: string;
    value: number;
    suffix: string;
    description: string;
  }[];
  projects: Project[];
  timeline: EducationExperience[];
  navigation: {
    name: string;
    href: string;
  }[];
}

export const siteContent: SiteContent = {
  personal: {
    name: "Pavel Hasan Joy",
    bengaliName: "পাবেল হাসান জয়",
    roles: [
      "Aspiring Full-Stack Software Engineer",
      "Aspiring ML & AI Engineer",
    ],
    tagline: "Building resilient systems with C, C++, Java, and modern architectures.",
    oneLineValueProp: "Crafting impactful software solutions and intelligent algorithms from rigorous first principles.",
    location: "Mohammadi Homes, Mohammadpur, Dhaka 1207, Bangladesh",
    institution: "University of Liberal Arts Bangladesh (ULAB)",
    degree: "B.Sc. in Computer Science & Engineering (CSE)",
    avatarUrl: "https://avatars.githubusercontent.com/u/285468907?v=4",
    availability: "Open to Internships & Engineering Roles",
    status: "Actively Coding & Problem Solving",
    responseTime: "Responds within 24 hours",
    phone: "+8801342182616",
    summary: "Accomplished Computer Science undergraduate at ULAB with an extensive background in software development, specializing in Full-Stack Architecture and Machine Learning applications. Successfully engineered complex software solutions, from geospatial satellite analytics to browser-based biometric AI systems. Adept at C, C++, Java, Git, and GitHub with a strong focus on delivering clean, maintainable, and high-impact code.",
    bioParagraphs: [
      "Accomplished Computer Science undergraduate at ULAB with an extensive background in software development, specializing in Full-Stack Architecture and Machine Learning applications.",
      "Successfully engineered complex software solutions, from geospatial satellite analytics to browser-based biometric AI systems. Adept at C, C++, Java, Git, and GitHub with a strong focus on delivering clean, maintainable, and high-impact code.",
      "My engineering foundation is built on deep algorithmic thinking and object-oriented systems design. From building 3D climate intelligence tools powered by NASA satellite datasets to developing campus networking portals and browser-based computer vision applications, I love building purposeful, high-performance technology.",
    ],
  },

  socials: {
    github: "https://github.com/pavel-hasan-joy",
    linkedin: "https://www.linkedin.com/in/pavel-hasan-joy-ulab262014103",
    email: "pavel.hasan.cse@ulab.edu.bd",
    phone: "+8801342182616",
  },

  cv: {
    fileName: "pavel-hasan-joy-CV.pdf",
    filePath: "/cv/pavel-hasan-joy-CV.pdf",
    isAvailable: true, // Official CV PDF generated and active in public/cv/
    placeholderNotice: "My official CV document is ready for preview and instant download.",
    downloadFallbackUrl: "/cv/pavel-hasan-joy-CV.pdf",
  },

  // Strictly user-specified core tech stack: C, C++, Java, Git, GitHub
  techStack: [
    {
      category: "Core Programming Languages",
      description: "Foundational and systems-level programming languages powering data structures and algorithms.",
      skills: [
        {
          name: "C",
          level: "Proficient",
          description: "Low-level memory management, pointers, modular code architecture, and foundational problem solving.",
          icon: "Binary",
        },
        {
          name: "C++",
          level: "Advanced",
          description: "Object-oriented programming (OOP), Standard Template Library (STL), memory safety, and high-performance computation.",
          icon: "Cpu",
        },
        {
          name: "Java",
          level: "Proficient",
          description: "Robust OOP architecture, design patterns, multithreading, enterprise software design, and clean abstractions.",
          icon: "Coffee",
        },
      ],
    },
    {
      category: "Version Control & Collaboration",
      description: "Industry-standard version control and collaborative development workflows.",
      skills: [
        {
          name: "Git",
          level: "Proficient",
          description: "Distributed version control, atomic commits, branching strategies, rebasing, and merge conflict resolution.",
          icon: "GitBranch",
        },
        {
          name: "GitHub",
          level: "Proficient",
          description: "Repository architecture, GitHub Actions, project boards, pull request reviews, and open-source collaboration.",
          icon: "Github",
        },
      ],
    },
  ],

  stats: [
    {
      label: "Core Languages",
      value: 3,
      suffix: " Core",
      description: "C, C++, and Java proficiency",
    },
    {
      label: "Flagship Projects",
      value: 3,
      suffix: "+",
      description: "End-to-end built & deployed applications",
    },
    {
      label: "NASA Challenge",
      value: 2026,
      suffix: "",
      description: "Global Space Apps Participant",
    },
    {
      label: "Code Commits",
      value: 100,
      suffix: "+",
      description: "Continuous version-controlled shipping",
    },
  ],

  projects: [
    {
      slug: "climate-lens",
      title: "Climate Lens — Bangladesh",
      tagline: "3D spatio-temporal geospatial climate observatory grounded in NASA Earth science data.",
      category: "AI & Geospatial",
      summary: "An interactive 3D climate observatory tracking rainfall, maximum temperature, and root-zone soil moisture across all 64 districts of Bangladesh using NASA POWER, CMIP6 projections, and SEDAC population datasets.",
      role: "Lead Developer & System Architect",
      githubUrl: "https://github.com/pavel-hasan-joy/Climate-Lens",
      liveUrl: "https://climate-lens.vercel.app", // optional demo
      featured: true,
      accentColor: "#10b981",
      problem: "Bangladesh is on the frontlines of climate volatility, but critical satellite metrics and CMIP6 climate models are inaccessible to agricultural extension officers, researchers, and local planners.",
      solution: "Built a browser-based 3D geospatial platform utilizing geoBoundaries, NASA POWER daily data, and Mann-Kendall trend detection to render Past (2001–2010), Now, and Future (2040–2050) horizons with bilingual (Bangla/English) agro-climatic support.",
      impact: "Enables instant district-level climate anomaly detection, risk assessment across Aman, Aus, and Boro rice crop seasons, and public accessibility through Bengali localization.",
      keyFeatures: [
        "3D interactive district maps with multi-metric visual extrusion",
        "NASA POWER, NASA GIBS, and CMIP6 SSP2-4.5 / SSP5-8.5 ensemble projections",
        "Agro-climatic crop calendar intelligence for Bangladesh staple rice crops",
        "Bilingual support with native Bengali numerals (০-৯) and localization",
      ],
      toolsUsed: ["TypeScript", "Next.js", "NASA POWER API", "geoBoundaries", "Tailwind CSS"],
    },
    {
      slug: "ulab-setu",
      title: "ULAB Setu",
      tagline: "Student-Alumni-Teacher networking & career advancement ecosystem.",
      category: "Full-Stack",
      summary: "A role-based networking and job portal platform created specifically for the University of Liberal Arts Bangladesh community, bridging graduating students with alumni and verified job opportunities.",
      role: "Full-Stack Software Engineer",
      githubUrl: "https://github.com/pavel-hasan-joy/ulab-setu",
      liveUrl: "https://ulab-setu.vercel.app",
      featured: true,
      accentColor: "#06b6d4",
      problem: "University students often struggle to find authentic mentorship, alumni referrals, and localized job opportunities due to fragmented communication channels.",
      solution: "Engineered an integrated platform featuring verified alumni approval gates, role-based dashboards, peer-to-peer messaging, and live job aggregation.",
      impact: "Provides students with direct access to verified alumni jobs across Bangladesh and remote markets, with privacy-first contact visibility controls.",
      keyFeatures: [
        "Multi-role RBAC architecture (Student, Alumni, Teacher, Alumni Office Admin)",
        "Aggregated live job listings via Careerjet API and Himalayas API",
        "Community notice board and real-time direct messaging",
        "Next.js 16 App Router + React 19 + Prisma ORM database pipeline",
      ],
      toolsUsed: ["Next.js 16", "React 19", "Prisma", "TypeScript", "Tailwind CSS"],
    },
    {
      slug: "shield-biometric-scanner",
      title: "S.H.I.E.L.D. Biometric Scanner",
      tagline: "Real-time in-browser facial detection & recognition with JARVIS HUD feedback.",
      category: "Computer Vision",
      summary: "A client-side biometric security web application inspired by Marvel's S.H.I.E.L.D. HUD. Executes real-time facial landmark detection and 128-vector facial descriptor matching directly in the browser.",
      role: "AI & Frontend Developer",
      githubUrl: "https://github.com/pavel-hasan-joy/Face-idntification",
      featured: true,
      accentColor: "#6366f1",
      problem: "Traditional biometric AI systems rely heavily on opaque backend servers, increasing privacy risks and latency for lightweight client devices.",
      solution: "Leveraged browser-based neural network models (SSD MobileNet V1 and 68-point landmarks) to perform client-side biometric enrollment and matching with zero server upload.",
      impact: "Demonstrates high-speed client-side computer vision inference paired with Web Speech API audio synthesis for interactive user feedback.",
      keyFeatures: [
        "In-browser 68-point facial landmark contour mapping",
        "128-dimensional facial descriptor vector calculation for target matching",
        "Futuristic laser scanning animations and responsive canvas HUD overlay",
        "Web Speech API (speechSynthesis) for JARVIS-style audio readouts",
      ],
      toolsUsed: ["JavaScript (ES6+)", "face-api.js", "TensorFlow.js", "HTML5 MediaDevices", "Web Speech API"],
    },
  ],

  timeline: [
    {
      period: "2023 — Present",
      title: "B.Sc. in Computer Science & Engineering",
      organization: "University of Liberal Arts Bangladesh (ULAB)",
      location: "Dhaka, Bangladesh",
      type: "education",
      description: "Rigorous academic curriculum covering core Computer Science, Object-Oriented Programming (OOP) in C++ and Java, Data Structures & Algorithms, Database Systems, and Discrete Mathematics.",
      bullets: [
        "Hands-on coursework in C, C++, and Java OOP principles and software design patterns.",
        "Active member of university programming and technological initiatives.",
        "Lead developer of ULAB Setu, the university's student-alumni networking portal.",
      ],
      badge: "Undergraduate Degree",
    },
    {
      period: "2026",
      title: "4th Position — ULAB CPC Hackathon",
      organization: "ULAB Computer Programming Club",
      location: "Dhaka, Bangladesh",
      type: "achievement",
      description: "Secured 4th position at the university hackathon by engineering Campus Safety, a real-time web platform built to assist students and emergency coordinators during campus emergencies.",
      bullets: [
        "Rapid prototyping and full-stack development within competitive hackathon deadlines.",
        "Emergency alert routing, incident mapping, and responsive student UI.",
        "Awarded 4th place recognition by ULAB faculty and programming judges.",
      ],
      badge: "Hackathon Award",
    },
    {
      period: "2026",
      title: "NASA Space Apps Challenge Participant",
      organization: "NASA Space Apps Challenge",
      location: "Global / Bangladesh",
      type: "achievement",
      description: "Architected and delivered Climate Lens — Bangladesh, a 3D spatio-temporal geospatial climate observatory integrating NASA Earth observations and CMIP6 climate model projections.",
      bullets: [
        "Processed multi-decadal NASA POWER and MODIS satellite data across 64 administrative districts.",
        "Implemented agro-climatic rice calendar algorithms to evaluate crop risk indicators.",
        "Delivered a bilingual interface with full native Bengali numeral translation.",
      ],
      badge: "Global Hackathon",
    },
    {
      period: "2023 — 2024",
      title: "Higher Secondary Certificate (HSC) — Science",
      organization: "Naogaon Govt. College",
      location: "Naogaon, Rajshahi, Bangladesh",
      type: "education",
      description: "Completed Higher Secondary Certificate in Science with outstanding academic standing (CGPA: 4.50).",
      bullets: [
        "Rigorous coursework in Mathematics, Physics, and Information & Communication Technology.",
        "Active analytical problem solving and scientific foundation.",
      ],
      badge: "CGPA 4.50",
    },
    {
      period: "2021 — 2022",
      title: "Secondary School Certificate (SSC) — Science",
      organization: "Tapir Bari Ansar High School",
      location: "Gazipur, Dhaka, Bangladesh",
      type: "education",
      description: "Graduated Secondary School Certificate in Science with maximum academic distinction (CGPA: 5.00 / Golden GPA).",
      bullets: [
        "Perfect 5.00 GPA with core concentration in Science and Mathematics.",
      ],
      badge: "CGPA 5.00",
    },
  ],

  navigation: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
  ],
};
