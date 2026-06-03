import type { TeamMember, GitHubConfig } from '@/types';

interface GitHubContentResponse {
  content: string;
  sha: string;
  path: string;
}

interface GitHubCommitResponse {
  content: { sha: string };
}

interface GitHubRefResponse {
  object: { sha: string };
}

interface GitHubPullResponse {
  html_url: string;
  number: number;
}

export class GitHubServiceError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'GitHubServiceError';
  }
}

export class GitHubService {
  private baseUrl = 'https://api.github.com';

  constructor(private config: GitHubConfig) {}

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.config.token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'team-schedule-app',
    };
  }

  async fetchTeamData(): Promise<TeamMember[]> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/data/team.json`;
    const res = await fetch(url, { headers: this.headers });

    if (res.status === 404) {
      return [];
    }

    if (!res.ok) {
      throw new GitHubServiceError(
        `Failed to fetch team data: ${res.statusText}`,
        res.status,
      );
    }

    const data = (await res.json()) as GitHubContentResponse;
    const decoded = atob(data.content);
    return JSON.parse(decoded) as TeamMember[];
  }

  async saveTeamData(
    team: TeamMember[],
    options?: { createPR?: boolean; prTitle?: string },
  ): Promise<{ commitUrl?: string; prUrl?: string }> {
    const content = btoa(JSON.stringify(team, null, 2));
    const path = 'data/team.json';
    const message = options?.createPR
      ? `[WIP] Actualizar horarios del equipo`
      : `Actualizar horarios del equipo`;

    const currentSha = await this.getFileSha(path);

    if (options?.createPR) {
      return this.saveViaPR(path, content, message, currentSha, options.prTitle);
    }

    return this.saveDirect(path, content, message, currentSha);
  }

  private async saveDirect(
    path: string,
    content: string,
    message: string,
    sha: string | null,
  ): Promise<{ commitUrl?: string }> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;
    const body: Record<string, unknown> = {
      message,
      content,
      branch: 'main',
    };
    if (sha) body.sha = sha;

    const res = await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new GitHubServiceError(
        `Failed to save team data: ${res.statusText}`,
        res.status,
      );
    }

    const data = (await res.json()) as GitHubCommitResponse;
    return { commitUrl: data.content.sha };
  }

  private async saveViaPR(
    path: string,
    content: string,
    message: string,
    sha: string | null,
    prTitle?: string,
  ): Promise<{ prUrl: string }> {
    const branchName = `update-schedule-${Date.now()}`;

    const mainRef = await this.getMainRefSha();
    await this.createBranch(branchName, mainRef);

    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;
    const body: Record<string, unknown> = {
      message,
      content,
      branch: branchName,
    };
    if (sha) body.sha = sha;

    const contentRes = await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!contentRes.ok) {
      throw new GitHubServiceError(
        `Failed to write file on branch: ${contentRes.statusText}`,
        contentRes.status,
      );
    }

    const prRes = await fetch(
      `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/pulls`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          title: prTitle || 'Actualizar horarios del equipo',
          head: branchName,
          base: 'main',
          body: 'Cambios realizados desde la aplicación de horarios.',
        }),
      },
    );

    if (!prRes.ok) {
      throw new GitHubServiceError(
        `Failed to create PR: ${prRes.statusText}`,
        prRes.status,
      );
    }

    const prData = (await prRes.json()) as GitHubPullResponse;
    return { prUrl: prData.html_url };
  }

  private async getFileSha(path: string): Promise<string | null> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;
    const res = await fetch(url, { headers: this.headers });

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const data = (await res.json()) as GitHubContentResponse;
    return data.sha;
  }

  private async getMainRefSha(): Promise<string> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/git/refs/heads/main`;
    const res = await fetch(url, { headers: this.headers });

    if (!res.ok) {
      throw new GitHubServiceError(
        `Failed to get main ref: ${res.statusText}`,
        res.status,
      );
    }

    const data = (await res.json()) as GitHubRefResponse;
    return data.object.sha;
  }

  private async createBranch(name: string, sha: string): Promise<void> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/git/refs`;
    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ref: `refs/heads/${name}`,
        sha,
      }),
    });

    if (!res.ok) {
      throw new GitHubServiceError(
        `Failed to create branch: ${res.statusText}`,
        res.status,
      );
    }
  }
}

export function createGitHubService(config: GitHubConfig): GitHubService {
  return new GitHubService(config);
}
