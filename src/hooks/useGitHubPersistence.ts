import { useState, useCallback } from 'react';
import type { TeamMember, GitHubConfig } from '@/types';
import { GitHubService, GitHubServiceError } from '@/services/github';
import { storageService } from '@/services/storage';

export function useGitHubPersistence() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadFromGitHub = useCallback(
    async (config: GitHubConfig): Promise<TeamMember[] | null> => {
      setLoading(true);
      setError(null);
      try {
        const service = new GitHubService(config);
        const team = await service.fetchTeamData();
        if (team.length > 0) {
          await storageService.saveTeam(team);
        }
        return team;
      } catch (e) {
        const msg =
          e instanceof GitHubServiceError
            ? e.message
            : 'Error al cargar desde GitHub';
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const saveToGitHub = useCallback(
    async (
      team: TeamMember[],
      config: GitHubConfig,
      options?: { createPR?: boolean; prTitle?: string },
    ): Promise<{ prUrl?: string } | null> => {
      setSaving(true);
      setError(null);
      setSuccessMsg(null);
      try {
        const service = new GitHubService(config);
        const result = await service.saveTeamData(team, options);
        await storageService.saveTeam(team);
        const msg = result.prUrl
          ? `PR creado: ${result.prUrl}`
          : 'Cambios guardados en GitHub';
        setSuccessMsg(msg);
        return result;
      } catch (e) {
        const msg =
          e instanceof GitHubServiceError
            ? e.message
            : 'Error al guardar en GitHub';
        setError(msg);
        return null;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMsg(null);
  }, []);

  return {
    saving,
    loading,
    error,
    successMsg,
    loadFromGitHub,
    saveToGitHub,
    clearMessages,
  };
}
