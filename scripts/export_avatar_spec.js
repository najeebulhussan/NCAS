const fs = require('fs');
const path = require('path');

const scriptsDir = path.join(__dirname, '../output/scripts');
const avatarDir = path.join(__dirname, '../output/avatar_specs');

if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

// Find latest script file
function getLatestScriptFile() {
  if (!fs.existsSync(scriptsDir)) return null;
  const files = fs.readdirSync(scriptsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ name: f, time: fs.statSync(path.join(scriptsDir, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);
  return files.length > 0 ? path.join(scriptsDir, files[0].name) : null;
}

const latestScriptPath = getLatestScriptFile();
let scriptData = null;

if (latestScriptPath) {
  scriptData = JSON.parse(fs.readFileSync(latestScriptPath, 'utf8'));
  console.log(`-> Loaded latest script file: ${latestScriptPath}`);
} else {
  scriptData = {
    metadata: {
      topic: 'Global Cyber Attack Surge',
      topic_slug: 'global_cyber_attack_surge',
      generated_at: new Date().toISOString()
    },
    clips: [
      { clip_id: 1, duration_sec: 10, heading: 'CRITICAL ALERT', text: 'Urgent cyber security bulletin.' }
    ]
  };
}

const topic = scriptData.metadata.topic || 'Global Cyber Threat';
const topicSlug = scriptData.metadata.topic_slug || 'global_cyber_threat';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

const avatarBlueprint = {
  anchor_id: '@ME',
  role: 'AI Cyber Security Lead & Global Threat Specialist',
  channel_handle: '@NajeebCyber',
  character_sheet: {
    gender_presentation: 'Male / Neutral Tech Professional',
    wardrobe: 'Sleek dark navy tech blazer with glowing cyan lapel pin and high-collared black undershirt',
    hair_and_features: 'Sharp groomed hair, focused expressive eyes, professional demeanor',
    studio_environment: 'High-tech virtual SOC newsroom with holographic global attack map and cyber threat counters'
  },
  clip_prompts: (scriptData.clips || []).map((c, i) => {
    const expressions = ['Serious Alert', 'Urgent Concern', 'Technical Focus', 'Warning Warning', 'Action Required', 'Confident Call-to-Action'];
    const expr = expressions[i % expressions.length];
    return {
      clip_number: c.clip_id || (i + 1),
      duration: `${c.duration_sec || 10}s`,
      facial_expression: expr,
      midjourney_v6_prompt: `Photorealistic 3D portrait of @ME AI news anchor wearing dark navy tech suit with glowing cyan lapel pin, expression of ${expr}, standing in futuristic cyber studio with glowing red holographic attack map background reading "${c.heading || 'ALERT'}", vertical 9:16 aspect ratio, cinematic lighting, 8k resolution --ar 9:16 --v 6.0`,
      dall_e_3_prompt: `A high-end 3D visual of a professional cyber analyst anchor named @ME in a futuristic newsroom. Facial expression: ${expr}. The background features a glowing red zero-day threat radar overlay and digital telemetry screens. Vertical 9:16 portrait composition.`
    };
  })
};

const jsonFile = path.join(avatarDir, `${topicSlug}_avatar_spec_${timestamp}.json`);
const mdFile = path.join(avatarDir, `${topicSlug}_avatar_spec_${timestamp}.md`);

fs.writeFileSync(jsonFile, JSON.stringify(avatarBlueprint, null, 2));

const mdContent = `# 🤖 NCAS AI Avatar Visual Asset Blueprint (@ME)
**Topic:** ${topic}
**Anchor Handle:** ${avatarBlueprint.channel_handle}
**Generated:** ${new Date().toLocaleString()}

---

### 👤 Anchor Character Sheet
- **Identity:** ${avatarBlueprint.anchor_id} (${avatarBlueprint.role})
- **Wardrobe:** ${avatarBlueprint.character_sheet.wardrobe}
- **Studio Setting:** ${avatarBlueprint.character_sheet.studio_environment}

---

### 🎨 Scene-by-Scene Midjourney & DALL-E Prompts

${avatarBlueprint.clip_prompts.map(cp => `
#### 🎬 Clip ${cp.clip_number} (${cp.duration}) - Expression: ${cp.facial_expression}
- **Midjourney v6 Prompt:**
  \`\`\`text
  ${cp.midjourney_v6_prompt}
  \`\`\`
- **DALL-E 3 Prompt:**
  \`\`\`text
  ${cp.dall_e_3_prompt}
  \`\`\`
`).join('\n')}
`;

fs.writeFileSync(mdFile, mdContent);

console.log(`\n=============================================================`);
console.log(` 🤖 NCAS AI AVATAR BLUEPRINT EXPORTER COMPLETE`);
console.log(`=============================================================`);
console.log(`✓ AI Avatar Specification generated successfully!`);
console.log(`📄 JSON Spec:     ${jsonFile}`);
console.log(`📄 Markdown Spec: ${mdFile}\n`);
