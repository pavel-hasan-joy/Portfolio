import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const src = 'C:/Users/mdpav/.gemini/antigravity-ide/brain/6a1f02c2-706e-47a4-b48f-fe44b0dc42d1/.user_uploaded/media_1792478730763.png';

  // Crop the emblem centered at x=302, y=200, size 172x172
  const cropSize = 172;
  const left = 302 - Math.floor(cropSize / 2);
  const top = 200 - Math.floor(cropSize / 2);

  const emblemBuffer = await sharp(src)
    .extract({ left, top, width: cropSize, height: cropSize })
    .toBuffer();

  // Create circular mask with subtle cyan rim for high visibility on dark and light tabs
  const circleSvg = Buffer.from(
    '<svg width="' + cropSize + '" height="' + cropSize + '">' +
    '  <circle cx="' + (cropSize/2) + '" cy="' + (cropSize/2) + '" r="' + (cropSize/2) + '" fill="#071739" />' +
    '  <circle cx="' + (cropSize/2) + '" cy="' + (cropSize/2) + '" r="' + (cropSize/2 - 2) + '" fill="none" stroke="#00d9ff" stroke-width="2" opacity="0.4" />' +
    '</svg>'
  );

  // Composite circle background with emblem
  const circularEmblem = await sharp(circleSvg)
    .composite([{ input: emblemBuffer, blend: 'over' }])
    .png()
    .toBuffer();

  // Mask the circular area so outside the circle is transparent
  const maskSvg = Buffer.from(
    '<svg width="' + cropSize + '" height="' + cropSize + '">' +
    '  <circle cx="' + (cropSize/2) + '" cy="' + (cropSize/2) + '" r="' + (cropSize/2) + '" fill="#fff" />' +
    '</svg>'
  );

  const finalCircle = await sharp(circularEmblem)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Save 512x512 icon
  await sharp(finalCircle).resize(512, 512, { kernel: 'lanczos3' }).toFile('public/icon-512.png');
  // Save 192x192 icon
  await sharp(finalCircle).resize(192, 192, { kernel: 'lanczos3' }).toFile('public/icon-192.png');
  // Save 32x32, 48x48, 16x16
  const png32 = await sharp(finalCircle).resize(32, 32, { kernel: 'lanczos3' }).toBuffer();
  const png48 = await sharp(finalCircle).resize(48, 48, { kernel: 'lanczos3' }).toBuffer();
  const png16 = await sharp(finalCircle).resize(16, 16, { kernel: 'lanczos3' }).toBuffer();

  await sharp(finalCircle).resize(32, 32).toFile('src/app/icon.png');
  await sharp(finalCircle).resize(180, 180).toFile('src/app/apple-icon.png');
  await sharp(finalCircle).resize(32, 32).toFile('public/icon.png');
  await sharp(finalCircle).resize(180, 180).toFile('public/apple-icon.png');
  await sharp(finalCircle).resize(64, 64).toFile('public/logo-icon.png');

  // Next, create valid ICO file containing 16x16, 32x32, and 48x48 PNG buffers
  function createIco(pngBuffers) {
    const numImages = pngBuffers.length;
    const headerSize = 6 + 16 * numImages;
    let offset = headerSize;

    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // type 1 = ICO
    header.writeUInt16LE(numImages, 4);

    const dirEntries = [];
    for (const buf of pngBuffers) {
      const entry = Buffer.alloc(16);
      const w = buf.readUInt32BE(16);
      const h = buf.readUInt32BE(20);
      entry.writeUInt8(w >= 256 ? 0 : w, 0);
      entry.writeUInt8(h >= 256 ? 0 : h, 1);
      entry.writeUInt8(0, 2); // color count
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(buf.length, 8); // image size
      entry.writeUInt32LE(offset, 12); // image offset
      dirEntries.push(entry);
      offset += buf.length;
    }

    return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  }

  const icoBuf = createIco([png16, png32, png48]);
  fs.writeFileSync('src/app/favicon.ico', icoBuf);
  fs.writeFileSync('public/favicon.ico', icoBuf);

  console.log('Successfully generated all favicons & icons in src/app and public!');
}

generateFavicons().catch(console.error);
