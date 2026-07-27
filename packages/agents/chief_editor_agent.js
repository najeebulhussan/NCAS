const BaseAgent = require('./base_agent');
const { AGENT_ROLES } = require('../shared');

class ChiefEditorAgent extends BaseAgent {
  constructor() {
    super('agent-1', AGENT_ROLES.CHIEF_EDITOR, 'Strategy and Knowledge');
  }

  async validate(input) {
    await super.validate(input);
    if (!input.nicheName) {
      throw new Error(`[Chief Editor] Validation Error: 'nicheName' is required for strategic planning.`);
    }
    return true;
  }

  async execute(input) {
    const { nicheName, goal = 'Authority & Education', timeframeDays = 30 } = input;

    console.log(`👑 [Chief Editor Agent] Formulating ${timeframeDays}-day Strategy & Editorial Plan for Niche: "${nicheName}"...`);

    const editorialPlan = {
      niche: nicheName,
      goal: goal,
      timeframeDays: timeframeDays,
      contentPillars: [
        'Breaking Zero-Day Threats & Emergency Advisories',
        'APT Attack Vector Technical Explanations',
        'Scam & Ransomware Defense Strategies for Enterprise & Individuals',
        'Ethical Hacking & SOC Incident Response Blueprints'
      ],
      targetAudience: 'CISOs, Security Researchers, DevOps Engineers & Tech-savvy Creators',
      recommendedFrequency: '1 Short Broadcast Daily + 1 Executive Weekly Digest',
      contentBriefs: Array.from({ length: 4 }).map((_, i) => ({
        briefId: `BRIEF-2026-0${i + 1}`,
        title: `Weekly Cyber Brief #${i + 1}: ${nicheName} Insights`,
        targetClipSlots: '10s, 15s, 8s, 12s, 15s',
        estimatedCost: '$0.05'
      }))
    };

    return {
      success: true,
      niche: nicheName,
      editorialPlan: editorialPlan
    };
  }

  async quality_check(result) {
    if (!result || !result.editorialPlan || result.editorialPlan.contentBriefs.length === 0) {
      return { passed: false, score: 0, notes: 'Editorial plan missing content briefs.' };
    }
    return { passed: true, score: 98, notes: 'Chief Editor strategy approved.' };
  }
}

module.exports = ChiefEditorAgent;
