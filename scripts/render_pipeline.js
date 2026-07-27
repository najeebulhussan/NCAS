const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse CLI Arguments
const args = process.argv.slice(2);
let topic = '';
let cve = '';
let fetchLive = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--topic' && args[i + 1]) {
    topic = args[i + 1];
    i++;
  } else if (args[i] === '--cve' && args[i + 1]) {
    cve = args[i + 1];
    i++;
  } else if (args[i] === '--live' || args[i] === '--fetch-live') {
    fetchLive = true;
  }
}

console.log(`\n=============================================================`);
console.log(` 🚀 NCAS UNIFIED BROADCAST PIPELINE (1-Click Engine v1.0)`);
console.log(`=============================================================`);

async function runPipeline() {
  try {
    // Step 1: Determine Topic
    if (!topic && !cve && !fetchLive) {
      topic = 'Weekly Global Cybersecurity Threat Digest';
    }

    let cmdArgs = '';
    if (cve) cmdArgs = `--cve "${cve}"`;
    else if (topic) cmdArgs = `--topic "${topic}"`;

    console.log(`\n[STEP 1/4] Generating 6 × 10s Google Flow Broadcast Script...`);
    const scriptCmd = `node "${path.join(__dirname, 'generate_news_script.js')}" ${cmdArgs}`;
    execSync(scriptCmd, { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    console.log(`\n[STEP 2/4] Exporting Google Flow Batch Render Configuration...`);
    const flowCmd = `node "${path.join(__dirname, 'export_flow_config.js')}"`;
    execSync(flowCmd, { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    console.log(`\n[STEP 3/4] Generating Social Media Metadata & Hashtags...`);
    generateSocialMetadata(topic || cve || 'Cyber Threat Digest');

    console.log(`\n[STEP 4/4] Auto-committing and pushing broadcast assets to GitHub...`);
    try {
      execSync('git add .', { cwd: path.join(__dirname, '..') });
      execSync(`git commit -m "feat(broadcast): generate automated 60s broadcast package for '${topic || cve}'"`, { cwd: path.join(__dirname, '..') });
      execSync('git push origin main', { cwd: path.join(__dirname, '..') });
      console.log(`✓ GitHub sync completed successfully!`);
    } catch (gitErr) {
      console.log(`ℹ️ Git status note: ${gitErr.message.slice(0, 100)}`);
    }

    console.log(`\n=============================================================`);
    console.log(` ✅ NCAS BROADCAST PIPELINE COMPLETED SUCCESSFULLY!`);
    console.log(`=============================================================`);

  } catch (err) {
    console.error(`❌ Pipeline Execution Error: ${err.message}`);
  }
}

function generateSocialMetadata(titleTopic) {
  const socialDir = path.join(__dirname, '../output/social');
  if (!fs.existsSync(socialDir)) {
    fs.mkdirSync(socialDir, { recursive: true });
  }

  const slug = titleTopic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const socialCopy = `# 📱 Social Media Metadata & Distribution Package

**Broadcast Topic:** ${titleTopic}  
**Brand Handle:** \`@NajeebCyber\`  
**Generated At:** ${new Date().toLocaleString()}  

---

## 1. YouTube Shorts
- **Title:** ${titleTopic} Explained in 60s | Weekly Cyber News #Shorts
- **Description:**  
  Stay informed with @NajeebCyber! In this 60-second broadcast, we break down ${titleTopic}, potential attack vectors, and urgent mitigation advice.
  
  👇 Follow for daily cybersecurity updates & threat alerts:
  YouTube: @NajeebCyber
  TikTok: @NajeebCyber
  Instagram: @NajeebCyber
- **Hashtags:** \`#CyberSecurity #HackerNews #NajeebCyber #TechNews #ZeroDay #InfoSec #CyberAttack\`

---

## 2. TikTok & Instagram Reels
- **Caption:**  
  🚨 BREAKING: ${titleTopic}! Here's what you need to know in 60s. Stay safe out there! 🛡️  
  
  Follow @NajeebCyber for daily threat breakdowns!
- **Hashtags:** \`#cybersecurity #hackernews #najeebcyber #securitytip #tech #infosec\`

---

## 3. LinkedIn & X (Twitter)
- **Post Copy:**  
  🚨 **Cybersecurity Alert**: ${titleTopic}
  
  Our AI newsroom @NajeebCyber has compiled a 60-second threat breakdown covering attack vectors, impacted endpoints, and immediate remediation steps.
  
  Key Takeaways:
  1️⃣ Audit system access logs
  2️⃣ Enforce multi-factor authentication
  3️⃣ Apply vendor security patches immediately
  
  Full broadcast available across all platforms: @NajeebCyber
  
  #CyberSecurity #CISO #ThreatIntel #InfoSec #NajeebCyber
`;

  const outputFile = path.join(socialDir, `${slug}_social_${timestamp}.md`);
  fs.writeFileSync(outputFile, socialCopy);
  console.log(`✓ Social media copy generated: ${outputFile}`);
}

runPipeline();
