const fs = require('fs');
const path = require('path');

// Parse CLI Arguments
const args = process.argv.slice(2);
let scriptFile = '';
let topic = 'Google Flow Broadcast';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--script' && args[i + 1]) {
    scriptFile = args[i + 1];
    i++;
  } else if (args[i] === '--topic' && args[i + 1]) {
    topic = args[i + 1];
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 🎥 NCAS GOOGLE FLOW RENDER CONFIG EXPORTER (Batch Engine)`);
console.log(`=============================================================`);

let scriptData = null;
const scriptsDir = path.join(__dirname, '../output/scripts');

if (scriptFile && fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
  // Find latest json script in output/scripts
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
  console.log(`-> Generating default Google Flow config for topic: "${topic}"...`);
  // Generate default clips structure
  scriptData = {
    metadata: {
      project: "NajeebCyber AI Studio (NCAS)",
      topic: topic,
      handle: "@NajeebCyber"
    },
    clips: [
      {
        clipId: 1,
        timestamp: "00:00 - 00:10",
        label: "CLIP 1: INTRO & HOOK",
        script: `Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin regarding ${topic}.`,
        flowPrompt: `Ultra-modern Cyber News Studio. Giant LED wall displaying world cyber attack map with glowing blue neon lighting. Camera slowly zooms toward @ME AI Avatar anchor in navy tech suit. 9:16 vertical, photorealistic, 4K render.`,
        lowerThird: `BREAKING NEWS: ${topic.toUpperCase()}`
      },
      {
        clipId: 2,
        timestamp: "00:10 - 00:20",
        label: "CLIP 2: STORY 1A - BREAKING THREAT",
        script: `First up: Security researchers report a major threat vector regarding ${topic}. Cyber teams are monitoring live payloads.`,
        flowPrompt: `Digital threat dashboard, email attack animation, red warning graphics flickering in background, floating glowing headline text. 9:16 vertical.`,
        lowerThird: topic
      },
      {
        clipId: 3,
        timestamp: "00:20 - 00:30",
        label: "CLIP 3: STORY 1B - ATTACK VECTOR",
        script: `Initial reports indicate potential zero-day or credential exploitation risks allowing unauthorized access.`,
        flowPrompt: `B-roll graphic of matrix-style scrolling code, credential theft animation, multi-factor authentication bypass graphic. 9:16 vertical.`,
        lowerThird: "ATTACK VECTOR: Credential Exploitation"
      },
      {
        clipId: 4,
        timestamp: "00:30 - 00:40",
        label: "CLIP 4: STORY 2 - AI THREAT & ZERO-DAY",
        script: `Automated scanning scripts are accelerating exploitation windows, making immediate patch management essential.`,
        flowPrompt: `AI brain neural network animation, firewall breach graphics, glowing blue cyber defense shield. 9:16 vertical.`,
        lowerThird: "AI-POWERED THREAT: Automated Scans"
      },
      {
        clipId: 5,
        timestamp: "00:40 - 00:50",
        label: "CLIP 5: STORY 3 - MITIGATION ADVISORY",
        script: `Organizations are urged to audit access logs, enforce strict multi-factor authentication, and apply vendor security patches immediately.`,
        flowPrompt: `Global threat heatmap, SOC analyst dashboard, threat intelligence feeds, glowing green patch icons. 9:16 vertical.`,
        lowerThird: "ACTION REQUIRED: Enforce Zero-Trust & Patch"
      },
      {
        clipId: 6,
        timestamp: "00:50 - 01:00",
        label: "CLIP 6: OUTRO & CALL TO ACTION",
        script: `Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for more updates. I'm @ME, see you next week.`,
        flowPrompt: `Return to Cyber News Studio with rotating blue holographic globe. Glowing social media follow panel overlay (@NajeebCyber). 9:16 vertical.`,
        lowerThird: "Follow @NajeebCyber for Daily Updates"
      }
    ]
  };
}

// Build Google Flow Batch Engine Config JSON
const flowBatchConfig = {
  workflow_version: "2.1-googleflow-batch",
  engine: "Google Flow / Veo 2",
  global_settings: {
    resolution: [1080, 1920],
    aspect_ratio: "9:16",
    fps: 30,
    color_space: "sRGB",
    default_negative_prompt: "blurry, low quality, distorted, extra limbs, bad lighting, watermark, oversaturated, text artifact",
    voice_actor: "@ME (AI Anchor - Professional Male Broadcast Voice)",
    brand_watermark: "@NajeebCyber"
  },
  project_metadata: scriptData.metadata,
  scenes: scriptData.clips.map((c, i) => ({
    scene_index: i + 1,
    timecode: c.timestamp,
    duration_seconds: 10,
    scene_title: c.label || `Scene ${i + 1}`,
    generation_prompt: c.flowPrompt,
    camera_motion: i === 0 ? "Slow Zoom In" : i === 5 ? "Slow Zoom Out" : "Subtle Pan",
    voiceover_script: c.script,
    graphics_overlay: {
      type: "Lower Third Banner",
      text: c.lowerThird,
      color_theme: i === 0 || i === 1 ? "Alert Red" : "Cyber Cyan",
      font: "Inter-Bold"
    },
    audio_track: {
      background_music: "Cyber Synth News Ambience (-18dB)",
      sfx_cue: c.audioCue || "WHOOSH_TRANSITION_01"
    }
  }))
};

// Write Config File
const slug = (scriptData.metadata.topic || topic).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(__dirname, '../output/flow_configs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, `${slug}_googleflow_batch_${timestamp}.json`);
fs.writeFileSync(outputFile, JSON.stringify(flowBatchConfig, null, 2));

console.log(`✓ Google Flow Render Batch Config generated successfully!`);
console.log(`\n📁 Batch Config File: ${outputFile}\n`);
console.log(`-------------------------------------------------------------`);
console.log(` 🎬 GOOGLE FLOW BATCH CONFIG PREVIEW (${flowBatchConfig.scenes.length} Scenes):`);
console.log(`-------------------------------------------------------------`);
flowBatchConfig.scenes.forEach(s => {
  console.log(`[Scene ${s.scene_index}] ${s.timecode} | ${s.scene_title}`);
  console.log(`   Camera: ${s.camera_motion} | Overlay: "${s.graphics_overlay.text}"`);
  console.log(`   Prompt: ${s.generation_prompt.slice(0, 70)}...\n`);
});
console.log(`-------------------------------------------------------------\n`);
