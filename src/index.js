/**
 * Copilot Plans - Main Entry Point
 * Full-access free tier application with unrestricted agent profiles
 */

import CopilotPlansClient from './client.js';

async function main() {
  const client = new CopilotPlansClient('http://localhost:3000');

  try {
    console.log('\n🚀 Copilot Plans - Full Access Free Tier\n');

    // Health check
    const health = await client.healthCheck();
    console.log('✅ Server Health:', health.status);

    // Get all plans
    console.log('\n📋 Available Plans:');
    const plans = await client.getAllPlans();
    plans.data.forEach(plan => {
      console.log(`  • ${plan.name} (${plan.tier}) - $${plan.pricing.cost}/${plan.pricing.billingCycle}`);
    });

    // Get all agents
    console.log('\n🤖 Available Agents:');
    const agents = await client.getAllAgents();
    agents.data.forEach(agent => {
      console.log(`  • ${agent.name} (${agent.tier}) - ${agent.capabilities.length} capabilities`);
    });

    // Get specific plan
    console.log('\n📖 Free Tier Plan Details:');
    const freePlan = await client.getPlan('free-tier-full-access');
    console.log(`  Name: ${freePlan.data.name}`);
    console.log(`  Cost: $${freePlan.data.pricing.cost}`);
    console.log(`  Status: ${freePlan.data.status}`);
    console.log(`  Features: ${Object.keys(freePlan.data.features).length} available`);

    // Get specific agent
    console.log('\n🎯 Free Pro Agent Details:');
    const freeAgent = await client.getAgent('free-pro-agent');
    console.log(`  Name: ${freeAgent.data.name}`);
    console.log(`  Tier: ${freeAgent.data.tier}`);
    console.log(`  Capabilities: ${freeAgent.data.capabilities.length} enabled`);
    console.log(`  Status: ${freeAgent.data.status}`);

    console.log('\n✅ Application initialized successfully!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
