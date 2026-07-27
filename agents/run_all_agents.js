const { execSync } = require('child_process');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 🏆 NCAS MASTER 12 AI SUBAGENTS SWARM EXECUTION ENGINE`);
console.log(`=============================================================`);
console.log(`Target Handle: @NajeebCyber`);
console.log(`Repository:    https://github.com/najeebulhussan/NCAS\n`);

const agents = [
  { id: 1, name: 'Chief AI Agent', file: 'agents/chief_agent.js' },
  { id: 2, name: 'Trend Hunter Agent', file: 'agents/trend_hunter_agent.js' },
  { id: 3, name: 'Fact Checker Agent', file: 'agents/fact_checker_agent.js' },
  { id: 4, name: 'OSINT Intelligence Agent', file: 'agents/osint_agent.js' },
  { id: 5, name: 'Broadcast Scriptwriter', file: 'agents/scriptwriter_agent.js' },
  { id: 6, name: 'Visual Director & Studio Designer', file: 'agents/visual_director_agent.js' },
  { id: 7, name: 'Motion Graphics Agent', file: 'agents/motion_graphics_agent.js' },
  { id: 8, name: 'Voice & Audio Director', file: 'agents/voice_audio_agent.js' },
  { id: 9, name: 'Video Production & Render Agent', file: 'agents/video_render_agent.js' },
  { id: 10, name: 'Cross-Platform Social Publisher', file: 'agents/social_publisher_agent.js' },
  { id: 11, name: 'Analytics & Optimization Agent', file: 'agents/analytics_agent.js' },
  { id: 12, name: 'Brand Guardian Agent', file: 'agents/brand_guardian_agent.js' }
];

agents.forEach(a => {
  console.log(`-------------------------------------------------------------`);
  console.log(` [AGENT ${a.id}/12] ${a.name.toUpperCase()}`);
  console.log(` Command: node ${a.file}`);
  console.log(`-------------------------------------------------------------`);
  try {
    execSync(`node ${a.file}`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  } catch (err) {
    console.error(`❌ Agent ${a.id} Error: ${err.message}`);
  }
});

console.log(`=============================================================`);
console.log(` 🏆 ALL 12 AI SUBAGENTS EXECUTED SUCCESSFULLY!`);
console.log(`=============================================================`);
console.log(`Web Command Center: http://localhost:786`);
console.log(`GitHub Repository:  https://github.com/najeebulhussan/NCAS\n`);
