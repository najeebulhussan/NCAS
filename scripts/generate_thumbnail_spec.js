const fs = require('fs');
const path = require('path');

// Parse CLI Arguments
const args = process.argv.slice(2);
let topic = 'Critical Cyber Attack Alert';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--topic' && args[i + 1]) {
    topic = args[i + 1];
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 🖼️ NCAS HIGH-CTR THUMBNAIL & COVER SPEC GENERATOR`);
console.log(`=============================================================`);
console.log(`Target Broadcast Topic: "${topic}"\n`);

const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(__dirname, '../output/thumbnails');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 3 High-CTR Thumbnail Prompts & Design Specs
const thumbnailPackage = {
  metadata: {
    project: "NajeebCyber AI Studio (NCAS)",
    handle: "@NajeebCyber",
    topic: topic,
    aspectRatio: "9:16 (Shorts/Reels/TikTok Cover) & 16:9 (YouTube Video Thumbnail)",
    generatedAt: new Date().toISOString()
  },
  variants: [
    {
      variantId: 1,
      styleName: "Red Alert Newsroom Anchor (Highest CTR)",
      overlayText: topic.toUpperCase().slice(0, 24),
      badgeText: "BREAKING ALERT",
      colorPalette: "Cyber Navy (#0B132B), Neon Red (#FF0055), Electric Cyan (#00F0FF)",
      imagePromptMidjourney: `Photorealistic 3D AI news anchor in sleek navy tech suit standing in futuristic cyber studio, giant glowing red warning hologram overlay reading "${topic.toUpperCase().slice(0, 20)}", world attack map in background, cinematic studio lighting, volumetric light rays, 8k resolution, hyperrealistic --ar 9:16 --style raw --v 6.0`,
      dallePrompt: `A high-impact vertical short cover for a cybersecurity broadcast titled "${topic}". Features a photorealistic male AI news anchor in a modern dark navy blazer with a glowing cyan cyber pin, pointing at a large 3D neon red warning emblem with glowing digital matrix code background. High contrast, sharp broadcast lighting, 9:16 aspect ratio.`
    },
    {
      variantId: 2,
      styleName: "Holographic Globe Exploit Heatmap",
      overlayText: "GLOBAL CYBER THREAT",
      badgeText: "CRITICAL",
      colorPalette: "Electric Blue (#00F0FF), Crimson Red (#FF2A6D), Dark Onyx (#040814)",
      imagePromptMidjourney: `A futuristic 3D holographic digital globe exploding with red cyber attack laser lines and glowing cyan data streams, ultra-detailed 3D floating glass text reading "${topic.toUpperCase().slice(0, 20)}", dark reflective newsroom floor, sci-fi studio aesthetic, 8k resolution --ar 9:16 --v 6.0`,
      dallePrompt: `A futuristic 9:16 vertical cover image showing a glowing blue 3D holographic globe with neon red laser vectors indicating a global cyber attack. Bold 3D metallic text reading "${topic}" floats in front with intense cyan glow and dark cyber grid background.`
    },
    {
      variantId: 3,
      styleName: "3D Metallic Cyber Shield Breach",
      overlayText: "EXPLOIT DETECTED",
      badgeText: "URGENT PATCH",
      colorPalette: "Chrome Silver, Neon Red, Deep Cyber Navy",
      imagePromptMidjourney: `Cinematic 3D metallic cyber security shield cracking open with glowing red digital lightning, matrix code fragments floating in space, high action, volumetric fog, dramatic news broadcast lighting, 8k render --ar 9:16 --style raw --v 6.0`,
      dallePrompt: `A high-action vertical 9:16 thumbnail featuring a glowing 3D chrome cyber defense shield cracked by red digital lightning, with bold glowing text reading "${topic}". Modern high-tech cyber intelligence aesthetic, sharp details.`
    }
  ]
};

// Generate Markdown Format
let mdText = `# 🖼️ NCAS High-CTR Thumbnail & Cover Spec: ${topic}\n\n`;
mdText += `**Project:** NajeebCyber AI Studio (\`@NajeebCyber\`)  \n`;
mdText += `**Topic:** ${topic}  \n`;
mdText += `**Generated At:** ${new Date().toLocaleString()}  \n\n`;
mdText += `---\n\n`;

thumbnailPackage.variants.forEach(v => {
  mdText += `## Variant ${v.variantId}: ${v.styleName}\n\n`;
  mdText += `**Main Text Overlay:** \`${v.overlayText}\`  \n`;
  mdText += `**Badge Tag:** \`${v.badgeText}\`  \n`;
  mdText += `**Color Palette:** ${v.colorPalette}  \n\n`;
  mdText += `### 🎨 Midjourney v6 Prompt:\n\`\`\`text\n${v.imagePromptMidjourney}\n\`\`\`\n\n`;
  mdText += `### 🎨 DALL-E 3 / Google ImageFX Prompt:\n\`\`\`text\n${v.dallePrompt}\n\`\`\`\n\n`;
  mdText += `---\n\n`;
});

const mdFile = path.join(outputDir, `${slug}_thumbnail_spec_${timestamp}.md`);
const jsonFile = path.join(outputDir, `${slug}_thumbnail_spec_${timestamp}.json`);

fs.writeFileSync(mdFile, mdText);
fs.writeFileSync(jsonFile, JSON.stringify(thumbnailPackage, null, 2));

console.log(`✓ Thumbnail & Cover Spec package generated successfully!`);
console.log(`📄 Markdown Spec: ${mdFile}`);
console.log(`📊 JSON Spec: ${jsonFile}\n`);

console.log(`-------------------------------------------------------------`);
console.log(` 🖼️ THUMBNAIL PROMPT PREVIEW (Variant 1 - Red Alert Anchor):`);
console.log(`-------------------------------------------------------------`);
console.log(thumbnailPackage.variants[0].imagePromptMidjourney);
console.log(`-------------------------------------------------------------\n`);
