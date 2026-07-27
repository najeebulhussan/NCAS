# System Architecture & AI Agent Network

**NajeebCyber AI Studio (NCAS)** operates using a multi-agent orchestration architecture where specialized agents handle dedicated responsibilities under the direction of a Chief AI Agent.

---

## Agent Network Topology

```text
                        ┌──────────────────────────────┐
                        │        Chief AI Agent        │
                        │    (Project Director & QA)   │
                        └──────────────┬───────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
┌───────┴───────┐              ┌───────┴───────┐              ┌───────┴───────┐
│ News & OSINT  │              │ Production &  │              │ Distribution  │
│  Subagents    │              │ Content Team  │              │  & Growth     │
└───────┬───────┘              └───────┬───────┘              └───────┬───────┘
        │                              │                              │
 ├── 1. Trend Hunter            ├── 4. Scriptwriter            ├── 8. Social Publisher
 ├── 2. Fact Checker            ├── 5. Visual Director         ├── 9. Analytics Agent
 └── 3. OSINT Collector         ├── 6. Voice & Audio           └── 10. Community Mgr
                                └── 7. Motion Graphics
```

---

## The 12 AI Subagents

### 1. Chief AI Agent (Project Manager)
- **Role**: Overall workflow coordinator, task dispatcher, and final quality control officer.
- **Responsibilities**: Ensures alignment with brand guidelines, approves scripts before render, coordinates inter-agent communication.

### 2. Trend Hunter Agent
- **Role**: Real-time news discovery and virality predictor.
- **Responsibilities**: Scrapes Hacker News, CISA, Twitter/X security community, and security blogs to identify trending cyber stories.

### 3. Fact Checker & Source Verifier
- **Role**: Accuracy and compliance officer.
- **Responsibilities**: Cross-references claims against CVE databases, official security advisories, and primary news sources to eliminate hallucinated news.

### 4. OSINT Intelligence Agent
- **Role**: Technical deep-dive analyst.
- **Responsibilities**: Extracts indicator of compromise (IOCs), attack vector timelines, and threat actor profiles (APT groups).

### 5. Broadcast Scriptwriter (OmniFlash Lead)
- **Role**: Short-form video copywriter.
- **Responsibilities**: Crafts 60-second scripts with hooked intros, structured 3-story pacing, and clear calls-to-action using the Master OmniFlash Prompt.

### 6. Visual Director & Studio Designer
- **Role**: Scene generator & camera planner.
- **Responsibilities**: Generates prompts for background studio graphics, 3D holographic globes, attack maps, and visual B-roll sequences.

### 7. Motion Graphics & Lower-Thirds Agent
- **Role**: Broadcast graphic designer.
- **Responsibilities**: Formats onscreen text overlays, breaking news tickers, threat level meters, and lower-third titles.

### 8. Voice & Audio Director
- **Role**: Voiceover & sound engineer.
- **Responsibilities**: Controls AI avatar voice modulation, pacing, newsroom ambience, and subtle cyber sound effect cues.

### 9. Video Production & Render Agent
- **Role**: Automated video compositor.
- **Responsibilities**: Interfaces with video rendering APIs (Google Flow, HeyGen, CapCut API, Runway) to assemble final video exports.

### 10. Cross-Platform Social Publisher
- **Role**: Distribution manager.
- **Responsibilities**: Generates platform-optimized titles, descriptions, hashtags, and schedules uploads across YouTube, TikTok, Instagram, X, LinkedIn.

### 11. Analytics & Optimization Agent
- **Role**: Performance tracking analyst.
- **Responsibilities**: Measures click-through-rates, retention curves, subscriber growth, and provides iterative feedback to Trend Hunter and Scriptwriter.

### 12. Brand Guardian & Community Agent
- **Role**: Brand identity & audience engagement manager.
- **Responsibilities**: Ensures standard handle consistency (\`@NajeebCyber\`), drafts replies to top comments, and maintains community trust.

---

## Daily Autonomous Schedule

| Time (PKT) | Agent in Charge | Action / Output |
|------------|-----------------|-----------------|
| **06:00 AM** | Trend Hunter | Scrapes top 20 breaking cybersecurity stories of the last 24h. |
| **06:15 AM** | Fact Checker | Verifies sources and scores story impact (1-10). Selects Top 3 stories. |
| **06:30 AM** | Scriptwriter | Generates 60-second broadcast script using Master OmniFlash Prompt. |
| **06:45 AM** | Visual & Audio Director | Prepares B-roll asset prompts, audio cues, and lower-thirds overlay spec. |
| **07:00 AM** | Chief AI Agent | Sends draft script & story visual storyboard for human review/approval. |
| **07:30 AM** | Video Render Agent | Renders AI Avatar broadcast video & composite motion graphics. |
| **08:00 AM** | Social Publisher | Publishes to YouTube Shorts, TikTok, Instagram Reels, LinkedIn & X. |
| **08:30 AM** | Analytics Agent | Logs initial 30-minute engagement metrics and updates threat trend database. |
