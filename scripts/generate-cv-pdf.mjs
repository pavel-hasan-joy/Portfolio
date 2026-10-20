import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 Standard Dimensions: 595.28 x 841.89 pt
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 42;

  function drawSectionTitle(title, spaceBefore = 20, spaceAfter = 9) {
    y -= spaceBefore;
    page.drawText(title, {
      x: margin,
      y: y,
      size: 11.5,
      font: helveticaBold,
      color: rgb(0.06, 0.06, 0.06),
    });
    y -= spaceAfter;
  }

  function drawWrappedText(text, fontSize = 9.5, font = helvetica, color = rgb(0.12, 0.12, 0.12), lineHeight = 14, indent = 0, customWidth = contentWidth) {
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > customWidth - indent) {
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
    size: 26,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  y -= 22;

  // Contact line 1
  const contact1Part1 = '+8801342182616 | ';
  const contact1Email = 'pavel.hasan.cse@ulab.edu.bd';
  const contact1Part2 = ' | ';
  const contact1LinkedIn = 'www.linkedin.com/in/pavel-hasan-joy-ulab262014103';
  const contact1Part3 = ' |';

  let curX = margin;
  page.drawText(contact1Part1, { x: curX, y: y, size: 8.8, font: helvetica, color: rgb(0.15, 0.15, 0.15) });
  curX += helvetica.widthOfTextAtSize(contact1Part1, 8.8);

  page.drawText(contact1Email, { x: curX, y: y, size: 8.8, font: helvetica, color: rgb(0.15, 0.35, 0.75) });
  curX += helvetica.widthOfTextAtSize(contact1Email, 8.8);

  page.drawText(contact1Part2, { x: curX, y: y, size: 8.8, font: helvetica, color: rgb(0.15, 0.15, 0.15) });
  curX += helvetica.widthOfTextAtSize(contact1Part2, 8.8);

  page.drawText(contact1LinkedIn, { x: curX, y: y, size: 8.8, font: helvetica, color: rgb(0.15, 0.35, 0.75) });
  curX += helvetica.widthOfTextAtSize(contact1LinkedIn, 8.8);

  page.drawText(contact1Part3, { x: curX, y: y, size: 8.8, font: helvetica, color: rgb(0.15, 0.15, 0.15) });
  y -= 12.5;

  // Contact line 2 - GitHub
  page.drawText('github.com/pavel-hasan-joy', {
    x: margin,
    y: y,
    size: 8.8,
    font: helvetica,
    color: rgb(0.15, 0.35, 0.75),
  });
  y -= 12.5;

  // Contact line 3 - Address
  page.drawText('Mohammadi Homes, Mohammadpur, Dhaka, Dhaka 1207, Bangladesh', {
    x: margin,
    y: y,
    size: 8.8,
    font: helvetica,
    color: rgb(0.25, 0.25, 0.25),
  });
  y -= 9;

  // Horizontal Divider Line below header
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: pageWidth - margin, y: y },
    thickness: 1.4,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 2;

  // OBJECTIVE
  drawSectionTitle('OBJECTIVE', 16, 8);
  drawWrappedText(
    "I'm Pavel Hasan Joy, a Computer Science & Engineering undergraduate with a clear goal - to become a skilled Full-Stack Software Engineer with a strong focus on frontend & backend development And an Ai Engineer.",
    9.5,
    helvetica,
    rgb(0.12, 0.12, 0.12),
    13.8
  );

  // SUMMARY
  drawSectionTitle('SUMMARY', 16, 8);
  drawWrappedText(
    "Dynamic Aspiring Full-Stack Software Engineer & ML/AI Engineer with a strong academic foundation in Computer Science & Engineering at ULAB. Proven track record of engineering impactful software, including a 3D NASA Space Apps climate observatory and a university-wide networking portal. Skilled in C, C++, Java, Git, and GitHub. Known for rigorous problem-solving and the ability to build resilient, scalable systems from first principles.",
    9.5,
    helvetica,
    rgb(0.12, 0.12, 0.12),
    13.8
  );

  // EDUCATION
  drawSectionTitle('EDUCATION', 16, 9);

  // HSC
  const hscTitle = 'HSC in Science — Naogaon Govt. College, Naogaon, Rajshahi, Bangladesh';
  page.drawText(hscTitle, {
    x: margin,
    y: y,
    size: 9.8,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  const hscYears = '2023 – 2024';
  page.drawText(hscYears, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(hscYears, 9.8),
    y: y,
    size: 9.8,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 13;
  page.drawText('GPA: 4.50', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 14;

  // SSC
  const sscTitle = 'SSC in Science — Tapir Bari Ansar High School - Gazipur, Dhaka, Bangladesh';
  page.drawText(sscTitle, {
    x: margin,
    y: y,
    size: 9.8,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  const sscYears = '2021 – 2022';
  page.drawText(sscYears, {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize(sscYears, 9.8),
    y: y,
    size: 9.8,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 13;
  page.drawText('GPA: 5.00', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 7;

  // PROJECTS
  drawSectionTitle('PROJECTS', 16, 9);

  const boxTopY = y;
  const boxPadding = 10;
  const boxWidth = contentWidth;

  const p1Title = 'ULAB Setu — University-Wide Networking Portal';
  const p1Link = 'github.com/pavel-hasan-joy';
  const p1Desc = 'Developed a centralized university networking and community portal designed to connect ULAB students, faculty, and alumni on a unified platform. Engineered features to streamline academic collaboration, campus-wide communication, and peer resource sharing.';

  const p2Title = 'Climate Lens — 3D NASA Space Apps Climate Observatory';
  const p2Link = 'github.com/pavel-hasan-joy';
  const p2Desc = 'Built an interactive 3D climate observatory web application for the NASA Space Apps Challenge to visualize and analyze global environmental datasets. Designed an intuitive interface that delivers real-time spatial insights into climate patterns and ecological changes.';

  const boxHeight = 124;
  const boxBottomY = boxTopY - boxHeight;

  // Card background and border
  page.drawRectangle({
    x: margin,
    y: boxBottomY,
    width: boxWidth,
    height: boxHeight,
    color: rgb(0.99, 0.992, 1.0),
    borderColor: rgb(0.85, 0.88, 0.92),
    borderWidth: 0.8,
  });

  // Left solid blue bar
  page.drawLine({
    start: { x: margin + 1.6, y: boxTopY },
    end: { x: margin + 1.6, y: boxBottomY },
    thickness: 3.8,
    color: rgb(0.12, 0.38, 0.88),
  });

  // Project 1 content
  y = boxTopY - 14;
  page.drawText(p1Title, {
    x: margin + boxPadding + 4,
    y: y,
    size: 9.6,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  page.drawText(p1Link, {
    x: pageWidth - margin - boxPadding - helvetica.widthOfTextAtSize(p1Link, 8.8),
    y: y,
    size: 8.8,
    font: helvetica,
    color: rgb(0.15, 0.35, 0.75),
  });
  y -= 13;

  function drawBoxText(text, fontSize = 9.0, font = helvetica, color = rgb(0.15, 0.15, 0.15), lineHeight = 12.8) {
    const textWidth = boxWidth - (boxPadding * 2) - 8;
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > textWidth) {
        page.drawText(currentLine, {
          x: margin + boxPadding + 4,
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
      page.drawText(currentLine, {
        x: margin + boxPadding + 4,
        y: y,
        size: fontSize,
        font: font,
        color: color,
      });
      y -= lineHeight;
    }
  }

  drawBoxText(p1Desc, 9.0, helvetica, rgb(0.18, 0.18, 0.18), 12.8);

  // Separator between projects
  y -= 3;
  page.drawLine({
    start: { x: margin + boxPadding + 4, y: y },
    end: { x: pageWidth - margin - boxPadding, y: y },
    thickness: 0.5,
    color: rgb(0.88, 0.9, 0.93),
  });
  y -= 12;

  // Project 2 content
  page.drawText(p2Title, {
    x: margin + boxPadding + 4,
    y: y,
    size: 9.6,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  page.drawText(p2Link, {
    x: pageWidth - margin - boxPadding - helvetica.widthOfTextAtSize(p2Link, 8.8),
    y: y,
    size: 8.8,
    font: helvetica,
    color: rgb(0.15, 0.35, 0.75),
  });
  y -= 13;
  drawBoxText(p2Desc, 9.0, helvetica, rgb(0.18, 0.18, 0.18), 12.8);

  // Resume after box
  y = boxBottomY - 6;

  // SKILLS
  drawSectionTitle('SKILLS', 16, 10);

  const col1Width = 125;
  function drawSkillRow(label, value, isMulti = false) {
    page.drawText(label, {
      x: margin,
      y: y,
      size: 9.4,
      font: helveticaBold,
      color: rgb(0.08, 0.08, 0.08),
    });

    if (!isMulti) {
      page.drawText(value, {
        x: margin + col1Width,
        y: y,
        size: 9.4,
        font: helvetica,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= 15.5;
    } else {
      const words = value.split(' ');
      let currentLine = '';
      const availWidth = contentWidth - col1Width;

      for (const word of words) {
        const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
        const width = helvetica.widthOfTextAtSize(testLine, 9.4);
        if (width > availWidth) {
          page.drawText(currentLine, {
            x: margin + col1Width,
            y: y,
            size: 9.4,
            font: helvetica,
            color: rgb(0.15, 0.15, 0.15),
          });
          y -= 13.5;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine.length > 0) {
        page.drawText(currentLine, {
          x: margin + col1Width,
          y: y,
          size: 9.4,
          font: helvetica,
          color: rgb(0.15, 0.15, 0.15),
        });
        y -= 15.5;
      }
    }
  }

  drawSkillRow('Computer Skills', 'C programming Language, C++, Java, Git and GitHub');
  drawSkillRow('Languages', 'Bangla, English, Hindi');
  drawSkillRow('Professional Skills', 'Problem Solving, Object-Oriented Programming, Data Structures and Algorithms');
  drawSkillRow('Soft Skills', 'Teamwork & Collaboration, Effective Communication, Time Management & Prioritization, Adaptability & Fast learner', true);

  // CERTIFICATIONS
  drawSectionTitle('CERTIFICATIONS', 14, 8);
  page.drawText('Introduction to AI and Machine Learning on Google Cloud', {
    x: margin,
    y: y,
    size: 9.6,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  y -= 13;
  page.drawText('NetCom Learning', {
    x: margin,
    y: y,
    size: 9.0,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });
  y -= 9;

  // ACHIEVEMENTS
  drawSectionTitle('ACHIEVEMENTS', 16, 9);
  page.drawText('• Hackathon - ULAB Computer Programming Club (15-08-2026)', {
    x: margin,
    y: y,
    size: 9.6,
    font: helveticaBold,
    color: rgb(0.08, 0.08, 0.08),
  });
  y -= 13;
  drawWrappedText(
    'Secured 4th position. For the hackathon, we built Campus Safety a simple web platform to help students during emergencies.',
    9.2,
    helvetica,
    rgb(0.15, 0.15, 0.15),
    13,
    10
  );

  console.log('Final Y coordinate:', y, 'Margin:', margin, 'Remaining Bottom Space:', y - margin);

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
