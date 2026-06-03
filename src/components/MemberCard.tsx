import type { TeamMember, ShiftKey } from '@/types';
import { SHIFT_LABELS } from '@/constants';
import { Avatar } from './Avatar';
import { ShiftBadge } from './ShiftBadge';
import styles from './MemberCard.module.css';

interface MemberCardProps {
  member: TeamMember;
  index: number;
  isAdmin: boolean;
  compact?: boolean;
  onChangeShift: (index: number, shift: ShiftKey) => void;
  onDelete: (index: number) => void;
}

export function MemberCard({
  member,
  index,
  isAdmin,
  compact = false,
  onChangeShift,
  onDelete,
}: MemberCardProps) {
  const cardPadding = compact ? '14px 12px' : '18px 14px';
  const avatarSize = compact ? 44 : 52;
  const avatarFontSize = compact ? 14 : 15;
  const nameSize = compact ? 13 : 14;

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 12,
          padding: cardPadding,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: compact ? 8 : 10,
        }}
      >
        <Avatar
          name={member.name}
          colorIdx={member.colorIdx}
          size={avatarSize}
          fontSize={avatarFontSize}
        />
        <div
          style={{
            fontSize: nameSize,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {member.name}
        </div>

        {isAdmin ? (
          <select
            value={member.shift}
            onChange={(e) => onChangeShift(index, e.target.value as ShiftKey)}
            style={{
              width: '100%',
              fontSize: 12,
              padding: compact ? '4px 6px' : '5px 8px',
              border: '0.5px solid var(--color-border-secondary)',
              borderRadius: 8,
              background: 'var(--color-background-secondary)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
            }}
          >
            <option value="">Sin turno</option>
            <option value="s1">7:00 – 4:00</option>
            <option value="s2">8:00 – 5:00</option>
            <option value="s3">9:00 – 6:00</option>
            <option value="s4">10:00 – 7:00</option>
          </select>
        ) : member.shift ? (
          <ShiftBadge shift={member.shift} label={SHIFT_LABELS[member.shift]} size="md" />
        ) : (
          <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
            Sin asignar
          </span>
        )}
      </div>

      {isAdmin && (
        <button
          onClick={() => onDelete(index)}
          style={{
            position: 'absolute',
            top: compact ? 5 : 6,
            right: compact ? 5 : 6,
            background: 'rgba(163,45,45,0.1)',
            border: 'none',
            color: '#A32D2D',
            cursor: 'pointer',
            fontSize: compact ? 13 : 12,
            padding: compact ? '3px 5px' : '3px 6px',
            borderRadius: 6,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
