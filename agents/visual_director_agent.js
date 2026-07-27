const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 🎨 NCAS AGENT 6: VISUAL DIRECTOR & STUDIO DESIGNER`);
console.log(`=============================================================`);

const agentLogsDir = path.join(__dirname, '../output/agent_logs');
const scriptFile = path.join(agentLogsDir, 'scriptwriter_output.json');

let scriptData = null;
if (fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
  console.log(`-> Loaded Scriptwriter Payload: ${scriptData.topic}`);
} else {
  scriptData = { topic: 'Global Cyber Attack Surge', clips: [] };
}

const visualPayload = {
  agent: 'Visual Director & Studio Designer Agent',
  designed_at: new Date().toISOString(),
  anchor_id: '@ME',
  studio_environment: 'Virtual Cyber Newsroom with 3D Holographic World Attack Heatmap',
  scene_visual_prompts: (scriptData.clips || []).map(c => ({
    clip_id: c.clip_id,
    duration: `${c.duration_sec}s`,
    heading: c.heading,
    midjourney_v6_prompt: `Photorealistic 3D portrait of @ME AI news anchor in dark navy tech suit standing in futuristic cyber studio, giant glowing red warning hologram overlay reading "${c.heading}", world attack map background, cinematic lighting, 8k render --ar 9:16 --v 6.0`,
    dall_e_3_prompt: `A high-end 3D newsroom scene featuring AI anchor @ME with a glowing red cyber threat alert reading "${c.heading}". 9:16 vertical orientation.`
  }))
};

const outFile = path.join(agentLogsDir, 'visual_director_output.json');
fs.writeFileSync(outFile, JSON.stringify(visualPayload, null, 2));

console.log(`✓ Visual Storyboard & Prompt Specs Created! (${visualPayload.scene_visual_prompts.length} Clips)`);
console.log(`🎨 Studio Theme: ${visualPayload.studio_environment}`);
console.log(`📄 Saved Visual Director Payload: ${outFile}\n`);
