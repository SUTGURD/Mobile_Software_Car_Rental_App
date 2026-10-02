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
  readonly xl: number;
  readonly xl2: number;
  readonly xl3: number;
  readonly xl4: number;
  readonly xl5: number;
  readonly xl6: number;
  readonly xl7: number;
  readonly xl8: number;
  readonly xl9: number;
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
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xl2: 24,
  xl3: 30,
  xl4: 36,
  xl5: 48,
  xl6: 60,
  xl7: 72,
  xl8: 96,
  xl9: 128,
} as const satisfies DesignSizing;

export const touchTargets = {
  minimumHeight: 48,
  minimumWidth: 48,
} as const satisfies TouchTargets;
