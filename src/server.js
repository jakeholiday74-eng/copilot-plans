import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Logger } from 'winston';
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'copilot-plans-app' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Store for plans and agents
const plansStore = new Map();
const agentsStore = new Map();

// Import configurations
import freeTierPlan from './plans/free-tier.json' assert { type: 'json' };
import freeProAgent from './agents/free-pro-agent.json' assert { type: 'json' };

// Initialize with default configurations
plansStore.set(freeTierPlan.id, freeTierPlan);
agentsStore.set(freeProAgent.id, freeProAgent);

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Get all plans
app.get('/api/plans', (req, res) => {
  try {
    const plans = Array.from(plansStore.values());
    logger.info('Retrieved all plans', { count: plans.length });
    res.json({
      success: true,
      data: plans,
      count: plans.length,
    });
  } catch (error) {
    logger.error('Error retrieving plans', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve plans',
    });
  }
});

// Get specific plan
app.get('/api/plans/:planId', (req, res) => {
  try {
    const { planId } = req.params;
    const plan = plansStore.get(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found',
      });
    }

    logger.info('Retrieved plan', { planId });
    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    logger.error('Error retrieving plan', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve plan',
    });
  }
});

// Create new plan
app.post('/api/plans', (req, res) => {
  try {
    const { name, description, tier, pricing, features, permissions } = req.body;
    
    if (!name || !tier) {
      return res.status(400).json({
        success: false,
        error: 'Name and tier are required',
      });
    }

    const newPlan = {
      id: uuidv4(),
      name,
      description,
      tier,
      pricing,
      features,
      permissions,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    plansStore.set(newPlan.id, newPlan);
    logger.info('Created new plan', { planId: newPlan.id, name });

    res.status(201).json({
      success: true,
      data: newPlan,
    });
  } catch (error) {
    logger.error('Error creating plan', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to create plan',
    });
  }
});

// Get all agents
app.get('/api/agents', (req, res) => {
  try {
    const agents = Array.from(agentsStore.values());
    logger.info('Retrieved all agents', { count: agents.length });
    res.json({
      success: true,
      data: agents,
      count: agents.length,
    });
  } catch (error) {
    logger.error('Error retrieving agents', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve agents',
    });
  }
});

// Get specific agent
app.get('/api/agents/:agentId', (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = agentsStore.get(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
      });
    }

    logger.info('Retrieved agent', { agentId });
    res.json({
      success: true,
      data: agent,
    });
  } catch (error) {
    logger.error('Error retrieving agent', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve agent',
    });
  }
});

// Create new agent
app.post('/api/agents', (req, res) => {
  try {
    const { name, description, tier, capabilities, permissions } = req.body;
    
    if (!name || !tier) {
      return res.status(400).json({
        success: false,
        error: 'Name and tier are required',
      });
    }

    const newAgent = {
      id: uuidv4(),
      name,
      description,
      tier,
      version: '1.0.0',
      capabilities,
      permissions,
      status: 'active',
      availability: '24/7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    agentsStore.set(newAgent.id, newAgent);
    logger.info('Created new agent', { agentId: newAgent.id, name });

    res.status(201).json({
      success: true,
      data: newAgent,
    });
  } catch (error) {
    logger.error('Error creating agent', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to create agent',
    });
  }
});

// Activate plan for user
app.post('/api/users/:userId/activate-plan', (req, res) => {
  try {
    const { userId } = req.params;
    const { planId } = req.body;

    const plan = plansStore.get(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found',
      });
    }

    logger.info('Activated plan for user', { userId, planId });
    res.json({
      success: true,
      message: `Plan ${plan.name} activated for user ${userId}`,
      data: {
        userId,
        planId,
        planName: plan.name,
        status: 'active',
        activatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error activating plan', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to activate plan',
    });
  }
});

// Assign agent to user
app.post('/api/users/:userId/assign-agent', (req, res) => {
  try {
    const { userId } = req.params;
    const { agentId } = req.body;

    const agent = agentsStore.get(agentId);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
      });
    }

    logger.info('Assigned agent to user', { userId, agentId });
    res.json({
      success: true,
      message: `Agent ${agent.name} assigned to user ${userId}`,
      data: {
        userId,
        agentId,
        agentName: agent.name,
        status: 'active',
        assignedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error assigning agent', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to assign agent',
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`\n🚀 Copilot Plans App running at http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check at http://localhost:${PORT}/health\n`);
});

export default app;
