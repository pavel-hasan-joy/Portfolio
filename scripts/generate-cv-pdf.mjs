import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89; // A4
  const margin = 42;
  const contentWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  function checkPageBreak(neededHeight = 35) {
    if (y - neededHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  function drawSectionTitle(title) {
    checkPageBreak(38);
    y -= 14;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 10.5,
      font: helveticaBold,
      color: rgb(0.06, 0.45, 0.42), // Refined teal/emerald brand accent
    });

    // Accent line
    y -= 3.5;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: margin + 45, y: y },
      thickness: 1.5,
      color: rgb(0.06, 0.45, 0.42),
    });
    page.drawLine({
      start: { x: margin + 45, y: y },
      end: { x: pageWidth - margin, y: y },
      thickness: 0.5,
      color: rgb(0.8, 0.83, 0.86),
    });
    y -= 11;
  }

  function drawWrappedText(text, fontSize = 9, font = helvetica, color = rgb(0.2, 0.22, 0.25), lineHeight = 12.5, indent = 0) {
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > contentWidth - indent) {
        checkPageBreak(lineHeight);
        page.drawText(currentLine, {
          x: margin + indent,
          y: y,
          size: fontSize,
          font: font,
          color: color,
        });
        y -= lineHeight;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine.length > 0) {
      checkPageBreak(lineHeight);
      page.drawText(currentLine, {
        x: margin + indent,
        y: y,
        size: fontSize,
        font: font,
        color: color,
      });
      y -= lineHeight;
    }
  }

  // Header - Name
  page.drawText('PAVEL HASAN JOY', {
    x: margin,
    y: y,
    size: 21,
    font: helveticaBold,
    color: rgb(0.08, 0.12, 0.18),
  });
  y -= 16;

  // Title / Target role
  page.drawText('Aspiring Full-Stack Software Engineer & ML/AI Engineer', {
    x: margin,
    y: y,
    size: 10,
    font: helveticaBold,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 15;

  // Contact line 1 (Clean modern layout)
  const contactParts = [
    '+8801342182616',
    'pavel.hasan.cse@ulab.edu.bd',
    'linkedin.com/in/pavel-hasan-joy-ulab262014103',
    'github.com/pavel-hasan-joy',
  ];
  const contactLine = contactParts.join('  |  ');
  page.drawText(contactLine, {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.3, 0.35, 0.4),
  });
  y -= 12;

  // Location
  page.drawText('Mohammadi Homes, Mohammadpur, Dhaka 1207, Bangladesh', {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.4, 0.45, 0.5),
  });
  y -= 10;

  // EXECUTIVE SUMMARY
  drawSectionTitle('Professional Summary');
  drawWrappedText(
    'Undergraduate Computer Science & Engineering student at the University of Liberal Arts Bangladesh (ULAB) with a proven track record of engineering impactful software solutions from first principles. Experienced in building 3D geospatial observatories (NASA Space Apps Challenge), high-performance information retrieval engines with sub-3ms latency, and campus-wide networking portals. Proficient in C, C++, Java, Python, and modern web frameworks (React, Next.js). Known for disciplined algorithmic problem-solving, clean architecture, and rapid adaptability in high-pressure hackathon environments.',
    9,
    helvetica,
    rgb(0.2, 0.22, 0.25),
    13
  );

  // EDUCATION
  drawSectionTitle('Education');

  // ULAB
  page.drawText('B.Sc. in Computer Science & Engineering (CSE)', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const dateULAB = '2026 – Present';
  page.drawText(dateULAB, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(dateULAB, 9),
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.25, 0.3, 0.35),
  });
  y -= 12;
  page.drawText('University of Liberal Arts Bangladesh (ULAB) — Dhaka, Bangladesh', {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.35, 0.4, 0.45),
  });
  y -= 11;
  drawWrappedText('• Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Systems Design, Discrete Mathematics.', 8.5, helvetica, rgb(0.25, 0.28, 0.32), 11.5, 6);
  y -= 4;

  // Naogaon Govt College
  page.drawText('Higher Secondary Certificate (HSC) in Science', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const dateHSC = '2023 – 2024';
  page.drawText(dateHSC, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(dateHSC, 9),
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.25, 0.3, 0.35),
  });
  y -= 12;
  page.drawText('Naogaon Govt. College — Naogaon, Rajshahi, Bangladesh', {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.35, 0.4, 0.45),
  });
  const gpaHSC = 'GPA: 4.50 / 5.00';
  page.drawText(gpaHSC, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(gpaHSC, 8.5),
    y: y,
    size: 8.5,
    font: helveticaBold,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 14;

  // Tapir Bari Ansar High School
  page.drawText('Secondary School Certificate (SSC) in Science', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const dateSSC = '2021 – 2022';
  page.drawText(dateSSC, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(dateSSC, 9),
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.25, 0.3, 0.35),
  });
  y -= 12;
  page.drawText('Tapir Bari Ansar High School — Gazipur, Dhaka, Bangladesh', {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.35, 0.4, 0.45),
  });
  const gpaSSC = 'GPA: 5.00 / 5.00 (Golden)';
  page.drawText(gpaSSC, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(gpaSSC, 8.5),
    y: y,
    size: 8.5,
    font: helveticaBold,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 10;

  // TECHNICAL SKILLS
  drawSectionTitle('Technical Skills & Competencies');

  function drawSkillRow(category, items) {
    checkPageBreak(16);
    page.drawText(category + ':', {
      x: margin,
      y: y,
      size: 8.5,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.22),
    });
    page.drawText(items, {
      x: margin + 115,
      y: y,
      size: 8.5,
      font: helvetica,
      color: rgb(0.25, 0.28, 0.32),
    });
    y -= 13;
  }

  drawSkillRow('Programming Languages', 'C, C++, Java, Python, JavaScript (ES6+), TypeScript');
  drawSkillRow('Web & Frameworks', 'React, Next.js, Node.js, FastAPI, Tailwind CSS, HTML5, CSS3');
  drawSkillRow('Core Engineering', 'Data Structures & Algorithms, Object-Oriented Programming (OOP), REST APIs');
  drawSkillRow('Developer Tools', 'Git, GitHub, VS Code, Linux/Bash, Vercel, npm');
  drawSkillRow('Spoken Languages', 'Bangla (Native), English (Professional Working), Hindi (Conversational)');
  drawSkillRow('Soft Skills', 'Problem Solving, Teamwork & Collaboration, Fast Learner, Time Management');
  y -= 4;

  // PROJECTS
  drawSectionTitle('Featured Engineering Projects');

  // Project 1: Climate Lens
  checkPageBreak(50);
  page.drawText('Climate Lens — 3D NASA Space Apps Climate Observatory', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const link1 = 'github.com/pavel-hasan-joy/Climate-Lens';
  page.drawText(link1, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(link1, 8.5),
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 12;
  page.drawText('Technologies: TypeScript, Next.js, NASA POWER API, geoBoundaries, Tailwind CSS', {
    x: margin,
    y: y,
    size: 8,
    font: helveticaOblique,
    color: rgb(0.35, 0.4, 0.45),
  });
  y -= 11;
  drawWrappedText(
    '• Built an interactive 3D climate observatory web application for the NASA Space Apps Challenge to visualize and analyze multi-decadal global environmental datasets.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  drawWrappedText(
    '• Designed an intuitive 3D spatial user interface delivering real-time insights into climate volatility, rainfall anomalies, and root-zone soil moisture across all 64 districts in Bangladesh.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  y -= 6;

  // Project 2: ULAB Setu
  checkPageBreak(50);
  page.drawText('ULAB Setu — University-Wide Networking & Alumni Portal', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const link2 = 'github.com/pavel-hasan-joy/ulab-setu';
  page.drawText(link2, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(link2, 8.5),
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 12;
  page.drawText('Technologies: Next.js 16, React 19, TypeScript, Prisma ORM, Tailwind CSS', {
    x: margin,
    y: y,
    size: 8,
    font: helveticaOblique,
    color: rgb(0.35, 0.4, 0.45),
  });
  y -= 11;
  drawWrappedText(
    '• Developed a centralized university networking and community portal designed to connect ULAB students, faculty, and alumni on a unified platform.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  drawWrappedText(
    '• Engineered role-based access control (RBAC), academic collaboration feeds, peer-to-peer resource sharing, and verified alumni referral job board integration.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  y -= 6;

  // Project 3: Bangla & Banglish Search Engine
  checkPageBreak(50);
  page.drawText('Bangla & Banglish Search Engine — Information Retrieval Core', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const link3 = 'github.com/pavel-hasan-joy/Bangla-Search-Engine';
  page.drawText(link3, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(link3, 8.5),
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 12;
  page.drawText('Technologies: Python (Standard Library), Algorithms, FastAPI, Information Retrieval, BM25', {
    x: margin,
    y: y,
    size: 8,
    font: helveticaOblique,
    color: rgb(0.35, 0.4, 0.45),
  });
  y -= 11;
  drawWrappedText(
    '• Engineered an ultra-fast phonetic and BM25 search engine from scratch in pure Python standard library with zero external runtime dependencies.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  drawWrappedText(
    '• Implemented 3-tier G2P phonetic hashing, trigram-indexed Damerau-Levenshtein fuzzy matching, and Block-Max WAND dynamic pruning delivering sub-3ms latency over 100,000 documents.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  y -= 6;

  // Project 4: Campus Safety Platform
  checkPageBreak(40);
  page.drawText('Campus Safety — Real-Time Emergency Response Platform', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const link4 = 'github.com/pavel-hasan-joy';
  page.drawText(link4, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(link4, 8.5),
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.06, 0.45, 0.42),
  });
  y -= 12;
  page.drawText('Technologies: JavaScript, React, WebSockets / Real-time APIs, CSS3', {
    x: margin,
    y: y,
    size: 8,
    font: helveticaOblique,
    color: rgb(0.35, 0.4, 0.45),
  });
  y -= 11;
  drawWrappedText(
    '• Engineered a crisis coordination platform during the ULAB CPC Hackathon to assist students and emergency coordinators during campus emergencies.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  drawWrappedText(
    '• Integrated instant SOS alert routing, student status verification, and responsive emergency service locator.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    6
  );
  y -= 6;

  // CERTIFICATIONS
  drawSectionTitle('Certifications');
  checkPageBreak(25);
  page.drawText('Introduction to AI and Machine Learning on Google Cloud', {
    x: margin,
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  const certDate = 'Google Cloud / NetCom Learning';
  page.drawText(certDate, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(certDate, 8.5),
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.35, 0.4, 0.45),
  });
  y -= 14;

  // HONORS & ACHIEVEMENTS
  drawSectionTitle('Honors & Hackathon Achievements');
  checkPageBreak(40);
  page.drawText('• 4th Position — ULAB Computer Programming Club Hackathon (15-08-2026)', {
    x: margin,
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  y -= 11;
  drawWrappedText(
    'Secured 4th position among university engineering teams by designing and deploying Campus Safety, an emergency web platform to help students during critical incidents.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    10
  );
  y -= 6;

  page.drawText('• Global Hackathon Participant — NASA Space Apps Challenge (2026)', {
    x: margin,
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.1, 0.14, 0.2),
  });
  y -= 11;
  drawWrappedText(
    'Architected Climate Lens — Bangladesh, a 3D spatio-temporal geospatial observatory evaluating climate vulnerability from NASA Earth observation satellites and CMIP6 climate models.',
    8.5,
    helvetica,
    rgb(0.22, 0.25, 0.29),
    11.5,
    10
  );

  const pdfBytes = await pdfDoc.save();
  const outputDir = path.resolve('public', 'cv');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'pavel-hasan-joy-CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF successfully generated at:', outputPath, 'Bytes:', pdfBytes.length);
}

generateCV().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
