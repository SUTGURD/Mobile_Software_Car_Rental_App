/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

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
