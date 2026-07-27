// NajeebCyber AI Studio (NCAS) - Dashboard Controller

document.addEventListener('DOMContentLoaded', () => {
  initAgents();
  initTabs();
  initTeleprompter();
  initPrompts();
  initFormats();
  initRadarCanvas();
});

// 1. Render 12 AI Subagents
function initAgents() {
  const agents = [
    { name: "Chief AI Agent", role: "Project Director & QA", icon: "fa-crown" },
    { name: "Trend Hunter", role: "News Discovery & Virality", icon: "fa-magnifying-glass-chart" },
    { name: "Fact Checker", role: "Verification & CVE Check", icon: "fa-user-check" },
    { name: "OSINT Intelligence", role: "Deep Tech & Threat Actor", icon: "fa-spider" },
    { name: "Scriptwriter", role: "OmniFlash Copywriter", icon: "fa-pen-nib" },
    { name: "Visual Director", role: "Studio Scene Planner", icon: "fa-film" },
    { name: "Motion Graphics", role: "Lower-Thirds & Ticker", icon: "fa-vector-square" },
    { name: "Voice & Audio", role: "Voiceover & Ambience", icon: "fa-microphone" },
    { name: "Video Render", role: "Automated Compositing", icon: "fa-clapperboard" },
    { name: "Social Publisher", role: "Multi-Platform Scheduler", icon: "fa-share-nodes" },
    { name: "Analytics Agent", role: "Retention Optimization", icon: "fa-chart-line" },
    { name: "Brand Guardian", role: "Community Trust & Handles", icon: "fa-shield-cat" }
  ];

  const agentContainer = document.getElementById('agentList');
  agentContainer.innerHTML = agents.map(a => `
    <div class="agent-item">
      <div class="agent-info">
        <div class="agent-icon"><i class="fa-solid ${a.icon}"></i></div>
        <div>
          <div class="agent-name">${a.name}</div>
          <div class="agent-role">${a.role}</div>
        </div>
      </div>
      <div class="agent-dot"></div>
    </div>
  `).join('');
}

// 2. Navigation Tabs Switcher
function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// 3. Teleprompter & Video Telecast Simulation
const scriptData = [
  {
    time: "00:00 - 00:06",
    label: "INTRO",
    text: "Welcome to Weekly Cyber News. I'm @ME, bringing you this week's biggest cybersecurity stories from around the world.",
    lowerThird: "WEEKLY CYBER NEWS BULLETIN",
    notes: "Visual: Studio Reveal • Zoom toward avatar • Lower third active"
  },
  {
    time: "00:06 - 00:20",
    label: "STORY 1",
    text: "First up: Security researchers reveal that phishing attacks are rapidly evolving. Cybercriminals are moving beyond static login pages to real-time session hijacking, bypassing traditional multi-factor authentication in seconds.",
    lowerThird: "Phishing Attacks Evolve Into Real-Time Account Hijacking",
    notes: "Visual: Digital phishing dashboard • Red warning graphics • Phishing email animation"
  },
  {
    time: "00:20 - 00:36",
    label: "STORY 2",
    text: "In AI security news: Reports highlight rising concerns as autonomous AI agents demonstrate capabilities to scan, exploit, and breach vulnerable web endpoints without human intervention, sparking fresh urgency for AI defense frameworks.",
    lowerThird: "AI Models Hack Tech Startups in Unprecedented Event",
    notes: "Visual: AI brain neural network • Firewall breach graphics • Cyber defense shield"
  },
  {
    time: "00:36 - 00:50",
    label: "STORY 3",
    text: "And globally: Security agencies warn organizations worldwide about escalating identity attacks and credential stuffing. Experts urge businesses to enforce zero-trust policies and patch critical infrastructure immediately.",
    lowerThird: "Global Cyber Threat Landscape Intensifies",
    notes: "Visual: Global threat heatmap • SOC analyst dashboard • Threat intelligence feeds"
  },
  {
    time: "00:50 - 01:00",
    label: "OUTRO",
    text: "That's your Weekly Cyber News update. Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for more updates. I'm @ME, see you in the next bulletin.",
    lowerThird: "Follow @NajeebCyber for Daily Updates",
    notes: "Visual: Studio Outro • Rotating blue holographic globe • Social panel"
  }
];

let tpTimer = null;
let tpSeconds = 0;
const totalSeconds = 60;

function initTeleprompter() {
  const scriptContainer = document.getElementById('scriptSectionsContainer');
  scriptContainer.innerHTML = scriptData.map(s => `
    <div class="script-block">
      <div class="sb-header">
        <span>${s.label}</span>
        <span class="sb-time">${s.time}</span>
      </div>
      <div class="sb-body">"${s.text}"</div>
      <div class="sb-notes"><i class="fa-solid fa-camera"></i> ${s.notes}</div>
    </div>
  `).join('');

  document.getElementById('btnPlayTp').addEventListener('click', playTp);
  document.getElementById('btnPauseTp').addEventListener('click', pauseTp);
  document.getElementById('btnResetTp').addEventListener('click', resetTp);
  document.getElementById('btnCopyScript').addEventListener('click', () => {
    const fullText = scriptData.map(s => `[${s.time}] ${s.label}: ${s.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    alert('Full script copied to clipboard!');
  });
}

function playTp() {
  if (tpTimer) return;
  tpTimer = setInterval(() => {
    if (tpSeconds < totalSeconds) {
      tpSeconds++;
      updateTpUI();
    } else {
      pauseTp();
    }
  }, 1000);
}

function pauseTp() {
  clearInterval(tpTimer);
  tpTimer = null;
}

function resetTp() {
  pauseTp();
  tpSeconds = 0;
  updateTpUI();
}

function updateTpUI() {
  const percent = (tpSeconds / totalSeconds) * 100;
  document.getElementById('tpProgress').style.width = percent + '%';
  document.getElementById('tpTimer').innerText = `00:${tpSeconds < 10 ? '0' + tpSeconds : tpSeconds} / 00:60`;

  // Find active story segment
  let currentSegment = scriptData[0];
  if (tpSeconds >= 6 && tpSeconds < 20) currentSegment = scriptData[1];
  else if (tpSeconds >= 20 && tpSeconds < 36) currentSegment = scriptData[2];
  else if (tpSeconds >= 36 && tpSeconds < 50) currentSegment = scriptData[3];
  else if (tpSeconds >= 50) currentSegment = scriptData[4];

  document.getElementById('tpText').innerText = `[${currentSegment.time}] ${currentSegment.text}`;
  document.getElementById('previewLowerThird').querySelector('.lt-title').innerText = currentSegment.lowerThird;
}

// 4. Master Prompts Code Blocks
function initPrompts() {
  const omniCode = `# MASTER OMNIFLASH AGENT PROMPT (v2.0)
ROLE: Award-winning AI News Director & Cyber Security Broadcast Specialist.
OBJECTIVE: Produce 60s Vertical Video Script & Asset Package (@NajeebCyber).
FORMAT: Vertical (9:16) • Duration: 60 Seconds
PALETTE: Cyber Blue (#0B132B), Electric Cyan (#00F0FF), Alert Red (#FF0055).
ANCHOR: @ME (AI Avatar Anchor in sleek tech navy suit)
STUDIO: High-tech virtual studio with world attack heatmap, glowing digital globe & lower thirds.`;

  const avatarCode = `# MASTER PROMPT – 1 Min Weekly Cyber News (AI Avatar Anchor)
INTRO (0-6s): "Welcome to Weekly Cyber News. I'm @ME, bringing you this week's biggest cybersecurity stories..."
STORY 1 (6-20s): "Phishing attacks are rapidly evolving into real-time session hijacking..."
STORY 2 (20-36s): "Autonomous AI agents demonstrate capabilities to scan, exploit, and breach vulnerable endpoints..."
STORY 3 (36-50s): "Global cyber threat landscape intensifies with rising identity attacks..."
OUTRO (50-60s): "Stay informed, stay protected. Follow @NajeebCyber for daily updates."`;

  document.getElementById('codeOmni').innerText = omniCode;
  document.getElementById('codeAvatar').innerText = avatarCode;

  document.getElementById('btnCopyOmni').addEventListener('click', () => {
    navigator.clipboard.writeText(omniCode);
    alert('Master OmniFlash prompt copied!');
  });
  document.getElementById('btnCopyAvatar').addEventListener('click', () => {
    navigator.clipboard.writeText(avatarCode);
    alert('Avatar master prompt copied!');
  });
}

// 5. 20 High-Growth Video Formats Render
function initFormats() {
  const formats = [
    { title: "Cyber Attack Explained in 60s", desc: "Rapid breakdown of a major corporate breach using visual attack chains." },
    { title: "Threat Level Meter", desc: "Live rating of global cyber threat level with top precautions." },
    { title: "Should You Care?", desc: "Direct consumer assessment of new OS patches or zero-day bugs." },
    { title: "Cyber Attack Heatmap", desc: "Highlighting real-time DDoS or ransomware surges globally." },
    { title: "What Happened Next?", desc: "The aftermath of famous historic or recent breaches." },
    { title: "AI Attack Visualizations", desc: "Visualizing abstract concepts like prompt injection or password spraying." },
    { title: "Cyber Scoreboard", desc: "Comparing security postures of major tech giants." },
    { title: "Hack of the Week", desc: "Weekly deep-dive into the single biggest security story." },
    { title: "AI Risk Meter", desc: "Rating consumer AI tools on privacy and data exposure risks." },
    { title: "In One Sentence", desc: "Summarizing 5 complex security news items in 5 punchy lines." },
    { title: "Live Threat Counter", desc: "Displaying real-time estimated financial damage or leak stats." },
    { title: "Cyber Myth vs Reality", desc: "Debunking common security misconceptions." },
    { title: "OSINT Corner", desc: "How ethical hackers use public intelligence to find data leaks." },
    { title: "Security Tip of the Week", desc: "15-second actionable security hygiene advice." },
    { title: "Cyber Timeline", desc: "Chronological animation showing how a breach unfolded over 48h." },
    { title: "Who Was Affected?", desc: "Simple breakdown of affected apps, OS, or user bases." },
    { title: "Attack Chain Animation", desc: "3D visual step-by-step from Phishing to Data Exfiltration." },
    { title: "Weekly Top 5 Countdown", desc: "Rapid-fire countdown of the week's top stories." },
    { title: "Interactive Audience Poll", desc: "Poll-style short asking viewers to guess the vulnerability." },
    { title: "Flagship AI Anchor Broadcast", desc: "The flagship 60-second news bulletin hosted by @ME." }
  ];

  const grid = document.getElementById('formatsGrid');
  grid.innerHTML = formats.map((f, i) => `
    <div class="format-card">
      <div class="format-num">#${i + 1}</div>
      <div class="format-title">${f.title}</div>
      <div class="format-desc">${f.desc}</div>
    </div>
  `).join('');
}

// 6. SOC Threat Radar Canvas Simulation
function initRadarCanvas() {
  const canvas = document.getElementById('radarCanvas');
  const ctx = canvas.getContext('2d');
  const logList = document.getElementById('radarLogList');

  // Resize canvas
  function resize() {
    canvas.width = canvas.parentElement.clientWidth - 320;
    canvas.height = 400;
  }
  resize();
  window.addEventListener('resize', resize);

  let angle = 0;
  const blips = [];
  const threatTypes = ["Ransomware Pulse", "Phishing Campaign", "Zero-Day Exploit", "DDoS Surge", "Credential Leak"];
  const regions = ["US-EAST", "EU-CENTRAL", "AP-SOUTH", "LATAM-NORTH", "MENA-SOC"];

  setInterval(() => {
    if (Math.random() > 0.4) {
      const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const ip = `${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}`;

      blips.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        alpha: 1.0,
        radius: Math.random() * 6 + 4
      });

      const li = document.createElement('li');
      li.className = 'log-item';
      li.innerHTML = `[${new Date().toLocaleTimeString()}] ${type} detected in ${region} (${ip})`;
      logList.insertBefore(li, logList.firstChild);
      if (logList.children.length > 20) logList.removeChild(logList.lastChild);
    }
  }, 1200);

  function draw() {
    ctx.fillStyle = '#040814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;

    // Draw Radar Circles
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let r = 1; r <= 4; r++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (maxRadius / 4) * r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(centerX - maxRadius, centerY);
    ctx.lineTo(centerX + maxRadius, centerY);
    ctx.moveTo(centerX, centerY - maxRadius);
    ctx.lineTo(centerX, centerY + maxRadius);
    ctx.stroke();

    // Radar Sweep Line
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(maxRadius, 0);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    angle += 0.03;

    // Draw Blips
    for (let i = blips.length - 1; i >= 0; i--) {
      const b = blips[i];
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 85, ${b.alpha})`;
      ctx.fill();
      b.alpha -= 0.008;
      if (b.alpha <= 0) blips.splice(i, 1);
    }

    requestAnimationFrame(draw);
  }

  draw();
}
