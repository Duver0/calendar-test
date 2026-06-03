import { useState, useCallback, useRef } from 'react';

export function useCalendar() {
  const today = useRef(new Date()).current;
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const prevMonth = useCallback(() => {
    if (calMonth === 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else {
      setCalMonth((m) => m - 1);
    }
  }, [calMonth]);

  const nextMonth = useCallback(() => {
    if (calMonth === 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else {
      setCalMonth((m) => m + 1);
    }
  }, [calMonth]);

  return {
    today,
    calYear,
    calMonth,
    prevMonth,
    nextMonth,
  };
}
