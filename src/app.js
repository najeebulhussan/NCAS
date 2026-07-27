// NajeebCyber AI Studio (NCAS) - Dashboard Controller

document.addEventListener('DOMContentLoaded', () => {
  initAgents();
  initTabs();
  initTeleprompter();
  initLiveNewsFeed();
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

// 3. Teleprompter & Video Telecast Simulation (Google Flow 10s Clips Standard)
const scriptData = [
  {
    time: "00:00 - 00:10",
    label: "CLIP 1: INTRO & HOOK (10s)",
    text: "Welcome to Weekly Cyber News. I'm @ME, bringing you this week's biggest cybersecurity stories from around the world.",
    lowerThird: "WEEKLY CYBER NEWS BULLETIN",
    notes: "Google Flow Scene 1 (10s): Ultra-modern Cyber News Studio • Giant LED attack heatmap • Camera zooms toward @ME avatar"
  },
  {
    time: "00:10 - 00:20",
    label: "CLIP 2: STORY 1A - BREAKING THREAT (10s)",
    text: "First up: Security researchers reveal that phishing attacks are rapidly evolving into real-time session hijacking.",
    lowerThird: "Phishing Attacks Evolve Into Real-Time Account Hijacking",
    notes: "Google Flow Scene 2 (10s): Digital phishing dashboard • Red warning graphics • Phishing email animation"
  },
  {
    time: "00:20 - 00:30",
    label: "CLIP 3: STORY 1B - ATTACK VECTOR (10s)",
    text: "Attackers bypass traditional multi-factor authentication in seconds using automated proxy relay tools.",
    lowerThird: "ATTACK VECTOR: Real-Time Proxy Session Theft",
    notes: "Google Flow Scene 3 (10s): Matrix-style scrolling code • Credential theft animation • MFA bypass graphic"
  },
  {
    time: "00:30 - 00:40",
    label: "CLIP 4: STORY 2 - AI EXPLOITATION (10s)",
    text: "In AI security: Autonomous AI agents demonstrate capabilities to scan and exploit web endpoints without human intervention.",
    lowerThird: "AI Models Hack Tech Startups in Unprecedented Event",
    notes: "Google Flow Scene 4 (10s): AI brain neural network animation • Firewall breach graphics • Cyber defense shield"
  },
  {
    time: "00:40 - 00:50",
    label: "CLIP 5: STORY 3 - GLOBAL MITIGATION (10s)",
    text: "Security agencies urge businesses to enforce zero-trust policies, audit access logs, and patch critical systems immediately.",
    lowerThird: "MITIGATION: Enforce Zero-Trust & Patch Immediately",
    notes: "Google Flow Scene 5 (10s): Global threat heatmap • SOC analyst dashboard • Threat intelligence feeds"
  },
  {
    time: "00:50 - 01:00",
    label: "CLIP 6: OUTRO & CALL TO ACTION (10s)",
    text: "Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for more updates. I'm @ME, see you next week.",
    lowerThird: "Follow @NajeebCyber for Daily Updates",
    notes: "Google Flow Scene 6 (10s): Return to Cyber Studio • Rotating blue holographic globe • Social media panel overlay"
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
  const omniCode = `# MASTER OMNIFLASH AGENT PROMPT (v2.1 - Google Flow Ready)
ROLE: Award-winning AI News Director & Cyber Security Broadcast Specialist.
OBJECTIVE: Produce 60s Vertical Video Script Package in 6 x 10-second scene clips (@NajeebCyber).
FORMAT: 6 Clips x 10 Seconds Each (60s Total) • Vertical (9:16)
PALETTE: Cyber Blue (#0B132B), Electric Cyan (#00F0FF), Alert Red (#FF0055).
ANCHOR: @ME (AI Avatar Anchor in sleek tech navy suit)
STUDIO: High-tech virtual studio with world attack heatmap, glowing digital globe & lower thirds.`;

  const avatarCode = `# MASTER PROMPT – 1 Min Weekly Cyber News (Google Flow 10s Scene Standard)
CLIP 1 (00:00 - 00:10): "Welcome to Weekly Cyber News. I'm @ME, bringing you this week's biggest cybersecurity stories..."
CLIP 2 (00:10 - 00:20): "First up: Security researchers reveal that phishing attacks are rapidly evolving into real-time session hijacking..."
CLIP 3 (00:20 - 00:30): "Attackers bypass traditional multi-factor authentication in seconds using automated proxy relay tools..."
CLIP 4 (00:30 - 00:40): "In AI security: Autonomous AI agents demonstrate capabilities to scan and exploit web endpoints..."
CLIP 5 (00:40 - 00:50): "Security agencies urge businesses to enforce zero-trust policies, audit access logs, and patch critical systems..."
CLIP 6 (00:50 - 01:00): "Stay informed, stay protected. Follow @NajeebCyber for daily updates. I'm @ME, see you next week."`;

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

// 7. Live Cyber News Feed API Integration (Hacker News Algolia API)
function initLiveNewsFeed() {
  const container = document.getElementById('liveNewsContainer');
  const refreshBtn = document.getElementById('btnRefreshFeed');

  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchLiveCyberNews);
  }

  fetchLiveCyberNews();
}

async function fetchLiveCyberNews() {
  const container = document.getElementById('liveNewsContainer');
  if (!container) return;

  container.innerHTML = `<div class="loading-spinner"><i class="fa-solid fa-circle-notch fa-spin"></i> Fetching live cybersecurity threat feed...</div>`;

  try {
    // Fetch live stories tagged with cybersecurity / security / breach / vulnerability
    const queries = ['cybersecurity', 'ransomware', 'zero-day', 'vulnerability', 'phishing'];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${randomQuery}&tags=story&hitsPerPage=9`);
    const data = await res.json();

    if (!data.hits || data.hits.length === 0) {
      container.innerHTML = `<div class="loading-spinner">No live stories found at this time. Click refresh to try again.</div>`;
      return;
    }

    container.innerHTML = data.hits.map(item => {
      const title = item.title || 'Cybersecurity Advisory';
      const url = item.url || `https://news.ycombinator.com/item?id=${item.objectID}`;
      const author = item.author || 'OSINT Feed';
      const dateStr = new Date(item.created_at).toLocaleDateString();
      const points = item.points || 0;

      return `
        <div class="news-card">
          <div class="news-card-header">
            <span class="news-tag"><i class="fa-solid fa-shield"></i> Live Threat</span>
            <span class="news-date">${dateStr}</span>
          </div>

          <div class="news-card-title">
            <a href="${url}" target="_blank" rel="noopener">${title}</a>
          </div>

          <div class="news-card-meta">
            <span><i class="fa-solid fa-user-ninja"></i> ${author}</span>
            <span><i class="fa-solid fa-fire"></i> ${points} Points</span>
          </div>

          <button class="btn-sm btn-accent btn-gen-script" data-title="${encodeURIComponent(title)}">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Teleprompter Script
          </button>
        </div>
      `;
    }).join('');

    // Attach click handlers to Generate Teleprompter Script buttons
    document.querySelectorAll('.btn-gen-script').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = decodeURIComponent(e.currentTarget.getAttribute('data-title'));
        generateScriptFromNews(title);
      });
    });

  } catch (err) {
    console.error('Fetch live news error:', err);
    container.innerHTML = `<div class="loading-spinner" style="color: var(--alert-red);">Error loading live news feed. Please check connection.</div>`;
  }
}

function generateScriptFromNews(storyTitle) {
  // Format 60-second broadcast script into 6 x 10s Google Flow Scene Clips
  const newScript = [
    {
      time: "00:00 - 00:10",
      label: "CLIP 1: INTRO & HOOK (10s)",
      text: `Welcome to Weekly Cyber News. I'm @ME, bringing you an urgent security bulletin regarding ${storyTitle.slice(0, 45)}.`,
      lowerThird: "BREAKING CYBER SECURITY BULLETIN",
      notes: "Google Flow Scene 1 (10s): Studio Reveal • Red alert neon lighting • Camera zooms toward @ME avatar"
    },
    {
      time: "00:10 - 00:20",
      label: "CLIP 2: STORY 1A - BREAKING HEADLINE (10s)",
      text: `Breaking News: ${storyTitle}. Security teams and analysts worldwide are monitoring this development closely.`,
      lowerThird: storyTitle.length > 36 ? storyTitle.slice(0, 34) + '...' : storyTitle,
      notes: "Google Flow Scene 2 (10s): Threat heatmap • B-roll attack visualization • Code breach animation"
    },
    {
      time: "00:20 - 00:30",
      label: "CLIP 3: STORY 1B - EXPLOIT ANALYSIS (10s)",
      text: `Initial indicators highlight potential zero-day or credential exploitation risks allowing unauthorized lateral movement across endpoints.`,
      lowerThird: "EXPLOIT: Endpoint & Access Vulnerability",
      notes: "Google Flow Scene 3 (10s): Matrix-style scrolling code • Credential theft graphic"
    },
    {
      time: "00:30 - 00:40",
      label: "CLIP 4: STORY 2 - IMPACT & DEFENSE (10s)",
      text: `Security researchers urge system administrators to audit access logs, enforce MFA, and restrict elevated privileges immediately.`,
      lowerThird: "IMPACT: Urgent Log Audit & MFA Enforcement",
      notes: "Google Flow Scene 4 (10s): Firewall shield animation • SOC dashboard warning"
    },
    {
      time: "00:40 - 00:50",
      label: "CLIP 5: STORY 3 - PATCH ADVISORY (10s)",
      text: `Organizations are strongly advised to apply vendor security patches and update endpoint defense rules to block active payloads.`,
      lowerThird: "ACTION REQUIRED: Apply Vendor Security Patch",
      notes: "Google Flow Scene 5 (10s): Threat intelligence feed • Patch advisory graphic"
    },
    {
      time: "00:50 - 01:00",
      label: "CLIP 6: OUTRO & CALL TO ACTION (10s)",
      text: `Stay informed, stay protected, and remember—cyber awareness is your strongest defense. Follow @NajeebCyber for more updates. I'm @ME, signing off.`,
      lowerThird: "Follow @NajeebCyber for Live Intelligence",
      notes: "Google Flow Scene 6 (10s): Studio Outro • Holographic Globe • Social panel overlay"
    }
  ];

  // Update scriptData array
  scriptData.length = 0;
  newScript.forEach(s => scriptData.push(s));

  // Update Teleprompter UI
  const scriptContainer = document.getElementById('scriptSectionsContainer');
  if (scriptContainer) {
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
  }

  // Switch tab to Teleprompter & reset timer
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  const teleBtn = document.querySelector('[data-tab="tab-teleprompter"]');
  const teleTab = document.getElementById('tab-teleprompter');

  if (teleBtn && teleTab) {
    teleBtn.classList.add('active');
    teleTab.classList.add('active');
  }

  resetTp();
  alert(`⚡ Script generated for: "${storyTitle}"!\nTeleprompter is ready.`);
}
