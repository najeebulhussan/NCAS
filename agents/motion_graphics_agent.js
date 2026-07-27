const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 📺 NCAS AGENT 7: MOTION GRAPHICS & LOWER-THIRDS AGENT`);
console.log(`=============================================================`);

const agentLogsDir = path.join(__dirname, '../output/agent_logs');
const scriptFile = path.join(agentLogsDir, 'scriptwriter_output.json');

let scriptData = null;
if (fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
  scriptData = { clips: [] };
}

const motionPayload = {
  agent: 'Motion Graphics & Lower-Thirds Agent',
  formatted_at: new Date().toISOString(),
  threat_level: 'CRITICAL_RED_ALERT',
  ticker_text: '🚨 BREAKING SECURITY ALERT: GLOBAL ZERO-DAY EXPLOIT ACTIVE • PATCH IMMEDIATELY • @NAJEEBCYBER',
  lower_thirds: (scriptData.clips || []).map(c => ({
    clip_id: c.clip_id,
    title: c.heading || 'SECURITY ALERT',
    subtitle: c.lowerThird || 'Live Broadcast • @NajeebCyber',
    color_palette: 'Cyan (#00F0FF) / Red (#FF0055) / Navy (#040814)'
  }))
};

const outFile = path.join(agentLogsDir, 'motion_graphics_output.json');
fs.writeFileSync(outFile, JSON.stringify(motionPayload, null, 2));

console.log(`✓ Broadcast Motion Graphics & Tickers Formatted!`);
console.log(`🚨 Threat Level: ${motionPayload.threat_level}`);
console.log(`📄 Saved Motion Graphics Payload: ${outFile}\n`);
