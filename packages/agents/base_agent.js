/**
 * NCAS Standard Base Agent Class
 * Lifecycle: validate() -> execute() -> quality_check() -> report() -> rollback_or_retry()
 */

class BaseAgent {
  constructor(agentId, agentName, roleCategory) {
    this.agentId = agentId;
    this.agentName = agentName;
    this.roleCategory = roleCategory;
    this.status = 'IDLE';
    this.executionHistory = [];
  }

  async validate(input) {
    if (!input) {
      throw new Error(`[${this.agentName}] Validation failed: Input payload is required.`);
    }
    return true;
  }

  async execute(input) {
    throw new Error(`[${this.agentName}] execute() method must be implemented by subclass.`);
  }

  async quality_check(result) {
    if (!result || result.success === false) {
      return { passed: false, score: 0, notes: 'Execution result failed quality check.' };
    }
    return { passed: true, score: 100, notes: 'Quality check passed.' };
  }

  async report(result, metrics = {}) {
    const reportPayload = {
      agentId: this.agentId,
      agentName: this.agentName,
      timestamp: new Date().toISOString(),
      status: this.status,
      result: result,
      metrics: {
        latencyMs: metrics.latencyMs || 0,
        estimatedCostUsd: metrics.estimatedCostUsd || 0.001
      }
    };
    this.executionHistory.push(reportPayload);
    return reportPayload;
  }

  async rollback_or_retry(error, input) {
    console.error(`[${this.agentName}] Rollback/Retry triggered due to error: ${error.message}`);
    this.status = 'ERROR_ROLLBACK';
    return {
      agentName: this.agentName,
      error: error.message,
      recovered: false
    };
  }

  async run(input) {
    const startTime = Date.now();
    this.status = 'EXECUTING';

    try {
      await this.validate(input);
      const rawResult = await this.execute(input);
      const qc = await this.quality_check(rawResult);

      if (!qc.passed) {
        throw new Error(`Quality Check Failed: ${qc.notes}`);
      }

      this.status = 'COMPLETED';
      const latencyMs = Date.now() - startTime;
      return await this.report(rawResult, { latencyMs });
    } catch (err) {
      return await this.rollback_or_retry(err, input);
    }
  }
}

module.exports = BaseAgent;
