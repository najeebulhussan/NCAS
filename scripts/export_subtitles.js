const fs = require('fs');
const path = require('path');

// Parse CLI Arguments
const args = process.argv.slice(2);
let scriptFile = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--script' && args[i + 1]) {
    scriptFile = args[i + 1];
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 💬 NCAS SUBTITLE & CAPTION EXPORTER (.SRT / .VTT Engine)`);
console.log(`=============================================================`);

let scriptData = null;
const scriptsDir = path.join(__dirname, '../output/scripts');
const transDir = path.join(__dirname, '../output/translations');

if (scriptFile && fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
  // Try latest file from output/translations or output/scripts
  let candidateFiles = [];
  if (fs.existsSync(transDir)) {
    const tFiles = fs.readdirSync(transDir).filter(f => f.endsWith('.json')).map(f => path.join(transDir, f));
    candidateFiles.push(...tFiles);
  }
  if (fs.existsSync(scriptsDir)) {
    const sFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.json')).map(f => path.join(scriptsDir, f));
    candidateFiles.push(...sFiles);
  }

  if (candidateFiles.length > 0) {
    candidateFiles.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    const latestFile = candidateFiles[0];
    console.log(`-> Loaded latest script file: ${latestFile}`);
    scriptData = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
  }
}

if (!scriptData || !scriptData.clips) {
  console.log(`❌ Error: No valid script file found to generate subtitles.`);
  process.exit(1);
}

// Convert "00:00 - 00:10" to SRT timecode "00:00:00,000 --> 00:00:10,000"
function parseSrtTime(timeStr, index) {
  const startSec = index * 10;
  const endSec = (index + 1) * 10;
  
  function formatSec(s) {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `00:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec},000`;
  }

  return `${formatSec(startSec)} --> ${formatSec(endSec)}`;
}

function parseVttTime(timeStr, index) {
  return parseSrtTime(timeStr, index).replace(/,/g, '.');
}

const subDir = path.join(__dirname, '../output/subtitles');
if (!fs.existsSync(subDir)) {
  fs.mkdirSync(subDir, { recursive: true });
}

const topicSlug = (scriptData.metadata.topic || 'cyber_news').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// 1. Generate English Subtitles (.srt & .vtt)
let enSrt = '';
let enVtt = 'WEBVTT\n\n';

scriptData.clips.forEach((clip, i) => {
  const scriptText = clip.english ? clip.english.script : clip.scriptOriginalEn || clip.script;
  const srtTime = parseSrtTime(clip.timestamp, i);
  const vttTime = parseVttTime(clip.timestamp, i);

  enSrt += `${i + 1}\n${srtTime}\n${scriptText}\n\n`;
  enVtt += `${i + 1}\n${vttTime}\n${scriptText}\n\n`;
});

const enSrtFile = path.join(subDir, `${topicSlug}_en_${timestamp}.srt`);
const enVttFile = path.join(subDir, `${topicSlug}_en_${timestamp}.vtt`);

fs.writeFileSync(enSrtFile, enSrt);
fs.writeFileSync(enVttFile, enVtt);

// 2. Generate Urdu Subtitles (.srt & .vtt) if available
let urSrtFile = '';
let urVttFile = '';

if (scriptData.clips[0].urdu || scriptData.clips[0].language === 'UR' || scriptData.clips[0].language === 'URDU') {
  let urSrt = '';
  let urVtt = 'WEBVTT\n\n';

  scriptData.clips.forEach((clip, i) => {
    const urText = clip.urdu ? clip.urdu.script : clip.script;
    const srtTime = parseSrtTime(clip.timestamp, i);
    const vttTime = parseVttTime(clip.timestamp, i);

    urSrt += `${i + 1}\n${srtTime}\n${urText}\n\n`;
    urVtt += `${i + 1}\n${vttTime}\n${urText}\n\n`;
  });

  urSrtFile = path.join(subDir, `${topicSlug}_ur_${timestamp}.srt`);
  urVttFile = path.join(subDir, `${topicSlug}_ur_${timestamp}.vtt`);

  fs.writeFileSync(urSrtFile, urSrt);
  fs.writeFileSync(urVttFile, urVtt);
}

console.log(`✓ Subtitle & Caption files generated successfully!`);
console.log(`\n🇬🇧 English SRT Subtitles: ${enSrtFile}`);
console.log(`🇬🇧 English VTT Subtitles: ${enVttFile}`);
if (urSrtFile) {
  console.log(`🇵🇰 Urdu SRT Subtitles: ${urSrtFile}`);
  console.log(`🇵🇰 Urdu VTT Subtitles: ${urVttFile}`);
}

console.log(`\n-------------------------------------------------------------`);
console.log(` 💬 SUBTITLE FILE PREVIEW (English .SRT):`);
console.log(`-------------------------------------------------------------`);
console.log(enSrt.slice(0, 350));
console.log(`-------------------------------------------------------------\n`);
