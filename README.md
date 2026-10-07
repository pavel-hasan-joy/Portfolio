# 🌟 Pavel Hasan Joy — Personal Portfolio Website

[![Live Deployment](https://img.shields.io/badge/Live_Site-portfolio--sandy--psi--96.vercel.app-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-sandy-psi-96.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, high-performance personal portfolio website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Crafted with clean architecture, interactive tactile animations, in-browser biometric AI, and an integrated full-screen PDF canvas CV viewer.

🌐 **Production URL:** [https://portfolio-sandy-psi-96.vercel.app/](https://portfolio-sandy-psi-96.vercel.app/)

---

## 👤 About the Engineer

**Pavel Hasan Joy (পাবেল হাসান জয়)**  
*Aspiring Full-Stack Software Engineer & ML/AI Engineer*  
Undergraduate in **Computer Science & Engineering (B.Sc. CSE)** at the **University of Liberal Arts Bangladesh (ULAB)** (2026 — Present).

> *"Accomplished Computer Science undergraduate at ULAB with an extensive background in software development, specializing in Full-Stack Architecture and Machine Learning applications. Successfully engineered complex software solutions, from geospatial satellite analytics to browser-based biometric AI systems. Adept at C, C++, Java, Git, and GitHub with a strong focus on delivering clean, maintainable, and high-impact code."*

- 📍 **Location:** Mohammadi Homes, Mohammadpur, Dhaka 1207, Bangladesh
- 📧 **Official Email:** [pavel.hasan.cse@ulab.edu.bd](mailto:pavel.hasan.cse@ulab.edu.bd)
- 💼 **LinkedIn:** [linkedin.com/in/pavel-hasan-joy-ulab262014103](https://www.linkedin.com/in/pavel-hasan-joy-ulab262014103)
- 🐙 **GitHub:** [github.com/pavel-hasan-joy](https://github.com/pavel-hasan-joy)
- 🌐 **Facebook:** [facebook.com/pavelhasanjoy1](https://www.facebook.com/pavelhasanjoy1)

---

## 🚀 Flagship Projects Featured

### 1. [Climate Lens — Bangladesh](https://github.com/pavel-hasan-joy/Climate-Lens) *(NASA Space Apps Challenge 2026)*
- **Domain:** AI & Spatio-Temporal Geospatial Intelligence
- **Summary:** Interactive 3D climate observatory tracking precipitation anomalies, maximum temperature deviations, and root-zone soil moisture across all 64 administrative districts of Bangladesh.
- **Data Sources:** NASA POWER daily satellite agro-climatology, NASA GIBS, and CMIP6 SSP2-4.5 / SSP5-8.5 ensemble climate projections.
- **Key Features:** District-level 3D visual extrusion, Mann-Kendall trend detection, crop calendar risk matrices for Aman, Aus, and Boro rice harvests, and native Bengali numeral localization (০-৯).

### 2. [ULAB Setu](https://github.com/pavel-hasan-joy/ulab-setu) *(Campus Career & Networking Ecosystem)*
- **Domain:** Full-Stack Web Application
- **Summary:** A student-alumni networking and job portal platform created specifically for the University of Liberal Arts Bangladesh community, bridging graduating seniors with alumni mentors and verified job opportunities.
- **Key Features:** Multi-role RBAC architecture (Student, Alumni, Teacher, Admin), live aggregated job listings via Careerjet & Himalayas APIs, real-time messaging, and privacy-first contact visibility controls.

### 3. [S.H.I.E.L.D. Biometric Scanner](https://github.com/pavel-hasan-joy/Face-idntification)
- **Domain:** Client-Side Computer Vision & Biometric HUD
- **Summary:** An in-browser biometric security HUD inspired by Marvel's S.H.I.E.L.D. JARVIS interface.
- **Key Features:** Real-time 68-point facial landmark contour mapping, 128-dimensional facial descriptor vector calculation for target matching, zero server uploads (100% private client-side inference), and Web Speech API audio feedback.

---

## 🛠️ Core Tech Stack

- **Foundational Languages:** `C`, `C++`, `Java`
- **Version Control & Collaboration:** `Git`, `GitHub`
- **Web App Architecture:** `Next.js 16` (Turbopack, App Router), `React 19`, `TypeScript`
- **Styling & Design System:** `Tailwind CSS v4`, CSS Custom Properties, Glassmorphism, WCAG AAA High-Contrast Light Mode
- **Motion & Interactions:** `Motion` (`motion/react`), `GSAP`, `canvas-confetti`
- **PDF Engine:** `react-pdf` (`pdfjs-dist`) with custom `pdf-lib` vector generator

---

## 🌟 Key Application Features

- 🌓 **Dual Theme Engine:** Dark Obsidian mode by default with an instant, high-contrast Light mode toggle.
- 📄 **Curriculum Vitae Viewer:** Deep-linkable `#cv` modal rendering the official vector PDF on an interactive canvas with zoom controls and 1-click download.
- ⌨️ **Command Palette (`Cmd/Ctrl + K`):** Quick keyboard navigation, section shortcuts, theme toggling, and instant email/phone copying.
- 📬 **Interactive Contact Form:** Validated via `react-hook-form` and `zod` with hidden honeypot spam protection and automated direct email routing.
- 📱 **100% Responsive Design:** Optimized for mobile phones, tablets, laptops, and ultra-wide desktop displays.

---

## 📁 Repository Structure

```
Portfolio/
├── public/
│   ├── cv/
│   │   ├── pavel-hasan-joy-CV.pdf  # Official generated vector CV
│   │   └── README.md
│   └── ...                         # Static assets & icons
├── scripts/
│   └── generate-cv-pdf.mjs         # Vector PDF generation script (pdf-lib)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/route.ts    # Validated contact form endpoint
│   │   ├── projects/[slug]/        # Dynamic case study detail routes
│   │   ├── globals.css             # Theme tokens & contrast overrides
│   │   ├── layout.tsx              # SEO metadata, OpenGraph, JSON-LD
│   │   ├── not-found.tsx           # Custom 404 error page
│   │   └── page.tsx                # Master one-page layout
│   ├── components/
│   │   ├── CommandPalette.tsx      # Cmd+K search & action drawer
│   │   ├── CustomCursor.tsx        # Spring physics desktop cursor
│   │   ├── CvModal.tsx             # Canvas CV viewer modal
│   │   ├── Icons.tsx               # Scalable SVG brand icons
│   │   ├── InteractiveBackground.tsx # Ambient canvas constellation grid
│   │   ├── IntroLoader.tsx         # Performance-optimized initial loader
│   │   ├── Navbar.tsx              # Sticky blur navigation header
│   │   ├── PdfCanvasViewer.tsx     # react-pdf document canvas engine
│   │   ├── ScrollProgressBar.tsx   # Top scroll reading progress indicator
│   │   ├── SmoothScroll.tsx        # Lenis smooth scrolling orchestrator
│   │   └── ThemeProvider.tsx       # Dark & light theme state manager
│   ├── data/
│   │   └── content.ts              # ⭐ Single Source of Truth for all data
│   ├── lib/
│   │   └── utils.ts                # Tailwind class utility (clsx + twMerge)
│   └── sections/
│       ├── HeroSection.tsx         # Hero header, typewriter role, socials
│       ├── AboutSection.tsx        # Bio, stats, education, certifications
│       ├── SkillsSection.tsx       # Core languages & version control cards
│       ├── ProjectsSection.tsx     # Filterable project showcase cards
│       ├── TimelineSection.tsx     # Milestones, hackathons, academic record
│       ├── ContactSection.tsx      # Channels, phone, location & email form
│       └── Footer.tsx              # Back-to-top & footer links
├── package.json
└── tsconfig.json
```

---

## 💻 Local Development Setup

To run this project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/pavel-hasan-joy/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Typecheck

```bash
# Typecheck
npx tsc --noEmit

# Production Build
npm run build
```

---

## 📜 License

Created and maintained by **Pavel Hasan Joy**. Licensed under the [MIT License](LICENSE).
