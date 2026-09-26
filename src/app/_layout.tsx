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
  return (
    <View style={styles.navigation}>
      <NavigationButton label="Home" icon="⌂" onPress={() => router.replace('/')} />
      <NavigationButton label="Search" icon="⌕" onPress={() => router.replace('/')} />
      <NavigationButton
        label="Calendar"
        icon="□"
        onPress={() => router.push('/bookings' as Parameters<typeof router.push>[0])}
      />
      <NavigationButton label="Back" icon="‹" onPress={() => router.back()} />
    </View>
  );
}

function NavigationButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={styles.navigationItem}>
      <Text style={styles.navigationIcon}>{icon}</Text>
      <Text style={styles.navigationLabel}>{label}</Text>
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
  navigationIcon: {
    color: designColours.primary,
    fontSize: 22,
    lineHeight: 24,
  },
  navigationLabel: {
    color: designColours.text,
    fontSize: 12,
    fontWeight: '600',
  },
});
