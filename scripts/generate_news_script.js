const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse CLI Arguments
const args = process.argv.slice(2);
let topic = 'Global Cyber Attack Surge';
let cve = '';
let slotsParam = '';
let targetDuration = 0;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--topic' && args[i + 1]) {
    topic = args[i + 1];
    i++;
  } else if (args[i] === '--cve' && args[i + 1]) {
    cve = args[i + 1];
    i++;
  } else if (args[i] === '--slots' && args[i + 1]) {
    slotsParam = args[i + 1];
    i++;
  } else if (args[i] === '--duration' && args[i + 1]) {
    targetDuration = parseInt(args[i + 1], 10);
    i++;
  }
}

if (cve) {
  topic = `Critical Vulnerability ${cve}`;
}

// Calculate Clip Time Slots
let clipDurations = [10, 10, 10, 10, 10, 10]; // Default 6x10s = 60s

if (slotsParam) {
  clipDurations = slotsParam.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0);
} else if (targetDuration > 0) {
  if (targetDuration === 30) {
    clipDurations = [10, 10, 10];
  } else if (targetDuration === 45) {
    clipDurations = [15, 15, 15];
  } else if (targetDuration === 90) {
    clipDurations = [15, 15, 15, 15, 15, 15];
  } else {
    // Distribute targetDuration into ~10s/15s clips
    const numClips = Math.max(1, Math.round(targetDuration / 10));
    const each = Math.round(targetDuration / numClips);
    clipDurations = Array(numClips).fill(each);
  }
}

const totalBroadcastSeconds = clipDurations.reduce((a, b) => a + b, 0);

console.log(`\n=============================================================`);
console.log(` 🛡️  NCAS DYNAMIC SCRIPT GENERATOR (Custom Clip Time Slots)`);
console.log(`=============================================================`);
console.log(`Target Topic: "${topic}"`);
console.log(`Time Slots:   [${clipDurations.join('s, ')}s]`);
console.log(`Total Length: ${totalBroadcastSeconds} Seconds\n`);

function httpGet(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function formatTimecode(startSec, endSec) {
  function fmt(s) {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }
  return `${fmt(startSec)} - ${fmt(endSec)}`;
}

async function generateScript() {
  console.log(`[1/3] Gathering intelligence & context...`);
  
  let searchContext = '';
  if (cve) {
    console.log(`-> Fetching CVE details for ${cve}...`);
    const resText = await httpGet(`https://cve.circl.lu/api/cve/${cve}`);
    try {
      const cveData = JSON.parse(resText);
      if (cveData && cveData.summary) {
        searchContext = cveData.summary;
        console.log(`✓ CVE Summary retrieved: ${searchContext.slice(0, 100)}...`);
      }
    } catch(e) {}
  }

  if (!searchContext) {
    console.log(`-> Searching Hacker News API for context...`);
    const hnResText = await httpGet(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(topic)}&tags=story`);
    try {
      const hnData = JSON.parse(hnResText);
      if (hnData.hits && hnData.hits.length > 0) {
        searchContext = hnData.hits.map(h => h.title).join(' | ');
        console.log(`✓ Context retrieved: ${searchContext.slice(0, 100)}...`);
      }
    } catch(e) {}
  }

  if (!searchContext) {
    searchContext = `Security researchers report a significant advisory regarding ${topic}, urging immediate mitigation and system audits.`;
  }

  console.log(`[2/3] Constructing ${clipDurations.length} Dynamic Scene Clips...`);

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '../output/scripts');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Pre-defined clip templates
  const templateClips = [
    {
      label: "CLIP 1: INTRO & HOOK",
      speaker: "@ME (AI Anchor)",
      script: `Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin regarding ${topic}.`,
      flowPrompt: `Ultra-modern Cyber News Studio. Giant LED wall displaying world cyber attack map with glowing blue neon lighting. Floating digital globe & animated hexagons. Camera slowly zooms toward @ME AI Avatar anchor in navy tech suit. 9:16 vertical, photorealistic, 4K render.`,
      lowerThird: `BREAKING NEWS: ${topic.toUpperCase().slice(0, 28)}`,
      audioCue: "News intro riser -> Low futuristic synth bass pulse"
    },
    {
      label: "CLIP 2: STORY 1A - BREAKING THREAT",
      speaker: "@ME (AI Anchor)",
      script: `First up: ${searchContext.slice(0, 110)}. Security teams and analysts worldwide are monitoring this development.`,
      flowPrompt: `Digital threat dashboard, email attack animation, red warning graphics flickering in background, floating glowing headline text. 9:16 vertical, cinematic lighting, 4K.`,
      lowerThird: topic.length > 36 ? topic.slice(0, 34) + '...' : topic,
      audioCue: "Subtle cyber WHOOSH transition"
    },
    {
      label: "CLIP 3: STORY 1B - ATTACK VECTOR",
      speaker: "@ME (AI Anchor)",
      script: `Initial reports indicate potential zero-day or credential exploitation risks allowing unauthorized lateral movement across endpoints.`,
      flowPrompt: `B-roll graphic of matrix-style scrolling code, credential theft animation, multi-factor authentication bypass graphic. 9:16 vertical, cyber aesthetic.`,
      lowerThird: `ATTACK VECTOR: Endpoint & Access Exploit`,
      audioCue: "Data stream click SFX"
    },
    {
      label: "CLIP 4: STORY 2 - AI THREAT & ZERO-DAY",
      speaker: "@ME (AI Anchor)",
      script: `Additionally, AI-assisted scanning scripts are accelerating exploitation windows, making automated patch management essential.`,
      flowPrompt: `AI brain neural network animation, firewall breach graphics, glowing blue cyber defense shield. 9:16 vertical, futuristic 3D graphics.`,
      lowerThird: `AI-POWERED THREAT: Automated Exploitation`,
      audioCue: "Pulse chime SFX"
    },
    {
      label: "CLIP 5: STORY 3 - MITIGATION ADVISORY",
      speaker: "@ME (AI Anchor)",
      script: `Organizations are urged to audit access logs, enforce strict multi-factor authentication, and apply vendor security patches immediately.`,
      flowPrompt: `Global threat heatmap, SOC analyst dashboard, threat intelligence feeds, glowing green patch icons. 9:16 vertical, high-tech dashboard.`,
      lowerThird: `ACTION REQUIRED: Enforce Zero-Trust & Patch`,
      audioCue: "Security alert hum SFX"
    },
    {
      label: "CLIP 6: OUTRO & CALL TO ACTION",
      speaker: "@ME (AI Anchor)",
      script: `Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for more updates. I'm @ME, see you next week.`,
      flowPrompt: `Return to Cyber News Studio with rotating blue holographic globe. Glowing social media handle @NajeebCyber floating on screen. Camera zooms out slowly. 9:16 vertical, 4K render.`,
      lowerThird: `Follow @NajeebCyber for Daily Updates`,
      audioCue: "Outro musical resolve -> Logo sting"
    }
  ];

  let currentStart = 0;
  const generatedClips = clipDurations.map((durationSec, i) => {
    const endSec = currentStart + durationSec;
    const timecode = formatTimecode(currentStart, endSec);
    currentStart = endSec;

    const template = templateClips[i % templateClips.length];
    return {
      clipId: i + 1,
      durationSeconds: durationSec,
      timestamp: timecode,
      label: `CLIP ${i + 1}: ${template.label.split(':')[1] ? template.label.split(':')[1].trim() : template.label}`,
      speaker: template.speaker,
      script: template.script,
      flowPrompt: `${template.flowPrompt} Duration: ${durationSec}s.`,
      lowerThird: template.lowerThird,
      audioCue: template.audioCue
    };
  });

  const scriptPackage = {
    metadata: {
      project: "NajeebCyber AI Studio (NCAS)",
      handle: "@NajeebCyber",
      topic: topic,
      cve: cve || undefined,
      duration: `${totalBroadcastSeconds} Seconds Total`,
      clipFormat: `${clipDurations.length} Custom Clips [${clipDurations.join('s, ')}s]`,
      aspectRatio: "9:16 (Vertical Short)",
      generatedAt: new Date().toISOString()
    },
    clips: generatedClips
  };

  // Build Markdown Document
  let mdText = `# 🛡️ NCAS Broadcast Script (Dynamic Clips: ${totalBroadcastSeconds}s)\n\n`;
  mdText += `**Topic:** ${topic}  \n`;
  mdText += `**Total Duration:** ${totalBroadcastSeconds} Seconds (${clipDurations.length} Clips: [${clipDurations.join('s, ')}s])  \n`;
  mdText += `**Format:** 9:16 Vertical Short / Reel  \n`;
  mdText += `**Generated At:** ${new Date().toLocaleString()}  \n\n`;
  mdText += `---\n\n`;

  scriptPackage.clips.forEach(clip => {
    mdText += `### 🎬 ${clip.label} (${clip.timestamp} | ${clip.durationSeconds}s)\n`;
    mdText += `**Speaker:** \`${clip.speaker}\`  \n`;
    mdText += `**Teleprompter Script:** "${clip.script}"  \n`;
    mdText += `**Lower-Third Overlay:** \`${clip.lowerThird}\`  \n`;
    mdText += `**Google Flow Prompt:** \`${clip.flowPrompt}\`  \n`;
    mdText += `**Audio Cue:** *${clip.audioCue}*  \n\n`;
  });

  const mdFile = path.join(outputDir, `${slug}_dynamic_script_${timestamp}.md`);
  const jsonFile = path.join(outputDir, `${slug}_dynamic_script_${timestamp}.json`);

  fs.writeFileSync(mdFile, mdText);
  fs.writeFileSync(jsonFile, JSON.stringify(scriptPackage, null, 2));

  console.log(`[3/3] Dynamic Clip Package generated successfully!`);
  console.log(`📄 Markdown Script: ${mdFile}`);
  console.log(`📊 JSON Render Spec: ${jsonFile}\n`);

  console.log(`-------------------------------------------------------------`);
  console.log(` 🎬 DYNAMIC CLIPS SUMMARY (${scriptPackage.clips.length} Clips | ${totalBroadcastSeconds}s Total):`);
  console.log(`-------------------------------------------------------------`);
  scriptPackage.clips.forEach(c => {
    console.log(`[${c.timestamp}] (${c.durationSeconds}s) ${c.label}`);
    console.log(`   Script: "${c.script.slice(0, 75)}..."`);
  });
  console.log(`-------------------------------------------------------------\n`);
}

generateScript();
