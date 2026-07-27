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

console.log(`\n==================================================`);
console.log(` 🛡️  NCAS AUTO SCRIPT GENERATOR (OmniFlash v2.0)`);
console.log(`==================================================`);
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

  console.log(`[2/3] Constructing 60-second broadcast script...`);

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '../output/scripts');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 60s Script Object
  const scriptPackage = {
    metadata: {
      project: "NajeebCyber AI Studio (NCAS)",
      handle: "@NajeebCyber",
      topic: topic,
      cve: cve || undefined,
      duration: "60 Seconds",
      aspectRatio: "9:16 (Vertical Short)",
      generatedAt: new Date().toISOString()
    },
    segments: [
      {
        timestamp: "00:00 - 00:06",
        segment: "INTRO",
        speaker: "@ME (AI Anchor)",
        script: `Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin regarding ${topic}.`,
        visualPrompt: "Ultra-modern cyber news studio • Giant LED attack heatmap wall • Blue neon studio lighting • Camera slowly zooms toward avatar",
        lowerThird: `BREAKING NEWS: ${topic.toUpperCase().slice(0, 32)}`,
        audioEffect: "News intro riser -> Low futuristic synth bass pulse"
      },
      {
        timestamp: "00:06 - 00:25",
        segment: "STORY 1 (BREAKING THREAT)",
        speaker: "@ME (AI Anchor)",
        script: `First up: ${searchContext}. Cyber security teams are actively investigating the potential impact and attack vectors.`,
        visualPrompt: "Digital threat dashboard • B-roll of animated matrix code breach • Floating holographic warnings",
        lowerThird: topic.length > 38 ? topic.slice(0, 36) + '...' : topic,
        audioEffect: "Subtle cyber WHOOSH transition"
      },
      {
        timestamp: "00:25 - 00:45",
        segment: "STORY 2 (TECHNICAL ANALYSIS & MITIGATION)",
        speaker: "@ME (AI Anchor)",
        script: `Security analysts strongly advise all system administrators and users to enforce multi-factor authentication, audit access logs, and apply official patches immediately.`,
        visualPrompt: "Firewall defense shield animation • SOC analyst dashboard • Patch advisory graphic",
        lowerThird: "ACTION REQUIRED: Apply Patch & Enforce MFA",
        audioEffect: "Data stream click SFX"
      },
      {
        timestamp: "00:45 - 01:00",
        segment: "OUTRO",
        speaker: "@ME (AI Anchor)",
        script: `That's your live Cyber Security update. Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for daily updates. I'm @ME, signing off.`,
        visualPrompt: "Return to Cyber Studio • Rotating blue holographic globe • Social media panel (@NajeebCyber)",
        lowerThird: "Follow @NajeebCyber for Daily Updates",
        audioEffect: "Synth outro fade out"
      }
    ]
  };

  // Format Markdown Version
  let markdownText = `# 🎬 NCAS 60-Second Broadcast Script: ${topic}\n\n`;
  markdownText += `**Project:** NajeebCyber AI Studio  \n`;
  markdownText += `**Handle:** \`@NajeebCyber\`  \n`;
  markdownText += `**Generated At:** ${new Date().toLocaleString()}  \n`;
  markdownText += `**Duration:** 60 Seconds (9:16 Vertical)  \n\n`;
  markdownText += `---\n\n`;

  scriptPackage.segments.forEach((seg, idx) => {
    markdownText += `## ${idx + 1}. ${seg.segment} [${seg.timestamp}]\n\n`;
    markdownText += `**Presenter Script:**  \n> "${seg.script}"\n\n`;
    markdownText += `**Lower Third Overlay:** \`${seg.lowerThird}\`  \n`;
    markdownText += `**Visual Camera Directions:** ${seg.visualPrompt}  \n`;
    markdownText += `**Audio Cues:** ${seg.audioEffect}  \n\n`;
    markdownText += `---\n\n`;
  });

  const mdFile = path.join(outputDir, `${slug}_${timestamp}.md`);
  const jsonFile = path.join(outputDir, `${slug}_${timestamp}.json`);

  fs.writeFileSync(mdFile, markdownText);
  fs.writeFileSync(jsonFile, JSON.stringify(scriptPackage, null, 2));

  console.log(`[3/3] Script files generated successfully!`);
  console.log(`\n📄 Markdown Script: ${mdFile}`);
  console.log(`📊 JSON Render Spec: ${jsonFile}\n`);

  console.log(`--------------------------------------------------`);
  console.log(` 📺 TELEPROMPTER PREVIEW (First 2 Segments):`);
  console.log(`--------------------------------------------------`);
  console.log(`[00:00 - 00:06] "${scriptPackage.segments[0].script}"`);
  console.log(`[00:06 - 00:25] "${scriptPackage.segments[1].script}"`);
  console.log(`--------------------------------------------------\n`);
}

generateScript().catch(err => console.error('Error generating script:', err));
