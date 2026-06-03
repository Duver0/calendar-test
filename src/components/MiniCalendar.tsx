import type { TeamMember, DayClickPayload, ShiftKey } from '@/types';
import { SHIFT_LABELS, SHIFT_STYLES, DAYS_ES } from '@/constants';
import { getDaysInMonth, getFirstDay, formatDateKey, isToday, isWeekend } from '@/utils/date';
import { Avatar } from './Avatar';

interface MiniCalendarProps {
  member: TeamMember;
  mi: number;
  calYear: number;
  calMonth: number;
  today: Date;
  isAdmin: boolean;
  getShiftForDay: (member: TeamMember, dateKey: string) => ShiftKey;
  onDayClick: (payload: DayClickPayload) => void;
}

export function MiniCalendar({
  member,
  mi,
  calYear,
  calMonth,
  today,
  isAdmin,
  getShiftForDay,
  onDayClick,
}: MiniCalendarProps) {
  const days = getDaysInMonth(calYear, calMonth);
  const first = getFirstDay(calYear, calMonth);
  const cells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  return (
    <div
      style={{
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 12,
        padding: '14px 12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          flexWrap: 'wrap',
        }}
      >
        <Avatar name={member.name} colorIdx={member.colorIdx} />
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {member.name}
        </span>
        {member.shift && (
          <span
            style={{
              ...SHIFT_STYLES[member.shift],
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 20,
              fontWeight: 500,
            }}
          >
            base: {SHIFT_LABELS[member.shift]}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7,1fr)',
          gap: 2,
          marginBottom: 3,
        }}
      >
        {DAYS_ES.map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontSize: 9,
              color: 'var(--color-text-tertiary)',
              fontWeight: 600,
              padding: '2px 0',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7,1fr)',
          gap: 2,
        }}
      >
        {cells.map((day, ci) => {
          if (!day) return <div key={`b${ci}`} />;

          const dk = formatDateKey(calYear, calMonth, day);
          const currentShift = getShiftForDay(member, dk);
          const ss = currentShift ? SHIFT_STYLES[currentShift] : undefined;
          const isDayToday = isToday(calYear, calMonth, day, today);
          const weekend = isWeekend(calYear, calMonth, day);
          const hasOverride = member.dayOverrides?.[dk] !== undefined;

          return (
            <div
              key={dk}
              onClick={() =>
                isAdmin && onDayClick({ memberIdx: mi, dateKey: dk, day, memberName: member.name })
              }
              style={{
                borderRadius: 5,
                padding: '5px 2px',
                textAlign: 'center',
                background: ss
                  ? ss.background
                  : weekend
                    ? 'transparent'
                    : 'var(--color-background-secondary)',
                border: isDayToday
                  ? '1.5px solid #4a8efa'
                  : hasOverride
                    ? `1.5px dashed ${ss ? ss.color : '#888'}`
                    : '0.5px solid transparent',
                cursor: isAdmin ? 'pointer' : 'default',
                opacity: weekend && !currentShift ? 0.3 : 1,
                transition: 'opacity .12s, transform .1s',
              }}
              onMouseEnter={(e) => {
                if (isAdmin) (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: isDayToday ? 700 : 400,
                  color: ss ? ss.color : 'var(--color-text-tertiary)',
                  lineHeight: 1.2,
                }}
              >
                {day}
              </div>
              {ss && (
                <div
                  style={{
                    fontSize: 8,
                    color: ss.color,
                    lineHeight: 1.2,
                    marginTop: 1,
                    fontWeight: 500,
                  }}
                >
                  {SHIFT_LABELS[currentShift].split('–')[0].trim()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
