const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../output');
const pdfDir = path.join(outputDir, 'pdf_reports');

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

function getLatestFileInDir(dirPath, ext) {
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith(ext))
    .map(f => ({ name: f, time: fs.statSync(path.join(dirPath, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);
  return files.length > 0 ? path.join(dirPath, files[0].name) : null;
}

const latestScriptFile = getLatestFileInDir(path.join(outputDir, 'scripts'), '.json');
let scriptData = null;

if (latestScriptFile) {
  scriptData = JSON.parse(fs.readFileSync(latestScriptFile, 'utf8'));
} else {
  scriptData = {
    metadata: { topic: 'Global Cyber Attack Surge', topic_slug: 'global_cyber_attack_surge', generated_at: new Date().toISOString() },
    clips: [{ clip_id: 1, duration_sec: 10, heading: 'CRITICAL ALERT', text: 'Urgent cyber security bulletin.' }]
  };
}

const topic = scriptData.metadata.topic || 'Global Cyber Attack Surge';
const topicSlug = scriptData.metadata.topic_slug || 'global_cyber_attack_surge';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// HTML Report Template with Print PDF CSS Styling
const htmlReport = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NCAS Master Production Report - ${topic}</title>
  <style>
    @media print {
      body { background: #fff; color: #000; }
      .no-print { display: none; }
      .page-break { page-break-before: always; }
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      margin: 0;
      padding: 40px;
      background: #070b19;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .header {
      border-bottom: 3px solid #00f0ff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 { color: #00f0ff; font-size: 28px; margin: 0 0 10px 0; }
    .subtitle { font-size: 14px; color: #94a3b8; }
    .badge { background: #00f0ff; color: #040814; padding: 4px 10px; font-weight: bold; border-radius: 4px; font-size: 12px; }
    .section { margin-bottom: 30px; background: rgba(16, 31, 66, 0.5); border: 1px solid rgba(0,240,255,0.2); padding: 20px; border-radius: 8px; }
    h2 { color: #00f0ff; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid rgba(255,255,255,0.1); padding: 10px; text-align: left; font-size: 13px; }
    th { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }
    .code-box { background: #040814; border: 1px solid rgba(0,240,255,0.3); padding: 12px; font-family: monospace; font-size: 12px; border-radius: 6px; overflow-x: auto; color: #7000ff; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <span class="badge">CONFIDENTIAL STUDIO SPEC</span>
    <h1>🎬 NAJEEBCYBER AI STUDIO (NCAS)</h1>
    <div class="subtitle">Master Broadcast Production & Executive Spec Report • <strong>@NajeebCyber</strong></div>
    <div class="subtitle">Topic: <strong>${topic}</strong> | Generated: ${new Date().toLocaleString()}</div>
  </div>

  <div class="section">
    <h2>📋 Executive Summary & Technical Specifications</h2>
    <table>
      <tr><th>Property</th><th>Value</th></tr>
      <tr><td>Target Handle</td><td>@NajeebCyber</td></tr>
      <tr><td>AI Anchor</td><td>@ME (Cyber Security Specialist)</td></tr>
      <tr><td>Aspect Ratio</td><td>9:16 Vertical Video (1080x1920)</td></tr>
      <tr><td>Total Clips</td><td>${(scriptData.clips || []).length} Scene Clips</td></tr>
      <tr><td>Target Languages</td><td>Bilingual English & Urdu (اردو)</td></tr>
      <tr><td>Publishing Platforms</td><td>YouTube Shorts, TikTok, Instagram Reels, LinkedIn, X</td></tr>
    </table>
  </div>

  <div class="section">
    <h2>📜 Teleprompter Script Breakdown</h2>
    <table>
      <tr><th>Clip #</th><th>Time Slot</th><th>Headline</th><th>Script Text</th></tr>
      ${(scriptData.clips || []).map(c => `
        <tr>
          <td>#${c.clip_id}</td>
          <td>${c.duration_sec}s</td>
          <td><strong>${c.heading}</strong></td>
          <td>${c.text}</td>
        </tr>
      `).join('')}
    </table>
  </div>

  <div class="section">
    <h2>🖼️ High-CTR Thumbnail Spec Prompt</h2>
    <div class="code-box">
Photorealistic 3D AI news anchor in sleek navy tech suit standing in futuristic cyber studio, giant glowing red warning hologram overlay reading "${topic}", world attack map in background, cinematic studio lighting, 8k render --ar 9:16 --v 6.0
    </div>
  </div>

  <div class="footer">
    NajeebCyber AI Studio (NCAS) • Operational Report • GitHub: https://github.com/najeebulhussan/NCAS
  </div>
</body>
</html>
`;

const htmlFile = path.join(pdfDir, `${topicSlug}_master_production_report_${timestamp}.html`);
const mdFile = path.join(pdfDir, `${topicSlug}_master_production_report_${timestamp}.md`);

fs.writeFileSync(htmlFile, htmlReport);

const mdContent = `# 🎬 NCAS Master Production & Executive Report
**Topic:** ${topic}
**Channel:** @NajeebCyber
**Generated:** ${new Date().toLocaleString()}

---

### 📊 Broadcast Specifications
- **Format:** 9:16 Vertical Video (1080x1920 @ 30fps)
- **AI Anchor:** @ME (Cyber Security Specialist)
- **Scene Clips:** ${(scriptData.clips || []).length} Scene Clips
- **HTML Report File:** [${path.basename(htmlFile)}](file:///${htmlFile.replace(/\\/g, '/')})

---

### 📜 Teleprompter Script Summary
${(scriptData.clips || []).map(c => `- **Clip ${c.clip_id} (${c.duration_sec}s):** ${c.heading} - *"${c.text}"*`).join('\n')}
`;

fs.writeFileSync(mdFile, mdContent);

console.log(`\n=============================================================`);
console.log(` 📄 NCAS MASTER PDF / HTML PRODUCTION EXPORTER COMPLETE`);
console.log(`=============================================================`);
console.log(`✓ Master Executive Report generated successfully!`);
console.log(`🌐 Printable HTML Spec: ${htmlFile}`);
console.log(`📄 Markdown Summary:    ${mdFile}\n`);
