interface AdminBarProps {
  saving: boolean;
  onSaveGitHub: () => void;
  onConfigureGitHub: () => void;
  hasGitHubConfig: boolean;
}

export function AdminBar({
  saving,
  onSaveGitHub,
  onConfigureGitHub,
  hasGitHubConfig,
}: AdminBarProps) {
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
          onClick={onSaveGitHub}
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
