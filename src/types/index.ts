export type ShiftKey = 's1' | 's2' | 's3' | 's4' | '';

export interface DayOverrides {
  [dateKey: string]: ShiftKey | undefined;
}

export interface TeamMember {
  name: string;
  shift: ShiftKey;
  colorIdx: number;
  dayOverrides: DayOverrides;
}

export interface ShiftStyle {
  background: string;
  color: string;
}

export interface AvatarColor {
  bg: string;
  color: string;
}

export interface DayClickPayload {
  memberIdx: number;
  dateKey: string;
  day: number;
  memberName: string;
}

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

export interface CreatePROption {
  createPR: boolean;
  prTitle?: string;
}
