const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

console.log(`\n=============================================================`);
console.log(` 🛠️ NCAS FFMPEG BINARY & ENVIRONMENT SETUP UTILITY`);
console.log(`=============================================================`);

const binDir = path.join(__dirname, '../bin');
const ffmpegExe = path.join(binDir, 'ffmpeg.exe');

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// 1. Check System PATH FFmpeg
let hasSystemFfmpeg = false;
try {
  const versionOutput = execSync('ffmpeg -version', { stdio: 'pipe' }).toString();
  const firstLine = versionOutput.split('\n')[0];
  console.log(`✓ System FFmpeg Detected!`);
  console.log(`  Version: ${firstLine}\n`);
  hasSystemFfmpeg = true;
} catch (e) {
  console.log(`ℹ️ System FFmpeg not found in PATH.`);
}

// 2. Check Portable bin/ffmpeg.exe
let hasPortableFfmpeg = fs.existsSync(ffmpegExe);

if (hasPortableFfmpeg) {
  console.log(`✓ Portable FFmpeg binary found at: ${ffmpegExe}`);
} else if (!hasSystemFfmpeg) {
  console.log(`-> Preparing portable FFmpeg downloader for Windows (\`e:\\NCAS\\bin\\ffmpeg.exe\`)...`);
  
  const setupGuide = `# 🛠️ FFmpeg Setup Instructions for NCAS

NajeebCyber AI Studio uses FFmpeg for video compositing, scene concatenation, and audio mixing.

### Option A: Install via Winget (Recommended for Windows)
Run in PowerShell:
\`\`\`powershell
winget install FFmpeg
\`\`\`

### Option B: Portable Download
1. Download official static FFmpeg build from: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-essentials.7z
2. Extract \`ffmpeg.exe\` to: \`e:\\NCAS\\bin\\ffmpeg.exe\`

Once installed, \`npm run composite-video\` will render 60s vertical MP4 videos natively!
`;

  const guideFile = path.join(binDir, 'README_FFMPEG_SETUP.md');
  fs.writeFileSync(guideFile, setupGuide);
  console.log(`📄 Created FFmpeg setup guide: ${guideFile}`);
}

console.log(`\n=============================================================`);
console.log(` 🏁 FFMPEG ENVIRONMENT DIAGNOSTIC COMPLETE`);
console.log(`=============================================================`);
console.log(`System PATH FFmpeg:   ${hasSystemFfmpeg ? 'INSTALLED ✅' : 'NOT FOUND ❌'}`);
console.log(`Portable bin/ffmpeg: ${hasPortableFfmpeg ? 'INSTALLED ✅' : 'NOT FOUND ❌'}`);
console.log(`NCAS Video Renderer: ${hasSystemFfmpeg || hasPortableFfmpeg ? 'READY FOR NATIVE MP4 RENDERING 🎬' : 'SPEC GENERATOR MODE ACTIVE (Batch Scripts Ready) 📄'}\n`);
