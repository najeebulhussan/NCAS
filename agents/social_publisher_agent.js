const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 📡 NCAS AGENT 10: CROSS-PLATFORM SOCIAL PUBLISHER`);
console.log(`=============================================================`);

const agentLogsDir = path.join(__dirname, '../output/agent_logs');
const scriptFile = path.join(agentLogsDir, 'scriptwriter_output.json');

let scriptData = null;
if (fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
  scriptData = { topic: 'Global Cyber Attack Surge' };
}

const topic = scriptData.topic;

const socialPayload = {
  agent: 'Cross-Platform Social Publisher Agent',
  published_at: new Date().toISOString(),
  channel_handle: '@NajeebCyber',
  target_platforms: ['YOUTUBE_SHORTS', 'TIKTOK', 'INSTAGRAM_REELS', 'LINKEDIN', 'X_TWITTER'],
  dispatch_packages: {
    youtube_shorts: { title: `${topic} #Shorts`, category_id: '28', privacy: 'public' },
    tiktok: { caption: `🚨 Urgent Security Bulletin regarding ${topic}. #CyberSecurity #TechTok #NajeebCyber` },
    instagram_reels: { caption: `🚨 BREAKING CYBER ALERT: ${topic}. Follow @NajeebCyber for 24/7 security updates.` },
    linkedin: { headline: `Executive Security Briefing: ${topic}` },
    x_twitter: { tweet: `🚨 URGENT: ${topic}. Immediate patching required. Details via @NajeebCyber.` }
  }
};

const outFile = path.join(agentLogsDir, 'social_publisher_output.json');
fs.writeFileSync(outFile, JSON.stringify(socialPayload, null, 2));

console.log(`✓ Multi-Platform Social Dispatch Packages Prepared! (@NajeebCyber)`);
console.log(`📡 Target Platforms: ${socialPayload.target_platforms.join(', ')}`);
console.log(`📄 Saved Social Publisher Payload: ${outFile}\n`);
