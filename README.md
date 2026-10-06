# 🌟 Pavel Hasan Joy — Personal Portfolio Website

A modern, high-performance portfolio website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed as a tactile, web-app-like digital presence showcasing real-world software engineering, computer vision, and geospatial climate systems.

---

## 🚀 Live Demo & Links
- **Local Dev Server:** `http://localhost:3000`
- **GitHub:** [github.com/pavel-hasan-joy](https://github.com/pavel-hasan-joy)
- **LinkedIn:** [linkedin.com/in/pavel-hasan-joy-ulab262014103](https://www.linkedin.com/in/pavel-hasan-joy-ulab262014103)

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router, Turbopack, SSG + Server Actions)
- **UI & Styling:** Tailwind CSS v4, custom CSS design tokens, Glassmorphism, CSS Variables
- **Animations & Micro-interactions:** Motion (`motion/react`), GSAP, Canvas Confetti
- **Smooth Scrolling:** Lenis smooth scrolling synced with GSAP ticker & modal lock
- **CV Viewer:** In-page full-screen canvas PDF viewer powered by `react-pdf` (`pdfjs-dist`) with `#cv` deep linking and fallback state
- **Forms & Validation:** `react-hook-form` + `zod` with honeypot spam filtering & Resend API readiness
- **Command Palette:** Keyboard-first shortcut (`Cmd/Ctrl + K`) to search, navigate, toggle themes, and copy credentials

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   └── cv/
│       ├── pavel-hasan-joy-CV.pdf  # Place your CV PDF here!
│       └── README.md
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/route.ts    # Validated contact endpoint
│   │   ├── projects/[slug]/        # Detailed Case Study pages
│   │   ├── globals.css             # Design tokens & color system
│   │   ├── layout.tsx              # SEO metadata & JSON-LD schema
│   │   ├── not-found.tsx           # Custom 404 page
│   │   └── page.tsx                # Main single-page web app
│   ├── components/
│   │   ├── CommandPalette.tsx      # Cmd+K quick navigation
│   │   ├── CustomCursor.tsx        # Spring cursor for desktop
│   │   ├── CvModal.tsx             # Fullscreen in-page modal
│   │   ├── Icons.tsx               # Scalable SVG brand icons
│   │   ├── InteractiveBackground.tsx # Ambient canvas grid
│   │   ├── IntroLoader.tsx         # Skippable session intro loader
│   │   ├── Navbar.tsx              # Sticky dynamic blur navbar
│   │   ├── PdfCanvasViewer.tsx     # Canvas react-pdf renderer
│   │   ├── ScrollProgressBar.tsx   # Top viewport scroll progress
│   │   ├── SmoothScroll.tsx        # Lenis + GSAP synchronization
│   │   └── ThemeProvider.tsx       # Dark & light theme toggle
│   ├── data/
│   │   └── content.ts              # ⭐ SINGLE SOURCE OF TRUTH (All content)
│   ├── lib/
│   │   └── utils.ts                # Class merging utility (cn)
│   └── sections/
│       ├── AboutSection.tsx        # Bio & live count-up stats
│       ├── ContactSection.tsx      # Form with honeypot & copy email
│       ├── Footer.tsx              # Links & back-to-top
│       ├── HeroSection.tsx         # Name reveal & primary CTAs
│       ├── ProjectsSection.tsx     # Filterable project showcase
│       ├── SkillsSection.tsx       # C, C++, Java, Git, GitHub matrix
│       └── TimelineSection.tsx     # Education & NASA Space Apps
└── package.json
```

---

## ✏️ How to Edit & Customize

### 1. Edit Any Text or Content (Zero Component Editing Needed!)
All site content is centralized in a single file:
👉 [`src/data/content.ts`](src/data/content.ts)

You can edit:
- Your name, titles, bio, and value proposition
- Tech stack proficiencies and descriptions
- Projects list, summaries, GitHub links, and live demos
- Academic milestones and hackathon achievements
- Contact email and social URLs

### 2. How to Add Your Official CV PDF
As requested, the CV option is currently in a graceful placeholder state. When you are ready:
1. Place your CV PDF file into the `public/cv/` directory with the exact name:
   ```bash
   public/cv/pavel-hasan-joy-CV.pdf
   ```
2. Open [`src/data/content.ts`](src/data/content.ts) and set:
   ```ts
   cv: {
     isAvailable: true,
     ...
   }
   ```
3. That's it! Clicking **"View CV"** or visiting `/#cv` will immediately render the document in the canvas viewer with zoom and page navigation.

### 3. How to Update Your Profile Photo
- By default, your official GitHub avatar is loaded:
  `https://avatars.githubusercontent.com/u/285468907?v=4`
- To use a local image, save your photo into `public/avatar.jpg` and update `avatarUrl` in `src/data/content.ts`:
  ```ts
  avatarUrl: "/avatar.jpg"
  ```

### 4. Configure Email Delivery (Optional)
Create a `.env.local` file in the root folder:
```env
RESEND_API_KEY=re_your_api_key_here
```
> **Note:** If `RESEND_API_KEY` is not provided, the contact form automatically falls back to your operating system's default email client (`mailto:`) with all fields pre-filled!

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete personal portfolio website"
   git remote add origin https://github.com/pavel-hasan-joy/Portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and import the `Portfolio` repository.
3. Framework preset is automatically detected as **Next.js**.
4. (Optional) Add `RESEND_API_KEY` in Environment Variables.
5. Click **Deploy**!

---

## 📝 Checklist of Pending Items / TODOs
- [ ] Drop `pavel-hasan-joy-CV.pdf` into `public/cv/` once your CV PDF is ready.
- [ ] (Optional) Add `RESEND_API_KEY` in `.env.local` if you wish to receive form submissions via Resend API instead of direct mailto.
