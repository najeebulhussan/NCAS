const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse CLI Arguments
const args = process.argv.slice(2);
let intervalMinutes = 60;
let runOnce = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--interval' && args[i + 1]) {
    intervalMinutes = parseInt(args[i + 1], 10) || 60;
    i++;
  } else if (args[i] === '--once') {
    runOnce = true;
  }
}

const logsDir = path.join(__dirname, '../output/daemon_logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
const daemonLogFile = path.join(logsDir, 'ncas_daemon.log');

function logMessage(msg) {
  const timestamp = new Date().toLocaleString();
  const formatted = `[${timestamp}] ${msg}`;
  console.log(formatted);
  fs.appendFileSync(daemonLogFile, formatted + '\n');
}

logMessage(`=============================================================`);
logMessage(` 🔄 NCAS 24/7 AUTONOMOUS NEWSROOM DAEMON STARTED`);
logMessage(`=============================================================`);
logMessage(`Interval:   Every ${intervalMinutes} minutes`);
logMessage(`Run Mode:   ${runOnce ? 'SINGLE RUN (--once)' : 'CONTINUOUS 24/7 LOOP'}`);
logMessage(`Target:     https://github.com/najeebulhussan/NCAS\n`);

async function executeBroadcastCycle() {
  logMessage(`🚀 [Cycle Start] Executing Autonomous Broadcast Production Cycle...`);

  try {
    // 1. Run CISA Watchdog
    logMessage(`-> Step 1: Running CISA & NIST CVE Watchdog Daemon...`);
    execSync(`node scripts/cisa_watchdog.js`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    // 2. Run 9-Step Master Studio Pipeline
    logMessage(`-> Step 2: Running 9-Step Master Studio Broadcast Pipeline...`);
    execSync(`node scripts/run_all_studio.js`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    logMessage(`✅ [Cycle Complete] Broadcast production cycle executed & synced to GitHub!`);
  } catch (err) {
    logMessage(`❌ [Cycle Error] ${err.message}`);
  }
}

async function startDaemon() {
  await executeBroadcastCycle();

  if (runOnce) {
    logMessage(`👋 Single run complete. Exiting daemon.`);
    process.exit(0);
  }

  logMessage(`\n⏰ Daemon sleeping for ${intervalMinutes} minutes... Next cycle scheduled.`);
  setInterval(async () => {
    logMessage(`\n⏰ [Scheduled Trigger] Starting new broadcast cycle...`);
    await executeBroadcastCycle();
  }, intervalMinutes * 60 * 1000);
}

startDaemon();
