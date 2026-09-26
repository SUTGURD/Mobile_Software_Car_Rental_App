import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';

import { designColours, designSpacing, touchTargets } from '@/constants/theme';

export default function ErrorScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Error</Text>
      <Text style={styles.message}>
        An error has occurred
        {'\n'}
        Please return to previous page
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: designColours.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: designSpacing.md,
  },
  heading: {
    color: designColours.primary,
    fontSize: 88,
    fontWeight: '700',
    lineHeight: 96,
    textAlign: 'center',
  },
  message: {
    color: designColours.secondary,
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: designColours.secondary,
    borderRadius: designSpacing.md,
    justifyContent: 'center',
    marginTop: designSpacing.lg * 2,
    minHeight: touchTargets.minimumHeight,
  },
  buttonText: {
    color: designColours.card,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
