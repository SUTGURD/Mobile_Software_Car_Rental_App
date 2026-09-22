import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, Pressable } from 'react-native';

import { designColours, designSpacing, touchTargets } from '@/constants/theme';

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Car details</Text>
      <Text style={styles.carId}>{id}</Text>
      <Pressable
        accessibilityLabel="Back to Browse Cars"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={styles.button}>
        <Text style={styles.buttonText}>Back to Browse Cars</Text>
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
    padding: designSpacing.lg,
  },
  title: {
    color: designColours.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  carId: {
    color: designColours.textMuted,
    fontSize: 16,
    marginVertical: designSpacing.md,
  },
  button: {
    alignItems: 'center',
    backgroundColor: designColours.primary,
    borderRadius: designSpacing.sm,
    justifyContent: 'center',
    minHeight: touchTargets.minimumHeight,
    paddingHorizontal: designSpacing.md,
  },
  buttonText: {
    color: designColours.card,
    fontSize: 16,
    fontWeight: '700',
  },
});
