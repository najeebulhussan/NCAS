const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 🖼️ NCAS THUMBNAIL INTELLIGENCE AGENT`);
console.log(`=============================================================`);

const agentLogsDir = path.join(__dirname, '../output/agent_logs');
if (!fs.existsSync(agentLogsDir)) {
  fs.mkdirSync(agentLogsDir, { recursive: true });
}

const scriptFile = path.join(agentLogsDir, 'scriptwriter_output.json');
let topic = 'Global Cyber Attack Surge';

if (fs.existsSync(scriptFile)) {
  try {
    const s = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
    topic = s.topic || topic;
  } catch (e) {}
}

const thumbnailPayload = {
  agent: 'Thumbnail Intelligence Agent',
  generated_at: new Date().toISOString(),
  channel_handle: '@NajeebCyber',
  target_topic: topic,
  concepts: [
    {
      concept_id: 'A_RED_ALERT_AVATAR',
      headline_text: 'ZERO-DAY ATTACK SURGE!',
      ctr_optimization_notes: 'High-contrast red warning hologram with @ME anchor in focus. Target CTR: >14%',
      midjourney_prompt: `Photorealistic 3D portrait of @ME AI news anchor in dark navy tech suit standing in futuristic cyber studio, giant glowing red warning hologram overlay reading "ZERO-DAY ATTACK SURGE", world attack map background, cinematic lighting, 8k render --ar 9:16 --v 6.0`,
      dall_e_prompt: `A high-end 3D visual of a professional cyber analyst anchor named @ME in a futuristic newsroom. Headline: ZERO-DAY ATTACK SURGE! Vertical 9:16 portrait composition.`
    },
    {
      concept_id: 'B_HOLOGRAPHIC_GLOBE_HEATMAP',
      headline_text: 'GLOBAL INFRASTRUCTURE BREACH',
      ctr_optimization_notes: 'Wide shot of holographic global threat radar with red attack vectors. Target CTR: >12%',
      midjourney_prompt: `Wide angle shot of futuristic cyber SOC command center, giant 3D holographic globe with red threat attack streams connecting continents, @ME anchor analyzing digital telemetry screens --ar 9:16 --v 6.0`,
      dall_e_prompt: `Futuristic SOC command room with 3D holographic earth threat heatmap and cyber security analyst @ME. High contrast cyan and red lighting.`
    }
  ]
};

const outFile = path.join(agentLogsDir, 'thumbnail_intelligence_output.json');
fs.writeFileSync(outFile, JSON.stringify(thumbnailPayload, null, 2));

console.log(`✓ Thumbnail Intelligence Concepts Generated! (${thumbnailPayload.concepts.length} High-CTR Concepts)`);
console.log(`🖼️ Top Concept Headline: "${thumbnailPayload.concepts[0].headline_text}"`);
console.log(`📄 Saved Thumbnail Intelligence Payload: ${outFile}\n`);
