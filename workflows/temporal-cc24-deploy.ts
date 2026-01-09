/**
 * CC24 Deployment Workflow mit Temporal
 * 
 * Orchestriert alle CC24 Deployments:
 * 1. Build Next.js App
 * 2. Deploy zu GitHub Pages
 * 3. Deploy zu Vercel
 * 4. Build & Push Docker Image
 * 5. Health Checks
 * 
 * Installation:
 * npm install @temporalio/workflow @temporalio/activity @temporalio/client
 */

import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './temporal-cc24-activities';

const { 
  buildNextJS, 
  deployGitHubPages, 
  deployVercel, 
  buildDocker, 
  healthCheck 
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '30m',
  retry: {
    initialInterval: '10s',
    maximumInterval: '5m',
    maximumAttempts: 3,
  },
});

export interface CC24DeployInput {
  branch: string;
  environment: 'staging' | 'production';
  skipDocker?: boolean;
  skipVercel?: boolean;
}

export async function deployCC24Workflow(input: CC24DeployInput): Promise<{
  success: boolean;
  deployments: {
    githubPages?: { url: string; status: string };
    vercel?: { url: string; status: string };
    docker?: { image: string; status: string };
  };
  errors?: string[];
}> {
  const errors: string[] = [];
  const deployments: any = {};

  try {
    // Step 1: Build Next.js App
    console.log(`[CC24] Building Next.js app for ${input.branch}...`);
    const buildResult = await buildNextJS({
      branch: input.branch,
      environment: input.environment,
    });

    if (!buildResult.success) {
      throw new Error(`Build failed: ${buildResult.error}`);
    }

    // Step 2: Deploy zu GitHub Pages (immer)
    console.log('[CC24] Deploying to GitHub Pages...');
    try {
      const ghPagesResult = await deployGitHubPages({
        branch: input.branch,
        buildOutput: buildResult.outputPath,
      });
      deployments.githubPages = {
        url: ghPagesResult.url,
        status: 'success',
      };
    } catch (error) {
      errors.push(`GitHub Pages: ${error.message}`);
      deployments.githubPages = { status: 'failed' };
    }

    // Step 3: Deploy zu Vercel (optional)
    if (!input.skipVercel) {
      console.log('[CC24] Deploying to Vercel...');
      try {
        const vercelResult = await deployVercel({
          branch: input.branch,
          environment: input.environment,
        });
        deployments.vercel = {
          url: vercelResult.url,
          status: 'success',
        };
      } catch (error) {
        errors.push(`Vercel: ${error.message}`);
        deployments.vercel = { status: 'failed' };
      }
    }

    // Step 4: Build & Push Docker (optional)
    if (!input.skipDocker) {
      console.log('[CC24] Building and pushing Docker image...');
      try {
        const dockerResult = await buildDocker({
          branch: input.branch,
          tag: input.environment === 'production' ? 'latest' : input.branch,
        });
        deployments.docker = {
          image: dockerResult.image,
          status: 'success',
        };
      } catch (error) {
        errors.push(`Docker: ${error.message}`);
        deployments.docker = { status: 'failed' };
      }
    }

    // Step 5: Health Checks
    console.log('[CC24] Running health checks...');
    const healthChecks = await Promise.allSettled([
      deployments.githubPages?.url ? healthCheck(deployments.githubPages.url) : Promise.resolve(),
      deployments.vercel?.url ? healthCheck(deployments.vercel.url) : Promise.resolve(),
    ]);

    const failedHealthChecks = healthChecks.filter(r => r.status === 'rejected');
    if (failedHealthChecks.length > 0) {
      errors.push(`Health checks failed: ${failedHealthChecks.length}`);
    }

    return {
      success: errors.length === 0,
      deployments,
      errors: errors.length > 0 ? errors : undefined,
    };

  } catch (error) {
    console.error('[CC24] Workflow failed:', error);
    return {
      success: false,
      deployments,
      errors: [...errors, error.message],
    };
  }
}

/**
 * Retry Workflow für fehlgeschlagene Deployments
 */
export async function retryFailedDeploymentsWorkflow(
  failedDeployment: 'githubPages' | 'vercel' | 'docker',
  input: CC24DeployInput
): Promise<{ success: boolean; error?: string }> {
  try {
    switch (failedDeployment) {
      case 'githubPages':
        const ghResult = await deployGitHubPages({
          branch: input.branch,
          buildOutput: './out',
        });
        return { success: true };
      
      case 'vercel':
        const vResult = await deployVercel({
          branch: input.branch,
          environment: input.environment,
        });
        return { success: true };
      
      case 'docker':
        const dResult = await buildDocker({
          branch: input.branch,
          tag: input.environment === 'production' ? 'latest' : input.branch,
        });
        return { success: true };
      
      default:
        return { success: false, error: 'Unknown deployment type' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
