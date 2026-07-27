const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse CLI Arguments
const args = process.argv.slice(2);
let topic = 'Global Cyber Attack Surge';
let cve = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--topic' && args[i + 1]) {
    topic = args[i + 1];
    i++;
  } else if (args[i] === '--cve' && args[i + 1]) {
    cve = args[i + 1];
    i++;
  }
}

if (cve) {
  topic = `Critical Vulnerability ${cve}`;
}

console.log(`\n=============================================================`);
console.log(` 🛡️  NCAS SCRIPT GENERATOR (Google Flow 10s Scene Standard)`);
console.log(`=============================================================`);
console.log(`Target Topic: "${topic}"\n`);

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
    const encodedTopic = encodeURIComponent(topic);
    const hnRes = await httpGet(`https://hn.algolia.com/api/v1/search?query=${encodedTopic}&tags=story&hitsPerPage=3`);
    try {
      const hnData = JSON.parse(hnRes);
      if (hnData.hits && hnData.hits.length > 0) {
        searchContext = hnData.hits.map(h => h.title).join(' | ');
        console.log(`✓ Context retrieved: ${searchContext.slice(0, 100)}...`);
      }
    } catch(e) {}
  }

  if (!searchContext) {
    searchContext = `Security researchers report a significant advisory regarding ${topic}, urging immediate mitigation and system audits.`;
  }

  console.log(`[2/3] Constructing 6 × 10s Google Flow Scene Clips...`);

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '../output/scripts');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 6 × 10s Google Flow Scene Clips Package
  const scriptPackage = {
    metadata: {
      project: "NajeebCyber AI Studio (NCAS)",
      handle: "@NajeebCyber",
      topic: topic,
      cve: cve || undefined,
      duration: "60 Seconds Total",
      clipFormat: "6 Clips × 10 Seconds Each (Google Flow Standard)",
      aspectRatio: "9:16 (Vertical Short)",
      generatedAt: new Date().toISOString()
    },
    clips: [
      {
        clipId: 1,
        durationSeconds: 10,
        timestamp: "00:00 - 00:10",
        label: "CLIP 1: INTRO & HOOK",
        speaker: "@ME (AI Anchor)",
        script: `Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin regarding ${topic}.`,
        flowPrompt: `Ultra-modern Cyber News Studio. Giant LED wall displaying world cyber attack map with glowing blue neon lighting. Floating digital globe & animated hexagons. Camera slowly zooms toward @ME AI Avatar anchor in navy tech suit. 9:16 vertical, photorealistic, 4K render.`,
        lowerThird: `BREAKING NEWS: ${topic.toUpperCase().slice(0, 28)}`,
        audioCue: "News intro riser -> Low futuristic synth bass pulse"
      },
      {
        clipId: 2,
        durationSeconds: 10,
        timestamp: "00:10 - 00:20",
        label: "CLIP 2: STORY 1A - BREAKING THREAT",
        speaker: "@ME (AI Anchor)",
        script: `First up: ${searchContext.slice(0, 110)}. Security teams and analysts worldwide are monitoring this development.`,
        flowPrompt: `Digital threat dashboard, email attack animation, red warning graphics flickering in background, floating glowing headline text. 9:16 vertical, cinematic lighting, 4K.`,
        lowerThird: topic.length > 36 ? topic.slice(0, 34) + '...' : topic,
        audioCue: "Subtle cyber WHOOSH transition"
      },
      {
        clipId: 3,
        durationSeconds: 10,
        timestamp: "00:20 - 00:30",
        label: "CLIP 3: STORY 1B - ATTACK VECTOR",
        speaker: "@ME (AI Anchor)",
        script: `Initial reports indicate potential zero-day or credential exploitation risks allowing unauthorized lateral movement across endpoints.`,
        flowPrompt: `B-roll graphic of matrix-style scrolling code, credential theft animation, multi-factor authentication bypass graphic. 9:16 vertical, cyber aesthetic.`,
        lowerThird: `ATTACK VECTOR: Endpoint & Access Exploit`,
        audioCue: "Data stream click SFX"
      },
      {
        clipId: 4,
        durationSeconds: 10,
        timestamp: "00:30 - 00:40",
        label: "CLIP 4: STORY 2 - AI THREAT & ZERO-DAY",
        speaker: "@ME (AI Anchor)",
        script: `Additionally, AI-assisted scanning scripts are accelerating exploitation windows, making automated patch management essential.`,
        flowPrompt: `AI brain neural network animation, firewall breach graphics, glowing blue cyber defense shield. 9:16 vertical, futuristic 3D graphics.`,
        lowerThird: `AI-POWERED THREAT: Automated Exploitation`,
        audioCue: "Pulse chime SFX"
      },
      {
        clipId: 5,
        durationSeconds: 10,
        timestamp: "00:40 - 00:50",
        label: "CLIP 5: STORY 3 - MITIGATION ADVISORY",
        speaker: "@ME (AI Anchor)",
        script: `Organizations are urged to audit access logs, enforce strict multi-factor authentication, and apply vendor security patches immediately.`,
        flowPrompt: `Global threat heatmap, SOC analyst dashboard, threat intelligence feeds, glowing green patch icons. 9:16 vertical, high-tech dashboard.`,
        lowerThird: `ACTION REQUIRED: Enforce Zero-Trust & Patch`,
        audioCue: "Alert chime SFX"
      },
      {
        clipId: 6,
        durationSeconds: 10,
        timestamp: "00:50 - 01:00",
        label: "CLIP 6: OUTRO & CALL TO ACTION",
        speaker: "@ME (AI Anchor)",
        script: `Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for more updates. I'm @ME, see you next week.`,
        flowPrompt: `Return to Cyber News Studio with rotating blue holographic globe. Glowing social media follow panel overlay (@NajeebCyber). 9:16 vertical, studio sign-off.`,
        lowerThird: `Follow @NajeebCyber for Daily Updates`,
        audioCue: "Synth outro fade out"
      }
    ]
  };

  // Format Markdown Version
  let markdownText = `# 🎬 NCAS 60s Broadcast Script (Google Flow 6 × 10s Scene Clips)\n\n`;
  markdownText += `**Topic:** ${topic}  \n`;
  markdownText += `**Project:** NajeebCyber AI Studio (\`@NajeebCyber\`)  \n`;
  markdownText += `**Clip Format:** Exactly 6 Clips × 10 Seconds Each (60s Total)  \n`;
  markdownText += `**Generated At:** ${new Date().toLocaleString()}  \n\n`;
  markdownText += `---\n\n`;

  scriptPackage.clips.forEach((clip) => {
    markdownText += `## ${clip.label} [${clip.timestamp}]\n\n`;
    markdownText += `**Google Flow Generation Prompt (10s):**  \n\`\`\`text\n${clip.flowPrompt}\n\`\`\`\n\n`;
    markdownText += `**Presenter Script (10s):**  \n> "${clip.script}"\n\n`;
    markdownText += `**Lower Third Overlay:** \`${clip.lowerThird}\`  \n`;
    markdownText += `**Audio Cue:** ${clip.audioCue}  \n\n`;
    markdownText += `---\n\n`;
  });

  const mdFile = path.join(outputDir, `${slug}_googleflow_10s_${timestamp}.md`);
  const jsonFile = path.join(outputDir, `${slug}_googleflow_10s_${timestamp}.json`);

  fs.writeFileSync(mdFile, markdownText);
  fs.writeFileSync(jsonFile, JSON.stringify(scriptPackage, null, 2));

  console.log(`[3/3] Google Flow 10s Clip Package generated successfully!`);
  console.log(`\n📄 Markdown Script: ${mdFile}`);
  console.log(`📊 JSON Render Spec: ${jsonFile}\n`);

  console.log(`-------------------------------------------------------------`);
  console.log(` 🎬 GOOGLE FLOW 10s CLIPS SUMMARY (6 Clips x 10s):`);
  console.log(`-------------------------------------------------------------`);
  scriptPackage.clips.forEach(c => {
    console.log(`[${c.timestamp}] ${c.label}`);
    console.log(`   Prompt: ${c.flowPrompt.slice(0, 75)}...`);
    console.log(`   Script: "${c.script.slice(0, 75)}..."\n`);
  });
  console.log(`-------------------------------------------------------------\n`);
}

generateScript().catch(err => console.error('Error generating script:', err));
