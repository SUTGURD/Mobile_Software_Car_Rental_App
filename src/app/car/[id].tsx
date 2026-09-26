import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NavigationBar } from '@/app/_layout';
import { designColours, designSpacing, touchTargets } from '@/constants/theme';
import { dummyCars } from '@/data/dummyCars';

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function StatusValue({ value }: { value: boolean }) {
  return (
    <Text style={[styles.specValue, value ? styles.statusGood : styles.statusBad]}>
      {value ? 'Yes' : 'No'}
    </Text>
  );
}

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const carId = Array.isArray(id) ? id[0] : id;
  const car = useMemo(
    () => dummyCars.find((candidate) => candidate.carId === carId),
    [carId],
  );

  if (!car) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.fallback}>
          <Text style={styles.fallbackTitle}>Car not found</Text>
          <Text style={styles.fallbackText}>
            The vehicle you selected is no longer available.
          </Text>
          <Pressable
            accessibilityLabel="Return to Browse Cars"
            accessibilityRole="button"
            onPress={() => router.replace('/')}
            style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Browse Cars</Text>
          </Pressable>
        </View>
        <NavigationBar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <Text style={styles.heroEyebrow}>{formatLabel(car.size)} vehicle</Text>
          <Text style={styles.heroBrand}>{car.brand}</Text>
          <Text style={styles.heroModel}>{car.model}</Text>
          <Text style={styles.heroPrice}>£{car.pricePerDay} per day</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specifications}>
            <Specification label="Seats" value={`${car.seats} people`} />
            <Specification label="Luggage" value={`${car.luggageSpace} litres`} />
            <Specification
              label="Fuel efficiency"
              value={`${car.fuelEfficiency} km/l`}
            />
            <Specification label="Gear type" value={formatLabel(car.gearType)} />
            <Specification label="Fuel type" value={formatLabel(car.fuelType)} />
            <View style={styles.specification}>
              <Text style={styles.specLabel}>Cross-border travel</Text>
              <StatusValue value={car.crossBorderOk} />
            </View>
            <View style={styles.specification}>
              <Text style={styles.specLabel}>Environmental zone</Text>
              <StatusValue value={car.environmentZoneCompliant} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            {car.features.map((feature) => (
              <Text key={feature.featureId} style={styles.feature}>
                {feature.name}
              </Text>
            ))}
          </View>
        </View>

        <Pressable
          accessibilityLabel={`Rent ${car.brand} ${car.model}`}
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: '/checkout',
              params: { carId: car.carId },
            } as unknown as Parameters<typeof router.push>[0])
          }
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Rent Car</Text>
        </Pressable>
      </ScrollView>
      <NavigationBar />
    </SafeAreaView>
  );
}

function Specification({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.specification}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designColours.background,
    flex: 1,
  },
  scrollContent: {
    padding: designSpacing.md,
  },
  heroBanner: {
    backgroundColor: designColours.primary,
    borderRadius: designSpacing.md,
    minHeight: 190,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    padding: designSpacing.lg,
  },
  heroEyebrow: {
    color: designColours.background,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: designSpacing.sm,
  },
  heroBrand: {
    color: designColours.card,
    fontSize: 18,
    fontWeight: '600',
  },
  heroModel: {
    color: designColours.card,
    fontSize: 34,
    fontWeight: '700',
  },
  heroPrice: {
    color: designColours.background,
    fontSize: 17,
    fontWeight: '700',
    marginTop: designSpacing.sm,
  },
  section: {
    backgroundColor: designColours.card,
    borderRadius: designSpacing.md,
    marginTop: designSpacing.md,
    padding: designSpacing.md,
  },
  sectionTitle: {
    color: designColours.primary,
    fontSize: 21,
    fontWeight: '700',
    marginBottom: designSpacing.sm,
  },
  specifications: {
    gap: designSpacing.sm,
  },
  specification: {
    alignItems: 'center',
    borderBottomColor: designColours.background,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: touchTargets.minimumHeight,
  },
  specLabel: {
    color: designColours.textMuted,
    flex: 1,
    fontSize: 15,
  },
  specValue: {
    color: designColours.text,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  statusGood: {
    color: '#177245',
  },
  statusBad: {
    color: designColours.accent,
  },
  featureList: {
    gap: designSpacing.sm,
  },
  feature: {
    backgroundColor: designColours.background,
    borderRadius: designSpacing.sm,
    color: designColours.text,
    fontSize: 15,
    padding: designSpacing.sm,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: designColours.accent,
    borderRadius: designSpacing.sm,
    justifyContent: 'center',
    minHeight: touchTargets.minimumHeight,
    marginTop: designSpacing.md,
    paddingHorizontal: designSpacing.md,
  },
  primaryButtonText: {
    color: designColours.card,
    fontSize: 17,
    fontWeight: '700',
  },
  fallback: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: designSpacing.lg,
  },
  fallbackTitle: {
    color: designColours.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  fallbackText: {
    color: designColours.textMuted,
    fontSize: 16,
    marginTop: designSpacing.sm,
    textAlign: 'center',
  },
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
