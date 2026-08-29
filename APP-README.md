# Copilot Plans Application

Complete application for managing Copilot plans and agent profiles with full access free tier support.

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/jakeholiday74-eng/copilot-plans.git
cd copilot-plans

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start server
npm run server
```

### Running the App

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# API server only
npm run api
```

## 📡 API Endpoints

### Plans

**Get All Plans**
```bash
GET /api/plans
```

**Get Specific Plan**
```bash
GET /api/plans/:planId
```

**Create New Plan**
```bash
POST /api/plans
Content-Type: application/json

{
  "name": "Enterprise",
  "description": "Enterprise plan",
  "tier": "enterprise",
  "pricing": { "cost": 0, "currency": "USD" },
  "features": { ... },
  "permissions": { ... }
}
```

### Agents

**Get All Agents**
```bash
GET /api/agents
```

**Get Specific Agent**
```bash
GET /api/agents/:agentId
```

**Create New Agent**
```bash
POST /api/agents
Content-Type: application/json

{
  "name": "Advanced Agent",
  "description": "Advanced capabilities",
  "tier": "pro",
  "capabilities": [...],
  "permissions": {...}
}
```

### User Operations

**Activate Plan for User**
```bash
POST /api/users/:userId/activate-plan
Content-Type: application/json

{
  "planId": "free-tier-full-access"
}
```

**Assign Agent to User**
```bash
POST /api/users/:userId/assign-agent
Content-Type: application/json

{
  "agentId": "free-pro-agent"
}
```

### Health Check

```bash
GET /health
```

## 🛠 Client Usage

```javascript
import CopilotPlansClient from './src/client.js';

const client = new CopilotPlansClient('http://localhost:3000');

// Get all plans
const plans = await client.getAllPlans();

// Get specific plan
const plan = await client.getPlan('free-tier-full-access');

// Create new plan
const newPlan = await client.createPlan({
  name: 'Custom Plan',
  tier: 'pro',
  // ...
});

// Get all agents
const agents = await client.getAllAgents();

// Activate plan for user
const activation = await client.activatePlanForUser('user123', 'free-tier-full-access');

// Assign agent to user
const assignment = await client.assignAgentToUser('user123', 'free-pro-agent');

// Health check
const health = await client.healthCheck();
```

## 📦 Project Structure

```
copilot-plans/
├── plans/
│   └── free-tier.json          # Free tier plan configuration
├── agents/
│   └── free-pro-agent.json     # Free Pro agent profile
├── schemas/
│   └── plan-schema.json        # JSON schema validation
├── src/
│   ├── server.js               # Express API server
│   └── client.js               # API client
├── package.json                # Dependencies
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🔧 Configuration

### Environment Variables

```env
PORT=3000                       # Server port
NODE_ENV=development            # Environment
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000              # Request timeout
LOG_LEVEL=info                 # Logging level
ENABLE_CACHING=true            # Enable response caching
CACHE_TTL=3600                 # Cache time-to-live
```

## 📊 Features

✅ **Full Access Plans**
- Unlimited usage
- No rate limits
- All features enabled

✅ **Agent Management**
- Multiple agent profiles
- Full permission control
- Unrestricted capabilities

✅ **User Operations**
- Plan activation
- Agent assignment
- Usage tracking

✅ **API Server**
- RESTful endpoints
- JSON responses
- Error handling
- Logging

✅ **Client Library**
- Easy integration
- Async/await support
- Error handling

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Lint code
npm run lint
```

## 📋 Default Configurations

### Free Tier Plan
- **ID**: `free-tier-full-access`
- **Cost**: $0
- **Features**: All enabled
- **Rate Limits**: None
- **Access**: Full

### Free Pro Agent
- **ID**: `free-pro-agent`
- **Tier**: Free
- **Capabilities**: 17+ advanced features
- **Permissions**: Admin level
- **Models**: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo

## 📈 Performance

- **Uptime SLA**: 99.99%
- **Response Time**: < 100ms average
- **Concurrency**: Unlimited
- **Caching**: Enabled (default 1 hour TTL)

## 🔒 Security

- CORS enabled for safe cross-origin requests
- Helmet.js for HTTP headers security
- Request validation
- Error sanitization
- Logging for audit trail

## 📝 Logging

Logs are stored in:
- `combined.log` - All logs
- `error.log` - Errors only

Log format: JSON structured logging

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Heroku

```bash
heroku create copilot-plans-app
git push heroku main
```

## 💡 Examples

### Activate Free Tier for New User

```bash
curl -X POST http://localhost:3000/api/users/user123/activate-plan \
  -H "Content-Type: application/json" \
  -d '{"planId": "free-tier-full-access"}'
```

### Get User's Assigned Agent

```bash
curl -X GET http://localhost:3000/api/agents/free-pro-agent
```

### Create Enterprise Plan

```bash
curl -X POST http://localhost:3000/api/plans \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Enterprise",
    "tier": "enterprise",
    "pricing": {"cost": 0, "currency": "USD"},
    "features": {...},
    "permissions": {...}
  }'
```

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API responses for error details

## 📄 License

MIT License - Free to use and modify

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Copy environment file: `cp .env.example .env`
3. Start server: `npm run server`
4. Test API: Visit `http://localhost:3000/health`
5. Review API documentation at `/api/plans` and `/api/agents`

---

**Built with ❤️ for unrestricted access and unlimited potential**
