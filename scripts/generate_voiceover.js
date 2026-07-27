const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse CLI Arguments
const args = process.argv.slice(2);
let scriptFile = '';
let lang = 'en';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--script' && args[i + 1]) {
    scriptFile = args[i + 1];
    i++;
  } else if (args[i] === '--lang' && args[i + 1]) {
    lang = args[i + 1].toLowerCase();
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 🎙️ NCAS MULTI-VOICE AI AVATAR VOICEOVER ENGINE (TTS)`);
console.log(`=============================================================`);
console.log(`Target Voiceover Language: ${lang === 'ur' ? 'URDU (اردو)' : 'ENGLISH'}\n`);

let scriptData = null;
const transDir = path.join(__dirname, '../output/translations');
const scriptsDir = path.join(__dirname, '../output/scripts');

if (scriptFile && fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
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
  console.log(`❌ Error: No valid script found to generate voiceover.`);
  process.exit(1);
}

const audioDir = path.join(__dirname, '../output/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const topicSlug = (scriptData.metadata.topic || 'cyber_voiceover').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Build Voiceover Specs
const audioClips = scriptData.clips.map((clip, index) => {
  const text = (lang === 'ur' && clip.urdu) ? clip.urdu.script : (clip.english ? clip.english.script : clip.script);
  return {
    clipId: clip.clipId || (index + 1),
    timestamp: clip.timestamp,
    durationSeconds: clip.durationSeconds || 10,
    speakerVoice: lang === 'ur' ? "Urdu Male AI Tech Voice (Pakistani Accent)" : "English Male AI Tech Newsroom Anchor",
    textToSpeak: text,
    speechRate: "1.05x",
    pitch: "0.98x (Authoritative Newsroom Pitch)"
  };
});

const voiceoverPackage = {
  metadata: {
    project: "NajeebCyber AI Studio (NCAS)",
    handle: "@NajeebCyber",
    topic: scriptData.metadata.topic,
    language: lang.toUpperCase(),
    totalClipsCount: audioClips.length,
    generatedAt: new Date().toISOString()
  },
  audioClips: audioClips,
  webSpeechJsPlayback: `
// Web Speech API Live Playback Engine
function playVoiceoverSequence() {
  const clips = ${JSON.stringify(audioClips.map(c => c.textToSpeak))};
  let index = 0;
  function speakNext() {
    if (index >= clips.length) return;
    const utterance = new SpeechSynthesisUtterance(clips[index]);
    utterance.lang = '${lang === 'ur' ? 'ur-PK' : 'en-US'}';
    utterance.rate = 1.05;
    utterance.onend = () => { index++; speakNext(); };
    window.speechSynthesis.speak(utterance);
  }
  speakNext();
}
  `
};

const jsonFile = path.join(audioDir, `${topicSlug}_voiceover_${lang}_${timestamp}.json`);
const mdFile = path.join(audioDir, `${topicSlug}_voiceover_${lang}_${timestamp}.md`);

let mdText = `# 🎙️ NCAS Voiceover Specification (${lang.toUpperCase()})\n\n`;
mdText += `**Topic:** ${scriptData.metadata.topic}  \n`;
mdText += `**Language:** ${lang === 'ur' ? 'Urdu (اردو)' : 'English'}  \n`;
mdText += `**Generated At:** ${new Date().toLocaleString()}  \n\n`;
mdText += `---\n\n`;

audioClips.forEach(c => {
  mdText += `### 🎧 Scene ${c.clipId} [${c.timestamp}] (${c.durationSeconds}s)\n`;
  mdText += `**Voice Profile:** \`${c.speakerVoice}\`  \n`;
  mdText += `**Text to Speak:** "${c.textToSpeak}"  \n\n`;
});

fs.writeFileSync(jsonFile, JSON.stringify(voiceoverPackage, null, 2));
fs.writeFileSync(mdFile, mdText);

console.log(`✓ Voiceover specification generated successfully!`);
console.log(`📄 Markdown Spec: ${mdFile}`);
console.log(`📊 JSON Spec:     ${jsonFile}\n`);

console.log(`-------------------------------------------------------------`);
console.log(` 🎙️ VOICEOVER SCRIPT PREVIEW (${lang.toUpperCase()}):`);
console.log(`-------------------------------------------------------------`);
console.log(`[Clip 1] "${audioClips[0].textToSpeak}"`);
console.log(`[Clip 2] "${audioClips[1].textToSpeak}"`);
console.log(`-------------------------------------------------------------\n`);
