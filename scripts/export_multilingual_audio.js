const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 🎙️ NCAS MULTI-LANGUAGE AUDIO SYNC & SUBTITLE EXPORTER`);
console.log(`=============================================================`);

const outputDir = path.join(__dirname, '../output');
const audioDir = path.join(outputDir, 'audio');
const subtitlesDir = path.join(outputDir, 'subtitles');

if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
if (!fs.existsSync(subtitlesDir)) fs.mkdirSync(subtitlesDir, { recursive: true });

// 1. Define Standard 60s Bilingual Audio Timeline
const BILINGUAL_AUDIO_TIMELINE = [
  {
    clipId: 'CLIP-01',
    startSec: 0,
    endSec: 10,
    textEn: "Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin.",
    textUr: "ہماری ہفتہ وار سائبر نیوز میں خوش آمدید। میں ہوں @ME، آپ کے لیے اہم خبروں کے ساتھ۔",
    audioMarkerEn: "en_clip_01_00-10.mp3",
    audioMarkerUr: "ur_clip_01_00-10.mp3",
    bgmDuckingDb: -14
  },
  {
    clipId: 'CLIP-02',
    startSec: 10,
    endSec: 25,
    textEn: "Critical Zero-Day exploit discovered targeting core enterprise infrastructure.",
    textUr: "اہم انفراسٹرکچر کو نشانہ بنانے والا نیا سائبر حملہ دریافت ہوا ہے۔",
    audioMarkerEn: "en_clip_02_10-25.mp3",
    audioMarkerUr: "ur_clip_02_10-25.mp3",
    bgmDuckingDb: -18
  },
  {
    clipId: 'CLIP-03',
    startSec: 25,
    endSec: 45,
    textEn: "Automated ransomware bots bypass multi-factor authentication in real time.",
    textUr: "خودکار رینسم ویئر باٹس ملٹی فیکٹر تصدیق کو بائی پاس کر رہے ہیں۔",
    audioMarkerEn: "en_clip_03_25-45.mp3",
    audioMarkerUr: "ur_clip_03_25-45.mp3",
    bgmDuckingDb: -18
  },
  {
    clipId: 'CLIP-04',
    startSec: 45,
    endSec: 60,
    textEn: "Stay protected, update your system patches immediately, and follow @NajeebCyber.",
    textUr: "محفوظ رہیں، اپنے سسٹمز کو فوراً اپ ڈیٹ کریں اور @NajeebCyber کو فالو کریں۔",
    audioMarkerEn: "en_clip_04_45-60.mp3",
    audioMarkerUr: "ur_clip_04_45-60.mp3",
    bgmDuckingDb: -12
  }
];

// 2. Generate FFmpeg Filter Complex String
const ffmpegFilterComplex = `[1:a]volume=1.0[voice_en]; [2:a]volume=1.0[voice_ur]; [3:a]volume=0.20[bgm]; [voice_en][voice_ur][bgm]amix=inputs=3:weights=1 1 0.25[audio_out]`;

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const jsonFile = path.join(audioDir, `multilingual_audio_sync_${timestamp}.json`);
const mdFile = path.join(audioDir, `multilingual_audio_sync_${timestamp}.md`);

const exportData = {
  handle: '@NajeebCyber',
  timestamp: new Date().toISOString(),
  ffmpegFilterComplex: ffmpegFilterComplex,
  timeline: BILINGUAL_AUDIO_TIMELINE
};

fs.writeFileSync(jsonFile, JSON.stringify(exportData, null, 2));

const mdContent = `# 🎙️ NCAS Multi-Language Audio Sync & Subtitle Spec
**Channel Handle:** @NajeebCyber  
**Generated:** ${new Date().toLocaleString()}  

---

### 🎛️ FFmpeg Multi-Track Audio Filter Complex
\`\`\`bash
${ffmpegFilterComplex}
\`\`\`

---

### 📜 Timestamped Audio & Subtitle Timeline
${BILINGUAL_AUDIO_TIMELINE.map(t => `
#### ⏱️ ${t.startSec}s - ${t.endSec}s (${t.clipId})
- **English Track:** "${t.textEn}"
- **Urdu Track:** "${t.textUr}"
- **BGM Ducking:** \`${t.bgmDuckingDb}dB\`
`).join('\n')}
`;

fs.writeFileSync(mdFile, mdContent);

console.log(`✓ Bilingual Audio Markers & FFmpeg Filter Complex Generated!`);
console.log(`📄 Saved JSON Spec: ${jsonFile}`);
console.log(`📄 Saved MD Report: ${mdFile}\n`);
