import type { TeamMember, DayClickPayload, ShiftKey } from '@/types';
import { MONTHS_ES, DESKTOP_BREAKPOINT, WIDE_BREAKPOINT } from '@/constants';
import { MiniCalendar } from './MiniCalendar';

interface CalendarViewProps {
  team: TeamMember[];
  calYear: number;
  calMonth: number;
  today: Date;
  isAdmin: boolean;
  width: number;
  getShiftForDay: (member: TeamMember, dateKey: string) => ShiftKey;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDayClick: (payload: DayClickPayload) => void;
}

export function CalendarView({
  team,
  calYear,
  calMonth,
  today,
  isAdmin,
  width,
  getShiftForDay,
  onPrevMonth,
  onNextMonth,
  onDayClick,
}: CalendarViewProps) {
  const isDesktop = width >= DESKTOP_BREAKPOINT;
  const isWide = width >= WIDE_BREAKPOINT;

  const columns = isDesktop ? (isWide ? 3 : 2) : 1;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}
      >
        <button
          onClick={onPrevMonth}
          style={{
            padding: '6px 14px',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontSize: isDesktop ? 16 : 15,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {MONTHS_ES[calMonth]} {calYear}
        </span>
        <button
          onClick={onNextMonth}
          style={{
            padding: '6px 14px',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ›
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns},1fr)`,
          gap: 16,
        }}
      >
        {team.map((member, mi) => (
          <MiniCalendar
            key={mi}
            member={member}
            mi={mi}
            calYear={calYear}
            calMonth={calMonth}
            today={today}
            isAdmin={isAdmin}
            getShiftForDay={getShiftForDay}
            onDayClick={onDayClick}
          />
        ))}
      </div>

      {isAdmin && (
        <p
          style={{
            fontSize: 11,
            color: 'var(--color-text-tertiary)',
            marginTop: '1rem',
            textAlign: 'center',
          }}
        >
          💡 Haz clic en cualquier día para cambiar el turno de esa persona en ese día
        </p>
      )}
    </div>
  );
}
