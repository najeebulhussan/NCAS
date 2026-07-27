const { CONTENT_JOB_STATES } = require('../shared');

class ContentJobStateMachine {
  constructor(jobId, initialNiche = 'Cybersecurity Threat Intelligence') {
    this.jobId = jobId;
    this.niche = initialNiche;
    this.currentState = CONTENT_JOB_STATES.DISCOVERED;
    this.history = [];
    this.metadata = {};
    this.recordTransition(CONTENT_JOB_STATES.DISCOVERED, 'SYSTEM', 'Initial Content Job creation');
  }

  recordTransition(newState, initiator = 'SYSTEM', notes = '') {
    const transitionRecord = {
      from: this.currentState,
      to: newState,
      initiator: initiator,
      timestamp: new Date().toISOString(),
      notes: notes
    };
    this.currentState = newState;
    this.history.push(transitionRecord);
    return transitionRecord;
  }

  transitionTo(nextState, initiator = 'SYSTEM', evidence = {}) {
    // Quality Gate Checks
    if (nextState === CONTENT_JOB_STATES.SCRIPT_DRAFT && this.metadata.isHighRisk && !this.metadata.humanApproved) {
      console.warn(`[STATE_MACHINE_GATE] High-risk content detected. Redirecting to PAUSED_FOR_HUMAN_REVIEW.`);
      return this.recordTransition(CONTENT_JOB_STATES.PAUSED_FOR_HUMAN_REVIEW, initiator, 'High risk requires human verification');
    }

    if (nextState === CONTENT_JOB_STATES.PUBLISHED && !this.metadata.humanApprovedForPublishing) {
      throw new Error(`[SECURITY_GATE_VIOLATION] Cannot publish content job ${this.jobId} without explicit human approval.`);
    }

    Object.assign(this.metadata, evidence);
    return this.recordTransition(nextState, initiator, evidence.notes || '');
  }

  approveHumanReview(approverName = 'Chief Editor') {
    this.metadata.humanApproved = true;
    this.metadata.approver = approverName;
    return this.recordTransition(CONTENT_JOB_STATES.VERIFIED, approverName, 'Human review passed.');
  }

  approveForPublishing(approverName = 'Publisher') {
    this.metadata.humanApprovedForPublishing = true;
    return this.recordTransition(CONTENT_JOB_STATES.APPROVED_FOR_PUBLISHING, approverName, 'Publishing approved.');
  }

  getJobSummary() {
    return {
      jobId: this.jobId,
      niche: this.niche,
      currentState: this.currentState,
      historyCount: this.history.length,
      metadata: this.metadata,
      lastUpdated: this.history[this.history.length - 1].timestamp
    };
  }
}

module.exports = ContentJobStateMachine;
