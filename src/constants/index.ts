import type { TeamMember, ShiftKey, ShiftStyle, AvatarColor } from '@/types';
import teamData from '../../data/team.json';

const rawTeam = (teamData as unknown) as TeamMember[];

export const DEFAULT_TEAM: TeamMember[] =
  rawTeam.length > 0
    ? rawTeam
    : [
        { name: 'Ana Gómez', shift: 's1' as ShiftKey, colorIdx: 0, dayOverrides: {} },
        { name: 'Luis Torres', shift: 's2' as ShiftKey, colorIdx: 1, dayOverrides: {} },
        { name: 'María Ruiz', shift: 's3' as ShiftKey, colorIdx: 2, dayOverrides: {} },
        { name: 'Carlos Díaz', shift: 's4' as ShiftKey, colorIdx: 3, dayOverrides: {} },
        { name: 'Sofía Reyes', shift: 's1' as ShiftKey, colorIdx: 4, dayOverrides: {} },
        { name: 'Andrés López', shift: '' as ShiftKey, colorIdx: 5, dayOverrides: {} },
      ];

export const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '1632';

export const SHIFT_LABELS: Record<string, string> = {
  s1: '7:00 – 4:00',
  s2: '8:00 – 5:00',
  s3: '9:00 – 6:00',
  s4: '10:00 – 7:00',
};

export const SHIFT_KEYS: ShiftKey[] = ['s1', 's2', 's3', 's4'];

export const SHIFT_STYLES: Record<string, ShiftStyle> = {
  s1: { background: '#E6F1FB', color: '#0C447C' },
  s2: { background: '#EAF3DE', color: '#27500A' },
  s3: { background: '#FAEEDA', color: '#633806' },
  s4: { background: '#FBEAF0', color: '#72243E' },
};

export const AVATAR_COLORS: AvatarColor[] = [
  { bg: '#B5D4F4', color: '#0C447C' },
  { bg: '#C0DD97', color: '#27500A' },
  { bg: '#FAC775', color: '#633806' },
  { bg: '#F4C0D1', color: '#72243E' },
  { bg: '#CECBF6', color: '#3C3489' },
  { bg: '#9FE1CB', color: '#085041' },
  { bg: '#F5C4B3', color: '#712B13' },
];

export const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const STORAGE_KEY = 'team_data_v3';

export const SIDEBAR_WIDTH = 200;
export const DESKTOP_BREAKPOINT = 720;
export const WIDE_BREAKPOINT = 1100;
