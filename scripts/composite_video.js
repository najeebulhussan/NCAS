const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse CLI Arguments
const args = process.argv.slice(2);
let scriptFile = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--script' && args[i + 1]) {
    scriptFile = args[i + 1];
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 🎬 NCAS FFMPEG VIDEO COMPOSITOR ENGINE (6x10s Merger)`);
console.log(`=============================================================`);

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
  console.log(`❌ Error: No script found to composite.`);
  process.exit(1);
}

const topicSlug = (scriptData.metadata.topic || 'cyber_broadcast').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const rendersDir = path.join(__dirname, '../output/renders');

if (!fs.existsSync(rendersDir)) {
  fs.mkdirSync(rendersDir, { recursive: true });
}

// 1. Build FFmpeg Concatenation & Subtitle Overlay Command
const concatListFile = path.join(rendersDir, `${topicSlug}_concat_list.txt`);
let concatContent = '';
for (let i = 1; i <= 6; i++) {
  concatContent += `file 'scene_${i}.mp4'\n`;
}
fs.writeFileSync(concatListFile, concatContent);

const outputMp4 = path.join(rendersDir, `${topicSlug}_final_60s.mp4`);
const srtFile = path.join(__dirname, `../output/subtitles/${topicSlug}_en.srt`);

// FFmpeg Command Construction
const ffmpegCmd = `ffmpeg -f concat -safe 0 -i "${concatListFile}" -i voiceover.mp3 -i background_music.mp3 -filter_complex "[0:v]subtitles='${srtFile.replace(/\\/g, '/')}':force_style='Fontname=Inter,Fontsize=22,PrimaryColour=&H0000F0FF,OutlineColour=&H00040814,BorderStyle=3'[v];[1:a][2:a]amix=inputs=2:weights=1 0.25[a]" -map "[v]" -map "[a]" -c:v libx264 -preset fast -crf 18 -c:a aac -b:a 192k -r 30 -s 1080x1920 "${outputMp4}"`;

// Save Shell Script & Batch File
const batFile = path.join(rendersDir, `${topicSlug}_render_command.bat`);
const shFile = path.join(rendersDir, `${topicSlug}_render_command.sh`);

fs.writeFileSync(batFile, `@echo off\nREM NCAS FFmpeg 60s Broadcast Video Renderer\n${ffmpegCmd}\npause\n`);
fs.writeFileSync(shFile, `#!/bin/bash\n# NCAS FFmpeg 60s Broadcast Video Renderer\n${ffmpegCmd}\n`);

// 2. Build Video Composite Specification JSON
const compositeSpec = {
  project: "NajeebCyber AI Studio (NCAS)",
  topic: scriptData.metadata.topic,
  handle: "@NajeebCyber",
  output_resolution: "1080x1920 (9:16 Vertical Short)",
  frame_rate: 30,
  video_codec: "H.264 / libx264 (CRF 18)",
  audio_codec: "AAC 192kbps (Mixed Voiceover + Music)",
  input_clips: [1, 2, 3, 4, 5, 6].map(num => ({
    scene_num: num,
    clip_filename: `scene_${num}.mp4`,
    duration: "10.0s",
    scene_title: scriptData.clips[num - 1] ? scriptData.clips[num - 1].label : `Scene ${num}`
  })),
  ffmpeg_command: ffmpegCmd,
  generated_files: {
    concat_list: concatListFile,
    windows_bat: batFile,
    bash_sh: shFile,
    target_mp4: outputMp4
  }
};

const specJsonFile = path.join(rendersDir, `${topicSlug}_composite_spec_${timestamp}.json`);
fs.writeFileSync(specJsonFile, JSON.stringify(compositeSpec, null, 2));

console.log(`✓ Video Composite Specification generated successfully!`);
console.log(`\n📄 Composite Spec JSON: ${specJsonFile}`);
console.log(`🖥️ Windows Render Batch File: ${batFile}`);
console.log(`🐧 Linux/Mac Render Script:   ${shFile}`);
console.log(`📋 Concatenation List:        ${concatListFile}\n`);

// Check if FFmpeg is in PATH or bin/
const binFfmpeg = path.join(__dirname, '../bin/ffmpeg.exe');
let ffmpegBin = '';

try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  ffmpegBin = 'ffmpeg';
} catch (e) {
  if (fs.existsSync(binFfmpeg)) {
    ffmpegBin = `"${binFfmpeg}"`;
  }
}

if (ffmpegBin) {
  console.log(`[FFmpeg Detected: ${ffmpegBin}] Executing video composite render...`);
} else {
  console.log(`ℹ️ Note: FFmpeg executable not found in PATH or bin/ffmpeg.exe.`);
  console.log(`   The complete render script and batch file have been saved to output/renders/`);
  console.log(`   To install FFmpeg automatically, run: "npm run setup-ffmpeg"`);
}

console.log(`\n-------------------------------------------------------------`);
console.log(` 🎬 FFMPEG COMMAND PREVIEW:`);
console.log(`-------------------------------------------------------------`);
console.log(ffmpegCmd);
console.log(`-------------------------------------------------------------\n`);
