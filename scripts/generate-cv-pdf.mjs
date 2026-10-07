import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89; // A4
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  function checkPageBreak(neededHeight = 40) {
    if (y - neededHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  function drawSectionTitle(title) {
    checkPageBreak(35);
    y -= 14;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: pageWidth - margin, y: y },
      thickness: 0.75,
      color: rgb(0.2, 0.2, 0.2),
    });
    y -= 12;
  }

  function drawWrappedText(text, fontSize = 9.5, font = helvetica, color = rgb(0.2, 0.2, 0.2), lineHeight = 13, indent = 0) {
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
  page.drawText('Pavel Hasan Joy', {
    x: margin,
    y: y,
    size: 22,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  y -= 20;

  // Contact line 1
  const contact1 = '+8801342182616  |  pavel.hasan.cse@ulab.edu.bd  |  linkedin.com/in/pavel-hasan-joy-ulab262014103  |  github.com/pavel-hasan-joy';
  page.drawText(contact1, {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.25, 0.25, 0.25),
  });
  y -= 14;

  // Contact line 2 - Location
  const contact2 = 'Mohammadi Homes, Mohammadpur, Dhaka 1207, Bangladesh';
  page.drawText(contact2, {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 14;

  // OBJECTIVE
  drawSectionTitle('Objective');
  drawWrappedText(
    "I'm Pavel Hasan Joy, a Computer Science & Engineering undergraduate with a clear goal — to become a skilled Full-Stack Software Engineer with a strong focus on frontend & backend development and an AI Engineer.",
    9.5,
    helvetica,
    rgb(0.2, 0.2, 0.2),
    14
  );

  // SUMMARY (Template 2)
  drawSectionTitle('Summary');
  drawWrappedText(
    'Accomplished Computer Science undergraduate at ULAB with an extensive background in software development, specializing in Full-Stack Architecture and Machine Learning applications. Successfully engineered complex software solutions, from geospatial satellite analytics to browser-based biometric AI systems. Adept at C, C++, Java, Git, and GitHub with a strong focus on delivering clean, maintainable, and high-impact code.',
    9.5,
    helvetica,
    rgb(0.2, 0.2, 0.2),
    14
  );

  // EDUCATION
  drawSectionTitle('Education');

  // Degree 1
  page.drawText('B.Sc. in Computer Science & Engineering (CSE)', {
    x: margin,
    y: y,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  const date1 = '2026 – Present';
  page.drawText(date1, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(date1, 9),
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 13;
  page.drawText('University of Liberal Arts Bangladesh (ULAB) - Dhaka, Bangladesh', {
    x: margin,
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.25, 0.25, 0.25),
  });
  y -= 16;

  // Degree 2 - HSC
  page.drawText('HSC in Science', {
    x: margin,
    y: y,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  const date2 = '2023 – 2024';
  page.drawText(date2, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(date2, 9),
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 13;
  page.drawText('Naogaon Govt. College - Naogaon, Rajshahi, Bangladesh', {
    x: margin,
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.25, 0.25, 0.25),
  });
  y -= 12;
  page.drawText('CGPA: 4.50', {
    x: margin,
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.15, 0.15, 0.15),
  });
  y -= 16;

  // Degree 3 - SSC
  page.drawText('SSC in Science', {
    x: margin,
    y: y,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  const date3 = '2021 – 2022';
  page.drawText(date3, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(date3, 9),
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 13;
  page.drawText('Tapir Bari Ansar High School - Gazipur, Dhaka, Bangladesh', {
    x: margin,
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.25, 0.25, 0.25),
  });
  y -= 12;
  page.drawText('CGPA: 5.00', {
    x: margin,
    y: y,
    size: 9,
    font: helveticaBold,
    color: rgb(0.15, 0.15, 0.15),
  });
  y -= 16;

  // SKILLS
  drawSectionTitle('Skills');

  page.drawText('Computer Skills:', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  page.drawText('C programming Language, C++, Java, Git and GitHub', {
    x: margin + 95,
    y: y,
    size: 9.5,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 15;

  page.drawText('Languages:', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  page.drawText('Bangla (Native), English (Professional), Hindi', {
    x: margin + 95,
    y: y,
    size: 9.5,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 15;

  page.drawText('Professional Skills:', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  page.drawText('Problem Solving, Object-Oriented Programming (OOP), Data Structures & Algorithms', {
    x: margin + 95,
    y: y,
    size: 9.5,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 15;

  page.drawText('Soft Skills:', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  drawWrappedText('Teamwork & Collaboration, Effective Communication, Time Management & Prioritization, Adaptability & Fast learner', 9.5, helvetica, rgb(0.2, 0.2, 0.2), 14, 95);

  // CERTIFICATIONS
  drawSectionTitle('Certifications');
  page.drawText('Introduction to AI and Machine Learning on Google Cloud', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 13;
  page.drawText('NetCom Learning', {
    x: margin,
    y: y,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 16;

  // ACHIEVEMENTS
  drawSectionTitle('Achievements & Hackathons');

  // Hackathon 1 - ULAB CPC
  page.drawText('• Hackathon - ULAB Computer Programming Club (15-08-2026)', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 13;
  drawWrappedText(
    'Secured 4th position. Built Campus Safety — a real-time web platform engineered to assist students and emergency responders during campus emergencies.',
    9,
    helvetica,
    rgb(0.25, 0.25, 0.25),
    13,
    12
  );
  y -= 6;

  // Hackathon 2 - NASA Space Apps
  page.drawText('• NASA Space Apps Challenge (2026)', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 13;
  drawWrappedText(
    'Global Hackathon Participant. Engineered Climate Lens — Bangladesh, a 3D spatio-temporal geospatial observatory visualizing climate volatility from NASA satellite observations and CMIP6 climate models.',
    9,
    helvetica,
    rgb(0.25, 0.25, 0.25),
    13,
    12
  );

  const pdfBytes = await pdfDoc.save();
  const outputDir = path.resolve('public', 'cv');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'pavel-hasan-joy-CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF successfully generated at:', outputPath);
}

generateCV().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
