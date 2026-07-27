/**
 * NCAS Shared Types, Constants & Brand Guidelines
 * Handle: @NajeebCyber
 */

const CONTENT_JOB_STATES = {
  DISCOVERED: 'DISCOVERED',
  STRATEGY_REVIEW: 'STRATEGY_REVIEW',
  PLANNED: 'PLANNED',
  RESEARCHING: 'RESEARCHING',
  FACT_CHECKING: 'FACT_CHECKING',
  VERIFIED: 'VERIFIED',
  PAUSED_FOR_HUMAN_REVIEW: 'PAUSED_FOR_HUMAN_REVIEW',
  SCRIPT_DRAFT: 'SCRIPT_DRAFT',
  EDITOR_REVIEW: 'EDITOR_REVIEW',
  VISUAL_PLAN: 'VISUAL_PLAN',
  ASSET_PRODUCTION: 'ASSET_PRODUCTION',
  RENDERING: 'RENDERING',
  FINAL_REVIEW: 'FINAL_REVIEW',
  APPROVED_FOR_PUBLISHING: 'APPROVED_FOR_PUBLISHING',
  SCHEDULED: 'SCHEDULED',
  PUBLISHED: 'PUBLISHED',
  ANALYZED: 'ANALYZED'
};

const BRAND_GUIDELINES = {
  handle: '@NajeebCyber',
  name: 'NajeebCyber AI Studio',
  colors: {
    primaryCyan: '#00F0FF',
    accentMagenta: '#FF0055',
    cyberNavy: '#040814',
    secondaryBlue: '#101F42',
    successGreen: '#00FF66'
  },
  typography: {
    headingFont: 'Outfit, sans-serif',
    bodyFont: 'Inter, sans-serif'
  },
  anchorIdentity: {
    name: '@ME',
    role: 'AI Cyber Security Lead & Threat Specialist',
    wardrobe: 'Sleek dark navy tech blazer with glowing cyan lapel pin'
  }
};

const AGENT_ROLES = {
  // Strategy & Knowledge
  CHIEF_EDITOR: 'Chief Editor',
  NICHE_STRATEGIST: 'Niche Strategist',
  CAMPAIGN_PLANNER: 'Campaign Planner',
  KNOWLEDGE_MANAGER: 'Knowledge Manager',
  // Research & Editorial
  RESEARCH_AGENT: 'Research Agent',
  CYBER_THREAT_ANALYST: 'Cyber Threat Analyst',
  CYBERCRIME_RESEARCHER: 'Cybercrime Researcher',
  FACT_CHECK_AGENT: 'Fact Check Agent',
  SCRIPT_AGENT: 'Script Agent',
  SEO_DISTRIBUTION_AGENT: 'SEO & Distribution Agent',
  // Creative Production
  CREATIVE_DIRECTOR: 'Creative Director',
  IMAGE_DIRECTOR: 'Image Director',
  THUMBNAIL_INTELLIGENCE: 'Thumbnail Intelligence',
  VIDEO_DIRECTOR: 'Video Director',
  VOICE_AUDIO_DIRECTOR: 'Voice & Audio Director',
  MOTION_GRAPHICS_AGENT: 'Motion Graphics Agent',
  RENDER_AGENT: 'Render Agent',
  // Operations & Growth
  BRAND_GUARDIAN: 'Brand Guardian',
  APPROVAL_MANAGER: 'Approval Manager',
  PUBLISHER: 'Publisher',
  ANALYTICS_AGENT: 'Analytics Agent',
  COMMUNITY_AGENT: 'Community Agent'
};

module.exports = {
  CONTENT_JOB_STATES,
  BRAND_GUIDELINES,
  AGENT_ROLES
};
