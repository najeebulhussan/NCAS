const fs = require('fs');
const path = require('path');
const http = require('http');

console.log(`\n=============================================================`);
console.log(` 🩺 NCAS MASTER SYSTEM HEALTH DIAGNOSTIC SUITE`);
console.log(`=============================================================`);

const outputDir = path.join(__dirname, '../output');
const healthDir = path.join(outputDir, 'health_reports');

if (!fs.existsSync(healthDir)) {
  fs.mkdirSync(healthDir, { recursive: true });
}

// Helper to make HTTP GET requests
function checkEndpoint(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function runSystemHealthCheck() {
  const results = [];

  // Check 1: Monorepo Shared Package
  try {
    const { CONTENT_JOB_STATES, AGENT_ROLES } = require('../packages/shared');
    const statesCount = Object.keys(CONTENT_JOB_STATES).length;
    const agentsCount = Object.keys(AGENT_ROLES).length;
    results.push({ check: 'Monorepo Shared Package', status: 'PASS', details: `${statesCount} Job States, ${agentsCount} Agent Roles Loaded` });
  } catch (err) {
    results.push({ check: 'Monorepo Shared Package', status: 'FAIL', details: err.message });
  }

  // Check 2: State Machine Lifecycle Engine
  try {
    const ContentJobStateMachine = require('../packages/workflows/state_machine');
    const job = new ContentJobStateMachine('TEST-001', 'Cyber Security Intake');
    results.push({ check: 'State Machine Engine', status: 'PASS', details: `Initial State: ${job.currentState}` });
  } catch (err) {
    results.push({ check: 'State Machine Engine', status: 'FAIL', details: err.message });
  }

  // Check 3: Base Agent Engine
  try {
    const BaseAgent = require('../packages/agents/base_agent');
    const agent = new BaseAgent('test-id', 'Test Agent', 'Testing');
    results.push({ check: 'Base Agent Swarm Engine', status: 'PASS', details: `Agent Name: ${agent.name}` });
  } catch (err) {
    results.push({ check: 'Base Agent Swarm Engine', status: 'FAIL', details: err.message });
  }

  // Check 4: Platform API Gateway Server
  const apiHealthy = await checkEndpoint('http://localhost:8000/health');
  results.push({
    check: 'Platform API Gateway (Port 8000)',
    status: apiHealthy ? 'PASS' : 'WARN',
    details: apiHealthy ? 'HTTP 200 OK Live' : 'Not running on port 8000 (Start with: npm run api)'
  });

  // Check 5: Creator Studio Web Dashboard Server
  const dashHealthy = await checkEndpoint('http://localhost:786');
  results.push({
    check: 'Web Command Center (Port 786)',
    status: dashHealthy ? 'PASS' : 'WARN',
    details: dashHealthy ? 'HTTP 200 OK Live' : 'Not running on port 786 (Start with: npm start)'
  });

  // Display Diagnostics Table
  console.log(`\n📋 SYSTEM DIAGNOSTICS MATRIX:\n`);
  results.forEach(r => {
    const statusTag = r.status === 'PASS' ? '✓ [PASS]' : r.status === 'WARN' ? '⚠️ [WARN]' : '❌ [FAIL]';
    console.log(`  ${statusTag.padEnd(12)} ${r.check.padEnd(36)} Details: ${r.details}`);
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const jsonFile = path.join(healthDir, `health_report_${timestamp}.json`);
  const mdFile = path.join(healthDir, `health_report_${timestamp}.md`);

  fs.writeFileSync(jsonFile, JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2));

  const mdContent = `# 🩺 NCAS Master System Health Diagnostic Report
**Channel Handle:** @NajeebCyber  
**Generated:** ${new Date().toLocaleString()}  

---

### 📋 Health Matrix Results
| Component | Status | Details |
|-----------|--------|---------|
${results.map(r => `| **${r.check}** | \`${r.status}\` | ${r.details} |`).join('\n')}
`;

  fs.writeFileSync(mdFile, mdContent);

  console.log(`\n=============================================================`);
  console.log(` 🏆 SYSTEM HEALTH DIAGNOSTIC COMPLETED!`);
  console.log(`=============================================================`);
  console.log(`📄 Saved JSON Log: ${jsonFile}`);
  console.log(`📄 Saved MD Report: ${mdFile}\n`);
}

runSystemHealthCheck();
