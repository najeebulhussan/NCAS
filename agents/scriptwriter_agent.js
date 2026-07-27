const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` ✍️ NCAS AGENT 5: BROADCAST SCRIPTWRITER (OMNIFLASH LEAD)`);
console.log(`=============================================================`);

const agentLogsDir = path.join(__dirname, '../output/agent_logs');
const osintFile = path.join(agentLogsDir, 'osint_output.json');

let osintData = null;
if (fs.existsSync(osintFile)) {
  osintData = JSON.parse(fs.readFileSync(osintFile, 'utf8'));
  console.log(`-> Loaded OSINT Payload: ${osintData.target_topic}`);
} else {
  osintData = { target_topic: 'Global Cyber Attack Surge', attack_vector: 'Zero-Day RCE' };
}

const topic = osintData.target_topic;

const scriptPayload = {
  agent: 'Broadcast Scriptwriter Agent',
  generated_at: new Date().toISOString(),
  master_prompt_version: 'v2.1 OmniFlash',
  topic: topic,
  total_duration_sec: 60,
  clips: [
    {
      clip_id: 1,
      duration_sec: 10,
      heading: 'CRITICAL SECURITY BULLETIN',
      lowerThird: 'BREAKING: URGENT CYBER SECURITY BULLETIN',
      text: `Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin on a breaking exploit.`
    },
    {
      clip_id: 2,
      duration_sec: 10,
      heading: 'ZERO-DAY EXPLOIT DISCOVERED',
      lowerThird: 'THREAT: ZERO-DAY EXPLOIT ACTIVE',
      text: `Security researchers have identified an active zero-day attack targeting core infrastructure servers worldwide.`
    },
    {
      clip_id: 3,
      duration_sec: 10,
      heading: 'ATTACK VECTOR TIMELINE',
      lowerThird: 'VECTOR: REMOTE CODE EXECUTION',
      text: `The exploit utilizes an unauthenticated API endpoint to execute remote code with elevated system privileges.`
    },
    {
      clip_id: 4,
      duration_sec: 10,
      heading: 'THREAT ACTOR PROFILE',
      lowerThird: 'APT PROFILE: ADVANCED THREAT GROUP',
      text: `Cyber intelligence attributes this campaign to sophisticated state-sponsored threat actors using custom malware.`
    },
    {
      clip_id: 5,
      duration_sec: 10,
      heading: 'IMMEDIATE PATCH ACTION',
      lowerThird: 'ACTION: APPLY EMERGENCY PATCH IMMEDIATELY',
      text: `CISA has issued an emergency directive ordering all organizations to apply security patches immediately.`
    },
    {
      clip_id: 6,
      duration_sec: 10,
      heading: 'OUTRO & COMMUNITY CTA',
      lowerThird: 'FOLLOW @NAJEEBCYBER FOR REAL-TIME ALERTS',
      text: `Stay protected, patch your systems, and follow @NajeebCyber for continuous 24/7 zero-day alerts.`
    }
  ]
};

const outFile = path.join(agentLogsDir, 'scriptwriter_output.json');
fs.writeFileSync(outFile, JSON.stringify(scriptPayload, null, 2));

console.log(`✓ 60-Second Broadcast Script Copywritten! (${scriptPayload.clips.length} Scene Clips)`);
console.log(`📜 Topic: "${topic}"`);
console.log(`📄 Saved Scriptwriter Payload: ${outFile}\n`);
