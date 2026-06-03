import { useState } from 'react';
import type { TeamMember } from '@/types';
import { storageService } from '@/services/storage';

interface AdminBarProps {
  team: TeamMember[];
  saving: boolean;
  savedLocally: boolean;
  onSaveLocal: () => void;
  onSaveGitHub: (createPR: boolean, prTitle?: string) => void;
  onConfigureGitHub: () => void;
  hasGitHubConfig: boolean;
}

export function AdminBar({
  team,
  saving,
  savedLocally,
  onSaveLocal,
  onSaveGitHub,
  onConfigureGitHub,
  hasGitHubConfig,
}: AdminBarProps) {
  const [createPR, setCreatePR] = useState(false);
  const [prTitle, setPrTitle] = useState('');

  const handleSave = () => {
    if (createPR) {
      onSaveGitHub(true, prTitle || undefined);
    } else {
      onSaveGitHub(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--color-background-secondary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-md)',
        padding: '8px 14px',
        marginBottom: '1rem',
        fontSize: 12,
        color: 'var(--color-text-secondary)',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      <span>✏️ Modo edición activo</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={createPR}
            onChange={(e) => setCreatePR(e.target.checked)}
          />
          Crear PR
        </label>

        {createPR && (
          <input
            type="text"
            placeholder="Título del PR (opcional)"
            value={prTitle}
            onChange={(e) => setPrTitle(e.target.value)}
            style={{
              padding: '4px 8px',
              fontSize: 12,
              border: '0.5px solid var(--color-border-secondary)',
              borderRadius: 'var(--border-radius-md)',
              background: 'transparent',
              color: 'var(--color-text-primary)',
              width: 200,
            }}
          />
        )}

        <button
          onClick={onConfigureGitHub}
          style={{
            fontSize: 12,
            padding: '4px 12px',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          🔗 {hasGitHubConfig ? 'Editar GitHub' : 'Configurar GitHub'}
        </button>

        <button
          onClick={onSaveLocal}
          style={{
            fontSize: 12,
            padding: '4px 12px',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          {savedLocally ? '✓ Guardado' : 'Guardar local'}
        </button>

        <button
          onClick={handleSave}
          disabled={saving || !hasGitHubConfig}
          style={{
            fontSize: 12,
            padding: '4px 12px',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            background: hasGitHubConfig ? '#4a8efa' : 'transparent',
            color: hasGitHubConfig ? '#fff' : 'var(--color-text-tertiary)',
            cursor: hasGitHubConfig ? 'pointer' : 'not-allowed',
            borderColor: hasGitHubConfig ? '#4a8efa' : undefined,
          }}
        >
          {saving ? 'Guardando...' : 'Guardar en GitHub'}
        </button>
      </div>
    </div>
  );
}
