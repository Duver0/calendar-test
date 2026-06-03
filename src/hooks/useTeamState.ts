import { useState, useCallback } from 'react';
import type { TeamMember, ShiftKey } from '@/types';
import { AVATAR_COLORS } from '@/constants';

export function useTeamState(initialTeam: TeamMember[]) {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);

  const changeShift = useCallback((index: number, shift: ShiftKey) => {
    setTeam((prev) =>
      prev.map((m, i) => (i === index ? { ...m, shift } : m)),
    );
  }, []);

  const addMember = useCallback((name: string, shift: ShiftKey) => {
    setTeam((prev) => [
      ...prev,
      {
        name: name.trim(),
        shift,
        colorIdx: prev.length % AVATAR_COLORS.length,
        dayOverrides: {},
      },
    ]);
  }, []);

  const removeMember = useCallback((index: number) => {
    setTeam((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setDayOverride = useCallback(
    (memberIdx: number, dateKey: string, shift: ShiftKey | '__default__') => {
      setTeam((prev) =>
        prev.map((m, i) => {
          if (i !== memberIdx) return m;
          const overrides = { ...(m.dayOverrides || {}) };
          if (shift === '__default__') {
            delete overrides[dateKey];
          } else {
            overrides[dateKey] = shift;
          }
          return { ...m, dayOverrides: overrides };
        }),
      );
    },
    [],
  );

  const getShiftForDay = useCallback(
    (member: TeamMember, dateKey: string): ShiftKey => {
      return member.dayOverrides?.[dateKey] !== undefined
        ? member.dayOverrides[dateKey]!
        : member.shift;
    },
    [],
  );

  return {
    team,
    setTeam,
    changeShift,
    addMember,
    removeMember,
    setDayOverride,
    getShiftForDay,
  };
}
