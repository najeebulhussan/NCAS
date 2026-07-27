# NajeebCyber AI Studio (NCAS)

> **Build the world's first AI-driven cybersecurity news studio focused on fast, accurate, visually compelling cyber news, threat intelligence, and awareness content.**

---

## 📌 Project Overview

**NajeebCyber AI Studio (NCAS)** is an autonomous AI media company architecture and broadcast production suite. Designed around a network of **12 specialized AI agents**, NCAS monitors global cybersecurity feeds 24/7, verifies threat sources, drafts 60-second broadcast scripts, composites futuristic newsroom visuals, and distributes short-form content across major social platforms under the unified handle **\`@NajeebCyber\`**.

---

## 📁 Repository Structure

```text
NCAS/
├── .gitignore
├── README.md
├── docs/
│   ├── prd.md                   # Product Requirements Document & Phase 1-2 Roadmap
│   ├── architecture.md          # 12 AI Agents Network Architecture & Daily Schedule
│   └── branding.md              # Brand Identity, Palette & 20 High-Growth Short Formats
├── prompts/
│   ├── master_omniflash_prompt.md          # Master OmniFlash Agent Prompt (v2.0 Production)
│   └── weekly_cyber_news_avatar_prompt.md  # 1-Minute Weekly Cyber News Master Script
├── resources/
│   └── chat_history/
│       ├── chat_history_full.md            # Raw & extracted full chat log from ChatGPT link
│       └── chat_summary.md                 # Synthesized summary of key decisions & concepts
└── src/
    ├── index.html               # Broadcast Command Center & Interactive Studio Web App
    ├── styles.css               # Futuristic Glassmorphic Dark Cyber Theme
    └── app.js                   # Interactive Teleprompter, Radar & Prompt Controls
```

---

## ⚡ Quick Start: Running the Studio Web Dashboard

You can run the NCAS Interactive Studio Command Center locally using Node.js static server, Python HTTP server, or VS Code Live Server.

### Using Node.js:
```bash
npx serve src
```

### Using Python:
```bash
python -m http.server --directory src 8080
```
Then open `http://localhost:8080` in your browser.

---

## 🤖 The 12 AI Subagent Network

1. **Chief AI Agent**: Overall workflow director & QA officer.
2. **Trend Hunter**: Scrapes RSS, Twitter/X, Hacker News & CVE feeds.
3. **Fact Checker**: Cross-references advisories to eliminate hallucinations.
4. **OSINT Intelligence**: Extracts technical timelines & APT actor profiles.
5. **Scriptwriter**: Crafts 60-second broadcast scripts with the Master OmniFlash Prompt.
6. **Visual Director**: Generates studio backgrounds, 3D globes, and attack maps.
7. **Motion Graphics**: Formats text overlays, breaking news tickers, and lower-thirds.
8. **Voice & Audio**: Manages voiceover modulation and cyber audio ambience.
9. **Video Render Agent**: Composites and renders final MP4 vertical videos (9:16).
10. **Social Publisher**: Schedules multi-platform distribution (@NajeebCyber).
11. **Analytics Agent**: Measures watch time retention and audience growth.
12. **Brand Guardian**: Maintains standardized handles & community trust.

---

## 🎨 Official Brand Specifications

- **Unified Social Handle**: \`@NajeebCyber\` (YouTube, TikTok, Instagram, Facebook, LinkedIn, X)
- **Primary Color**: Deep Cyber Blue (\`#0B132B\` / \`#1C2541\`)
- **Accent Glow**: Electric Cyan (\`#00F0FF\`)
- **Alert Accent**: Neon Red (\`#FF0055\`)
- **Studio Aesthetic**: Bloomberg Technology × The Hacker News × Modern Cyber Intelligence Broadcast

---

## 📝 Master Production Prompts

- [Master OmniFlash Agent Prompt (v2.0)](file:///e:/NCAS/prompts/master_omniflash_prompt.md)
- [1-Minute Weekly Cyber News Master Prompt](file:///e:/NCAS/prompts/weekly_cyber_news_avatar_prompt.md)

---

## 📜 Full Chat History Resource

The complete discussion and planning record imported from [ChatGPT Share Link](https://chatgpt.com/share/6a67a1ff-b670-83e8-9dd8-4c6b12160db3) is preserved in:
- [chat_history_full.md](file:///e:/NCAS/resources/chat_history/chat_history_full.md)
- [chat_summary.md](file:///e:/NCAS/resources/chat_history/chat_summary.md)
