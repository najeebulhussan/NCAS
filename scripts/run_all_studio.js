const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log(`\n=============================================================`);
console.log(` 🏆 NAJEEBCYBER AI STUDIO (NCAS) - MASTER FULL STUDIO RUN`);
console.log(`=============================================================`);
console.log(`Start Time: ${new Date().toLocaleString()}\n`);

const cwd = path.join(__dirname, '..');

function runStep(stepNum, stepName, command) {
  console.log(`\n-------------------------------------------------------------`);
  console.log(` [STEP ${stepNum}/6] ${stepName.toUpperCase()}`);
  console.log(` Command: ${command}`);
  console.log(`-------------------------------------------------------------`);
  try {
    execSync(command, { stdio: 'inherit', cwd: cwd });
    console.log(`✓ Step ${stepNum} Completed Successfully!`);
  } catch (err) {
    console.error(`❌ Step ${stepNum} Warning/Error: ${err.message.slice(0, 150)}`);
  }
}

async function masterRun() {
  // Step 1: Chat Resource Sync Engine
  runStep(1, "Live Chat Resource Sync", "node scripts/fetch_chat_updates.js");

  // Step 2: 1-Click Broadcast Pipeline
  runStep(2, "End-to-End Broadcast Pipeline (6x10s Google Flow Clips)", "node scripts/render_pipeline.js --live");

  // Step 3: Bilingual Urdu & English Translator
  runStep(3, "Bilingual Urdu (اردو) & English Translator Engine", "node scripts/translate_script.js");

  // Step 4: Subtitle & Caption Exporter (.SRT / .VTT)
  runStep(4, "Subtitle & Caption Exporter (.SRT & .VTT Tracks)", "node scripts/export_subtitles.js");

  // Step 5: High-CTR Thumbnail & Cover Spec Generator
  runStep(5, "High-CTR Thumbnail & Cover Spec Generator", "node scripts/generate_thumbnail_spec.js --topic \"Live Cyber Threat Digest\"");

  // Step 6: FFmpeg Video Compositor & Render Spec
  runStep(6, "FFmpeg Video Compositor (6x10s Video + Subtitles + Audio)", "node scripts/composite_video.js");

  // Step 7: Git Sync & Status Report
  runStep(7, "GitHub Sync & Repository Status Check", "git add . && git commit -m \"chore(studio): master end-to-end run complete\" && git push origin main");

  console.log(`\n=============================================================`);
  console.log(` 🏆 NCAS MASTER FULL STUDIO RUN COMPLETED!`);
  console.log(`=============================================================`);
  console.log(`Web Dashboard Live: http://localhost:786`);
  console.log(`GitHub Repository:  https://github.com/najeebulhussan/NCAS`);
  console.log(`Finished At:        ${new Date().toLocaleString()}\n`);
}

masterRun();
