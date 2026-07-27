const fs = require('fs');
const path = require('path');

// Parse CLI Arguments
const args = process.argv.slice(2);
let scriptFile = '';
let targetPlatform = 'ALL'; // YOUTUBE, TIKTOK, INSTAGRAM, LINKEDIN, TWITTER, ALL

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--script' && args[i + 1]) {
    scriptFile = args[i + 1];
    i++;
  } else if (args[i] === '--platform' && args[i + 1]) {
    targetPlatform = args[i + 1].toUpperCase();
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 📡 NCAS MULTI-PLATFORM SOCIAL AUTO-PUBLISHING ENGINE`);
console.log(`=============================================================`);
console.log(`Target Handle:    @NajeebCyber`);
console.log(`Target Platforms: ${targetPlatform}\n`);

let scriptData = null;
const scriptsDir = path.join(__dirname, '../output/scripts');

if (scriptFile && fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
  if (fs.existsSync(scriptsDir)) {
    const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.json'));
    if (files.length > 0) {
      files.sort((a, b) => fs.statSync(path.join(scriptsDir, b)).mtimeMs - fs.statSync(path.join(scriptsDir, a)).mtimeMs);
      const latestFile = path.join(scriptsDir, files[0]);
      console.log(`-> Loaded latest script file: ${latestFile}`);
      scriptData = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
    }
  }
}

if (!scriptData || !scriptData.clips) {
  console.log(`❌ Error: No valid script found to prepare social publication.`);
  process.exit(1);
}

const uploadsDir = path.join(__dirname, '../output/social_uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const topic = scriptData.metadata.topic;
const topicSlug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Formatted Social Dispatch Payloads
const dispatchPackage = {
  metadata: {
    project: "NajeebCyber AI Studio (NCAS)",
    handle: "@NajeebCyber",
    topic: topic,
    scheduledTime: new Date().toISOString(),
    status: "READY_FOR_DISPATCH"
  },
  platforms: {
    youtubeShorts: {
      platform: "YouTube Shorts",
      endpoint: "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
      videoTitle: `${topic.slice(0, 70)} #Shorts`,
      description: `🚨 Urgent Cyber Security Alert regarding ${topic}.\n\nStay protected, patch your systems, and follow @NajeebCyber for daily intelligence.\n\n#CyberSecurity #InfoSec #Hacking #ZeroDay #TechNews #NajeebCyber`,
      tags: ["cybersecurity", "infosec", "zero day", "hacking news", "najeebcyber", "shorts"],
      categoryId: "28", // Science & Technology
      privacyStatus: "public",
      selfDeclaredMadeForKids: false
    },
    tikTok: {
      platform: "TikTok",
      endpoint: "https://open.tiktokapis.com/v2/post/publish/video/init/",
      caption: `🚨 ${topic.slice(0, 90)}! #CyberSecurity #ZeroDay #InfoSec #TechTok #NajeebCyber`,
      privacyLevel: "PUBLIC_TO_EVERYONE",
      allowComment: true,
      allowDuet: true,
      allowStitch: true
    },
    instagramReels: {
      platform: "Instagram Reels",
      endpoint: "https://graph.facebook.com/v19.0/{ig-user-id}/media",
      mediaType: "REELS",
      caption: `🚨 ${topic}\n\nKey Action: Audit logs & enforce MFA immediately.\n\nFollow @NajeebCyber for daily threat bulletins.\n.\n.\n.#cybersecurity #infosec #zeroday #cyberattack #reels #najeebcyber`,
      coverFrameTimestampMs: 3000
    },
    linkedIn: {
      platform: "LinkedIn Video Post",
      endpoint: "https://api.linkedin.com/v2/assets?action=registerUpload",
      postAuthor: "urn:li:organization:najeebcyber",
      commentary: `🛡️ CYBER THREAT ADVISORY: ${topic}\n\nOur SOC threat radar highlights potential zero-day risks. Organizations are advised to enforce Zero-Trust controls and audit endpoint access logs.\n\n#CyberSecurity #RiskManagement #CISO #InfoSec #NajeebCyber`,
      visibility: "PUBLIC"
    },
    xTwitter: {
      platform: "X (Twitter)",
      endpoint: "https://upload.twitter.com/1.1/media/upload.json",
      tweetText: `🚨 BREAKING CYBER ALERT: ${topic.slice(0, 140)}\n\nFollow @NajeebCyber for live updates. #CyberSecurity #ZeroDay #InfoSec`
    }
  }
};

const jsonFile = path.join(uploadsDir, `${topicSlug}_social_dispatch_${timestamp}.json`);
const mdFile = path.join(uploadsDir, `${topicSlug}_social_dispatch_${timestamp}.md`);

let mdText = `# 📡 NCAS Social Media Auto-Publishing Dispatch Package\n\n`;
mdText += `**Topic:** ${topic}  \n`;
mdText += `**Handle:** \`@NajeebCyber\`  \n`;
mdText += `**Generated At:** ${new Date().toLocaleString()}  \n\n`;
mdText += `---\n\n`;

Object.keys(dispatchPackage.platforms).forEach(key => {
  const p = dispatchPackage.platforms[key];
  const headline = p.videoTitle || p.tweetText || (p.caption ? p.caption.slice(0, 60) : 'Social Post');
  mdText += `## 🌐 ${p.platform}\n`;
  mdText += `- **Endpoint:** \`${p.endpoint}\`  \n`;
  mdText += `- **Title / Headline:** ${headline}  \n`;
  mdText += `- **Payload Format:** JSON API v2/v3  \n\n`;
});

fs.writeFileSync(jsonFile, JSON.stringify(dispatchPackage, null, 2));
fs.writeFileSync(mdFile, mdText);

console.log(`✓ Social publication dispatch package prepared successfully!`);
console.log(`📄 Markdown Spec: ${mdFile}`);
console.log(`📊 JSON Spec:     ${jsonFile}\n`);

console.log(`-------------------------------------------------------------`);
console.log(` 📡 YOUTUBE SHORTS DISPATCH PREVIEW:`);
console.log(`-------------------------------------------------------------`);
console.log(`Title:       ${dispatchPackage.platforms.youtubeShorts.videoTitle}`);
console.log(`Description: ${dispatchPackage.platforms.youtubeShorts.description.slice(0, 120)}...`);
console.log(`-------------------------------------------------------------\n`);
