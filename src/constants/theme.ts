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

export interface DesignSpacing {
  readonly xs: 4;
  readonly sm: 8;
  readonly md: 16;
  readonly lg: 24;
}

export interface TouchTargets {
  readonly minimumHeight: 48;
  readonly minimumWidth: 48;
}

export interface DesignTokens {
  readonly colours: DesignColours;
  readonly spacing: DesignSpacing;
  readonly touchTargets: TouchTargets;
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

export const designSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const satisfies DesignSpacing;

export const touchTargets = {
  minimumHeight: 48,
  minimumWidth: 48,
} as const satisfies TouchTargets;

export const designTokens = {
  colours: designColours,
  spacing: designSpacing,
  touchTargets,
} as const satisfies DesignTokens;