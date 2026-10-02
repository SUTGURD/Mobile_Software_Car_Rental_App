type HexColour = `#${string}`;

export interface DesignColours {
  readonly primary: HexColour;
  readonly secondary: HexColour;
  readonly background: HexColour;
  readonly card: HexColour;
  readonly text: HexColour;
  readonly textMuted: HexColour;
  readonly accent: HexColour;
}

export interface DesignSizing {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
}

export interface TouchTargets {
  readonly minimumHeight: number;
  readonly minimumWidth: number;
}

export const designColours = {
  primary: '#2B3A55',
  secondary: '#4C6D8C',
  background: '#D0E8F7',
  card: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  accent: '#C0392B',
} as const satisfies DesignColours;

export const designSizing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const satisfies DesignSizing;

export const touchTargets = {
  minimumHeight: 48,
  minimumWidth: 48,
} as const satisfies TouchTargets;
