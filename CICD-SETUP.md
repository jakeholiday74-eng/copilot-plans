# CI/CD Pipeline Configuration

This directory contains GitHub Actions workflows for automated testing, building, and deployment.

## Workflows

### Main CI/CD Pipeline
- **Triggers**: Push to main branches, Pull Requests
- **Jobs**:
  1. ✅ Test & Lint - Run tests and code quality checks
  2. ✅ Build - Compile and build application
  3. ✅ Security Scan - Audit dependencies
  4. ✅ Deploy - Deploy to production
  5. ✅ Smoke Tests - Post-deployment verification
  6. ✅ Summary - Pipeline status summary

## Setup Instructions

### 1. GitHub Secrets Required
Add these secrets to your repository settings:

```
DEPLOY_KEY - SSH private key for deployment
DEPLOY_HOST - Server hostname
DEPLOY_USER - Deployment user
```

### 2. Enable GitHub Actions
1. Go to repository Settings
2. Navigate to Actions → General
3. Enable "Allow all actions and reusable workflows"

### 3. View Pipeline Status
- Go to Actions tab in your repository
- Check workflow runs and logs

## Pipeline Flow

```
Push/PR → Test → Build → Security → Deploy → Smoke Tests → Summary
```

## Environment Variables

- `NODE_VERSION`: 18
- `PORT`: 3000

## Customization

Edit `.github/workflows/ci-cd.yml` to:
- Add additional test commands
- Configure deployment servers
- Add notification channels
- Set build parameters

## GitHub Actions Setup

### To enable GitHub Actions workflows:

1. **Navigate to your repository**
2. **Click Settings → Actions → General**
3. **Select "Allow all actions and reusable workflows"**
4. **Save changes**

### Add Required Secrets

1. **Settings → Secrets and variables → Actions**
2. **Click "New repository secret"**
3. **Add each secret**:
   - `DEPLOY_KEY`
   - `DEPLOY_HOST`
   - `DEPLOY_USER`

### Monitor Workflows

- Go to **Actions** tab
- View all workflow runs
- Click on specific run for detailed logs
- Check job status and outputs

## Deployment Process

Automatic on push to `free-tier-full-access` branch:
1. Code checkout
2. Dependencies install
3. Tests run
4. Security audit
5. Build application
6. Deploy to server
7. Run smoke tests
8. Report status
