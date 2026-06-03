import { SHIFT_LABELS, SHIFT_KEYS, SHIFT_STYLES } from '@/constants';

interface ShiftLegendProps {
  isDesktop: boolean;
}

export function ShiftLegend({ isDesktop }: ShiftLegendProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? 'repeat(4,1fr)' : 'repeat(2,1fr)',
        gap: 8,
        marginBottom: '1.25rem',
      }}
    >
      {SHIFT_KEYS.map((k) => (
        <div
          key={k}
          style={{
            ...SHIFT_STYLES[k],
            borderRadius: 'var(--border-radius-md)',
            padding: isDesktop ? '10px 14px' : '8px 10px',
            fontSize: isDesktop ? 13 : 12,
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          🕐 {SHIFT_LABELS[k]}
        </div>
      ))}
    </div>
  );
}
