/**
 * CC24 Deployment Activities für Temporal
 * 
 * Diese Activities führen die tatsächlichen Deployment-Aktionen aus.
 */

import { Connection, Client } from '@temporalio/client';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';

const execAsync = promisify(exec);

export interface BuildNextJSInput {
  branch: string;
  environment: 'staging' | 'production';
}

export interface BuildNextJSOutput {
  success: boolean;
  outputPath: string;
  error?: string;
}

export async function buildNextJS(input: BuildNextJSInput): Promise<BuildNextJSOutput> {
  try {
    console.log(`[Activity] Building Next.js for ${input.branch}...`);
    
    // Environment Variables setzen
    const env = {
      ...process.env,
      NEXT_PUBLIC_DOMAIN: input.environment === 'production' ? 'online' : 'local',
      NEXT_PUBLIC_API_URL: input.environment === 'production' 
        ? 'https://cc24-api.vercel.app' 
        : 'http://localhost:3000',
      NEXT_PUBLIC_STATIC_EXPORT: 'true',
      NEXT_PUBLIC_BASE_PATH: '',
      NODE_ENV: 'production',
    };

    // Build ausführen
    const { stdout, stderr } = await execAsync(
      'npm run build:static',
      { 
        env,
        cwd: process.cwd(),
        maxBuffer: 10 * 1024 * 1024, // 10MB
      }
    );

    // Prüfen ob out/ Verzeichnis existiert
    const outputPath = './out';
    try {
      await fs.access(outputPath);
      return {
        success: true,
        outputPath,
      };
    } catch {
      return {
        success: false,
        outputPath,
        error: 'Build output directory not found',
      };
    }
  } catch (error) {
    console.error('[Activity] Build failed:', error);
    return {
      success: false,
      outputPath: './out',
      error: error.message,
    };
  }
}

export interface DeployGitHubPagesInput {
  branch: string;
  buildOutput: string;
}

export interface DeployGitHubPagesOutput {
  success: boolean;
  url: string;
  error?: string;
}

export async function deployGitHubPages(
  input: DeployGitHubPagesInput
): Promise<DeployGitHubPagesOutput> {
  try {
    console.log('[Activity] Deploying to GitHub Pages...');
    
    // GitHub Actions Workflow triggern oder direkt deployen
    // Hier könnte man auch die GitHub API verwenden
    const { stdout } = await execAsync(
      `git push origin ${input.branch}`,
      { cwd: process.cwd() }
    );

    // GitHub Pages URL konstruieren
    const url = `https://vegafoundation.github.io/cc24/`;
    
    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error('[Activity] GitHub Pages deployment failed:', error);
    return {
      success: false,
      url: '',
      error: error.message,
    };
  }
}

export interface DeployVercelInput {
  branch: string;
  environment: 'staging' | 'production';
}

export interface DeployVercelOutput {
  success: boolean;
  url: string;
  error?: string;
}

export async function deployVercel(input: DeployVercelInput): Promise<DeployVercelOutput> {
  try {
    console.log('[Activity] Deploying to Vercel...');
    
    // Vercel CLI verwenden oder API
    const { stdout } = await execAsync(
      `vercel --prod --yes`,
      { 
        cwd: process.cwd(),
        env: {
          ...process.env,
          VERCEL_TOKEN: process.env.VERCEL_TOKEN,
        },
      }
    );

    // URL aus Output extrahieren
    const urlMatch = stdout.match(/https:\/\/[^\s]+/);
    const url = urlMatch ? urlMatch[0] : 'https://cc24.vercel.app';
    
    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error('[Activity] Vercel deployment failed:', error);
    return {
      success: false,
      url: '',
      error: error.message,
    };
  }
}

export interface BuildDockerInput {
  branch: string;
  tag: string;
}

export interface BuildDockerOutput {
  success: boolean;
  image: string;
  error?: string;
}

export async function buildDocker(input: BuildDockerInput): Promise<BuildDockerOutput> {
  try {
    console.log('[Activity] Building Docker image...');
    
    const imageName = `ghcr.io/vegafoundation/cc24/cc24-demo:${input.tag}`;
    
    // Docker Build
    await execAsync(
      `docker build -t ${imageName} .`,
      { cwd: process.cwd() }
    );

    // Docker Push
    await execAsync(
      `docker push ${imageName}`,
      { cwd: process.cwd() }
    );
    
    return {
      success: true,
      image: imageName,
    };
  } catch (error) {
    console.error('[Activity] Docker build/push failed:', error);
    return {
      success: false,
      image: '',
      error: error.message,
    };
  }
}

export interface HealthCheckInput {
  url: string;
}

export interface HealthCheckOutput {
  success: boolean;
  status: number;
  error?: string;
}

export async function healthCheck(input: HealthCheckInput): Promise<HealthCheckOutput> {
  try {
    console.log(`[Activity] Health check for ${input.url}...`);
    
    const response = await fetch(input.url, {
      method: 'GET',
      headers: { 'Accept': 'text/html' },
    });
    
    return {
      success: response.ok,
      status: response.status,
    };
  } catch (error) {
    console.error('[Activity] Health check failed:', error);
    return {
      success: false,
      status: 0,
      error: error.message,
    };
  }
}
