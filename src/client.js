import fetch from 'node-fetch';
import { Logger } from 'winston';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'copilot-plans-client' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

class CopilotPlansClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async request(method, endpoint, data = null) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        logger.error('API error', { status: response.status, error: result });
        throw new Error(result.error || 'API request failed');
      }

      return result;
    } catch (error) {
      logger.error('Request error', { error: error.message });
      throw error;
    }
  }

  // Plans API
  async getAllPlans() {
    return this.request('GET', '/api/plans');
  }

  async getPlan(planId) {
    return this.request('GET', `/api/plans/${planId}`);
  }

  async createPlan(planData) {
    return this.request('POST', '/api/plans', planData);
  }

  // Agents API
  async getAllAgents() {
    return this.request('GET', '/api/agents');
  }

  async getAgent(agentId) {
    return this.request('GET', `/api/agents/${agentId}`);
  }

  async createAgent(agentData) {
    return this.request('POST', '/api/agents', agentData);
  }

  // User Operations
  async activatePlanForUser(userId, planId) {
    return this.request('POST', `/api/users/${userId}/activate-plan`, { planId });
  }

  async assignAgentToUser(userId, agentId) {
    return this.request('POST', `/api/users/${userId}/assign-agent`, { agentId });
  }

  // Health check
  async healthCheck() {
    return this.request('GET', '/health');
  }
}

export default CopilotPlansClient;
