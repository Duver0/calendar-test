import type { TeamMember } from '@/types';
import { STORAGE_KEY, DEFAULT_TEAM } from '@/constants';

export interface StorageBackend {
  get(key: string): Promise<{ value: string } | null>;
  set(key: string, value: string): Promise<void>;
}

export class LocalStorageBackend implements StorageBackend {
  async get(key: string): Promise<{ value: string } | null> {
    try {
      const raw = localStorage.getItem(key);
      return raw ? { value: raw } : null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch {
      // storage full or disabled
    }
  }
}

export class StorageService {
  constructor(private backend: StorageBackend) {}

  async loadTeam(): Promise<TeamMember[]> {
    try {
      const result = await this.backend.get(STORAGE_KEY);
      if (result?.value) {
        return JSON.parse(result.value) as TeamMember[];
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_TEAM;
  }

  async saveTeam(team: TeamMember[]): Promise<void> {
    await this.backend.set(STORAGE_KEY, JSON.stringify(team));
  }
}

export const storageService = new StorageService(new LocalStorageBackend());
