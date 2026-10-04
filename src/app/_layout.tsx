import {
  DarkTheme,
  DefaultTheme,
  Redirect,
  Stack,
  ThemeProvider,
  router,
  type ErrorBoundaryProps,
} from 'expo-router';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

import { useAuth } from '@/components/useAuth';
import { AuthProvider } from '@/context/AuthContext';
import { designColours, designSizing, touchTargets } from '@/constants/theme';

function NavigationErrorBoundary(_: ErrorBoundaryProps) {
  return <Redirect href={'/error' as Parameters<typeof Redirect>[0]['href']} />;
}

export const unstable_settings = {
  screenErrorBoundary: NavigationErrorBoundary,
};

export function NavigationBar() {
  const canGoBack = router.canGoBack();
  const { isAuthenticated } = useAuth();

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
        onPress={() =>
          isAuthenticated
            ? router.push('/bookings' as Parameters<typeof router.push>[0])
            : router.push('/login' as Parameters<typeof router.push>[0])
        }
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
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="error" />
          <Stack.Screen name="list/index" />
          <Stack.Screen name="car/[id]" />
          <Stack.Screen name="checkout/index" />
          <Stack.Screen name="checkout/confirmation" />
          <Stack.Screen name="bookings/index" />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
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
    paddingBottom: designSizing.xs,
    paddingTop: designSizing.xs,
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
    fontSize: designSizing.xl2,
    lineHeight: 24,
  },
  navigationIconDisabled: {
    color: designColours.textMuted,
  },
  navigationLabel: {
    color: designColours.text,
    fontSize: designSizing.xs,
    fontWeight: '600',
  },
  navigationLabelDisabled: {
    color: designColours.textMuted,
  },
});
