import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  router,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { designColours, designSpacing, touchTargets } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export function NavigationBar() {
  const canGoBack = router.canGoBack();

  return (
    <View style={styles.navigation}>
      <NavigationButton label="Home" icon="⌂" onPress={() => router.replace('/')} />
      <NavigationButton
        label="Search"
        icon="⌕"
        onPress={() =>
          router.replace('/list' as Parameters<typeof router.replace>[0])
        }
      />
      <NavigationButton
        label="Calendar"
        icon="□"
        onPress={() => router.push('/bookings' as Parameters<typeof router.push>[0])}
      />
      <NavigationButton
        disabled={!canGoBack}
        label="Back"
        icon="‹"
        onPress={() => {
          if (canGoBack) {
            router.back();
          }
        }}
      />
    </View>
  );
}

function NavigationButton({
  label,
  icon,
  onPress,
  disabled = false,
}: {
  label: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const buttonStyle = [styles.navigationItem, disabled && styles.navigationItemDisabled];
  const iconStyle = [styles.navigationIcon, disabled && styles.navigationIconDisabled];
  const labelStyle = [styles.navigationLabel, disabled && styles.navigationLabelDisabled];

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={buttonStyle}>
      <Text style={iconStyle}>{icon}</Text>
      <Text style={labelStyle}>{label}</Text>
    </Pressable>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="list/index" />
        <Stack.Screen name="car/[id]" />
        <Stack.Screen name="checkout/index" />
        <Stack.Screen name="checkout/confirmation" />
        <Stack.Screen name="bookings/index" />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    backgroundColor: designColours.card,
    borderTopColor: designColours.secondary,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: designSpacing.xs,
    paddingTop: designSpacing.xs,
  },
  navigationItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: touchTargets.minimumHeight,
    minWidth: touchTargets.minimumWidth,
  },
  navigationItemDisabled: {
    opacity: 0.4,
  },
  navigationIcon: {
    color: designColours.primary,
    fontSize: 22,
    lineHeight: 24,
  },
  navigationIconDisabled: {
    color: designColours.textMuted,
  },
  navigationLabel: {
    color: designColours.text,
    fontSize: 12,
    fontWeight: '600',
  },
  navigationLabelDisabled: {
    color: designColours.textMuted,
  },
});
