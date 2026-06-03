import type { TeamMember, ShiftKey } from '@/types';
import { SHIFT_LABELS, SHIFT_KEYS, SHIFT_STYLES, SIDEBAR_WIDTH } from '@/constants';
import { MemberCard } from './MemberCard';
import { ShiftLegend } from './ShiftLegend';

interface TeamViewProps {
  team: TeamMember[];
  isAdmin: boolean;
  isDesktop: boolean;
  onChangeShift: (index: number, shift: ShiftKey) => void;
  onDelete: (index: number) => void;
  onAddClick: () => void;
}

export function TeamView({
  team,
  isAdmin,
  isDesktop,
  onChangeShift,
  onDelete,
  onAddClick,
}: TeamViewProps) {
  const countsByShift = SHIFT_KEYS.reduce(
    (acc, k) => {
      acc[k] = team.filter((m) => m.shift === k).length;
      return acc;
    },
    {} as Record<string, number>,
  );
  const unassigned = team.filter((m) => !m.shift).length;

  const renderAddButton = () =>
    isAdmin && (
      <button
        onClick={onAddClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontSize: 13,
          border: '0.5px dashed var(--color-border-secondary)',
          borderRadius: 12,
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          minHeight: isDesktop ? 140 : 120,
        }}
      >
        + Agregar persona
      </button>
    );

  const renderCard = (m: TeamMember, i: number) => (
    <MemberCard
      key={m.name + i}
      member={m}
      index={i}
      isAdmin={isAdmin}
      compact={!isDesktop}
      onChangeShift={onChangeShift}
      onDelete={onDelete}
    />
  );

  if (!isDesktop) {
    return (
      <>
        <ShiftLegend isDesktop={false} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
            gap: 10,
          }}
        >
          {team.map(renderCard)}
          {renderAddButton()}
        </div>
      </>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div
        style={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 2,
          }}
        >
          Turnos
        </p>
        {SHIFT_KEYS.map((k) => (
          <div
            key={k}
            style={{
              ...SHIFT_STYLES[k],
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            🕐 {SHIFT_LABELS[k]}
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
              {countsByShift[k]} persona{countsByShift[k] !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
        <div
          style={{
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 12,
            background: 'var(--color-background-secondary)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Sin asignar
          <div style={{ fontSize: 11, marginTop: 2 }}>
            {unassigned} persona{unassigned !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
            gap: 12,
          }}
        >
          {team.map(renderCard)}
          {renderAddButton()}
        </div>
      </div>
    </div>
  );
}
