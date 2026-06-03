import { AVATAR_COLORS } from '@/constants';
import { initials } from '@/utils/string';

interface AvatarProps {
  name: string;
  colorIdx: number;
  size?: number;
  fontSize?: number;
}

export function Avatar({ name, colorIdx, size = 32, fontSize = 12 }: AvatarProps) {
  const av = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: av.bg,
        color: av.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}
