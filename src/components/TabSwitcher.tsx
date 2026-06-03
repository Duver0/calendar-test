interface TabSwitcherProps {
  view: 'team' | 'calendar';
  onChange: (view: 'team' | 'calendar') => void;
}

const TABS = [
  { key: 'team' as const, label: '👥 Equipo' },
  { key: 'calendar' as const, label: '📅 Calendario' },
];

export function TabSwitcher({ view, onChange }: TabSwitcherProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        marginBottom: '1.25rem',
        background: 'var(--color-background-secondary)',
        borderRadius: 'var(--border-radius-md)',
        padding: 4,
      }}
    >
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            flex: 1,
            padding: '7px 0',
            fontSize: 13,
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            background: view === key ? 'var(--color-background-primary)' : 'transparent',
            color: view === key ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontWeight: view === key ? 500 : 400,
            boxShadow: view === key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all .15s',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
