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
    async (team: TeamMember[], config: GitHubConfig): Promise<boolean> => {
      setSaving(true);
      setError(null);
      setSuccessMsg(null);
      try {
        const service = new GitHubService(config);
        await service.saveTeamData(team);
        await storageService.saveTeam(team);
        setSuccessMsg('Cambios guardados en GitHub');
        return true;
      } catch (e) {
        const msg =
          e instanceof GitHubServiceError
            ? e.message
            : 'Error al guardar en GitHub';
        setError(msg);
        return false;
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
