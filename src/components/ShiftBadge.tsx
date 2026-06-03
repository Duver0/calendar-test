import type { ShiftKey } from '@/types';
import { SHIFT_LABELS, SHIFT_STYLES } from '@/constants';

interface ShiftBadgeProps {
  shift: ShiftKey;
  label?: string;
  size?: 'sm' | 'md';
}

export function ShiftBadge({ shift, label, size = 'sm' }: ShiftBadgeProps) {
  if (!shift) return null;

  const style = SHIFT_STYLES[shift];
  const text = label || SHIFT_LABELS[shift];

  const padding = size === 'sm' ? '2px 8px' : '3px 10px';
  const fontSize = size === 'sm' ? 10 : 11;

  return (
    <span
      style={{
        ...style,
        fontSize,
        padding,
        borderRadius: 20,
        fontWeight: 500,
      }}
    >
      {text}
    </span>
  );
}
