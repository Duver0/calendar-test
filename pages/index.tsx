import { useState, useEffect, useCallback } from 'react';
import type { DayClickPayload, GitHubConfig } from '@/types';
import { storageService } from '@/services/storage';
import { useTeamState } from '@/hooks/useTeamState';
import { useAuth } from '@/hooks/useAuth';
import { useCalendar } from '@/hooks/useCalendar';
import { useResponsive } from '@/hooks/useResponsive';
import { useGitHubPersistence } from '@/hooks/useGitHubPersistence';
import { AdminBar } from '@/components/AdminBar';
import { TabSwitcher } from '@/components/TabSwitcher';
import { TeamView } from '@/components/TeamView';
import { CalendarView } from '@/components/CalendarView';
import { AdminModal } from '@/components/AdminModal';
import { AddMemberModal } from '@/components/AddMemberModal';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { DayOverrideModal } from '@/components/DayOverrideModal';
import { GitHubConfigModal } from '@/components/GitHubConfigModal';
import { DESKTOP_BREAKPOINT } from '@/constants';

const GITHUB_CONFIG_KEY = 'github_config';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'team' | 'calendar'>('team');
  const [addModal, setAddModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [dayModal, setDayModal] = useState<DayClickPayload | null>(null);
  const [savedLocally, setSavedLocally] = useState(false);
  const [gitHubConfigModal, setGitHubConfigModal] = useState(false);
  const [gitHubConfig, setGitHubConfig] = useState<GitHubConfig | null>(null);

  const { team, setTeam, changeShift, addMember, removeMember, setDayOverride, getShiftForDay } =
    useTeamState([]);
  const { isAdmin, pinModal, setPinModal, requestAdmin, verifyPin, logout } = useAuth();
  const { today, calYear, calMonth, prevMonth, nextMonth } = useCalendar();
  const { width, isDesktop } = useResponsive();
  const { saving, loading, error, successMsg, loadFromGitHub, saveToGitHub, clearMessages } =
    useGitHubPersistence();

  useEffect(() => {
    const loadedConfig = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (loadedConfig) {
      try {
        setGitHubConfig(JSON.parse(loadedConfig));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const saved = await storageService.loadTeam();
      setTeam(saved);
      setLoaded(true);
    })();
  }, [setTeam]);

  const handleSaveLocal = useCallback(async () => {
    await storageService.saveTeam(team);
    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 2000);
  }, [team]);

  const handleSaveGitHub = useCallback(
    async (createPR: boolean, prTitle?: string) => {
      if (!gitHubConfig) {
        setGitHubConfigModal(true);
        return;
      }
      await saveToGitHub(team, gitHubConfig, { createPR, prTitle });
    },
    [team, gitHubConfig, saveToGitHub],
  );

  const handleGitHubConfigSave = useCallback(
    async (config: GitHubConfig) => {
      localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
      setGitHubConfig(config);
      setGitHubConfigModal(false);

      const loaded = await loadFromGitHub(config);
      if (loaded) {
        setTeam(loaded);
      }
    },
    [loadFromGitHub, setTeam],
  );

  const handleAdminBtn = useCallback(() => {
    if (isAdmin) {
      logout();
      return;
    }
    requestAdmin();
  }, [isAdmin, logout, requestAdmin]);

  const handleAddMember = useCallback(
    (name: string, shift: string) => {
      addMember(name, shift as any);
      setAddModal(false);
    },
    [addMember],
  );

  const handleDelete = useCallback((index: number) => {
    setConfirmDelete(index);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (confirmDelete !== null) {
      removeMember(confirmDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete, removeMember]);

  const handleDayClick = useCallback((payload: DayClickPayload) => {
    setDayModal(payload);
  }, []);

  if (!loaded) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          fontSize: 14,
        }}
      >
        Cargando horarios...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: isDesktop ? '1.5rem' : '1.25rem 0',
        fontFamily: 'var(--font-sans)',
        maxWidth: isDesktop ? 1200 : 'unset',
        margin: '0 auto',
      }}
    >
      {isAdmin && (
        <AdminBar
          team={team}
          saving={saving}
          savedLocally={savedLocally}
          onSaveLocal={handleSaveLocal}
          onSaveGitHub={handleSaveGitHub}
          onConfigureGitHub={() => setGitHubConfigModal(true)}
          hasGitHubConfig={!!gitHubConfig}
        />
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          gap: 8,
        }}
      >
        <h2
          style={{
            fontSize: isDesktop ? 20 : 17,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          🗓 Horarios del equipo
        </h2>
        <button
          onClick={handleAdminBtn}
          style={{
            fontSize: 12,
            padding: '6px 14px',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          🔒 {isAdmin ? 'Salir' : 'Admin'}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(163,45,45,0.1)',
            border: '0.5px solid #A32D2D',
            borderRadius: 'var(--border-radius-md)',
            padding: '8px 14px',
            marginBottom: '1rem',
            fontSize: 12,
            color: '#e74c3c',
          }}
        >
          {error}
          <button
            onClick={clearMessages}
            style={{
              marginLeft: 12,
              background: 'none',
              border: 'none',
              color: '#e74c3c',
              cursor: 'pointer',
              fontSize: 12,
              textDecoration: 'underline',
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      {successMsg && (
        <div
          style={{
            background: 'rgba(59,109,17,0.1)',
            border: '0.5px solid #3B6D11',
            borderRadius: 'var(--border-radius-md)',
            padding: '8px 14px',
            marginBottom: '1rem',
            fontSize: 12,
            color: '#3B6D11',
          }}
        >
          {successMsg}
          <button
            onClick={clearMessages}
            style={{
              marginLeft: 12,
              background: 'none',
              border: 'none',
              color: '#3B6D11',
              cursor: 'pointer',
              fontSize: 12,
              textDecoration: 'underline',
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      <TabSwitcher view={view} onChange={setView} />

      {view === 'team' && (
        <TeamView
          team={team}
          isAdmin={isAdmin}
          isDesktop={isDesktop}
          onChangeShift={changeShift}
          onDelete={handleDelete}
          onAddClick={() => setAddModal(true)}
        />
      )}

      {view === 'calendar' && (
        <CalendarView
          team={team}
          calYear={calYear}
          calMonth={calMonth}
          today={today}
          isAdmin={isAdmin}
          width={width}
          getShiftForDay={getShiftForDay}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onDayClick={handleDayClick}
        />
      )}

      {pinModal && (
        <AdminModal onVerify={verifyPin} onClose={() => setPinModal(false)} />
      )}

      {addModal && (
        <AddMemberModal
          onAdd={handleAddMember}
          onClose={() => setAddModal(false)}
        />
      )}

      {confirmDelete !== null && team[confirmDelete] && (
        <ConfirmDeleteModal
          member={team[confirmDelete]}
          onConfirm={handleConfirmDelete}
          onClose={() => setConfirmDelete(null)}
        />
      )}

      {dayModal && team[dayModal.memberIdx] && (
        <DayOverrideModal
          dayModal={dayModal}
          member={team[dayModal.memberIdx]}
          currentShift={getShiftForDay(team[dayModal.memberIdx], dayModal.dateKey)}
          onSetOverride={setDayOverride}
          onClose={() => setDayModal(null)}
        />
      )}

      {gitHubConfigModal && (
        <GitHubConfigModal
          onSave={handleGitHubConfigSave}
          onClose={() => setGitHubConfigModal(false)}
        />
      )}
    </div>
  );
}
