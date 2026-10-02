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
import { useAuth } from '@/components/useAuth';
import { designColours, designSizing, touchTargets } from '@/constants/theme';
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
  const { isAuthenticated } = useAuth();
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
          onPress={() => {
            if (!isAuthenticated) {
              router.push('/login' as Parameters<typeof router.push>[0]);
              return;
            }
            router.push({
              pathname: '/checkout',
              params: { carId: car.carId },
            } as unknown as Parameters<typeof router.push>[0]);
          }}
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
    padding: designSizing.md,
  },
  heroBanner: {
    backgroundColor: designColours.primary,
    borderRadius: designSizing.md,
    minHeight: 190,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    padding: designSizing.lg,
  },
  heroEyebrow: {
    color: designColours.background,
    fontSize: designSizing.sm,
    fontWeight: '600',
    marginBottom: designSizing.sm,
  },
  heroBrand: {
    color: designColours.card,
    fontSize: designSizing.lg,
    fontWeight: '600',
  },
  heroModel: {
    color: designColours.card,
    fontSize: designSizing.xl4,
    fontWeight: '700',
  },
  heroPrice: {
    color: designColours.background,
    fontSize: designSizing.md,
    fontWeight: '700',
    marginTop: designSizing.sm,
  },
  section: {
    backgroundColor: designColours.card,
    borderRadius: designSizing.md,
    marginTop: designSizing.md,
    padding: designSizing.md,
  },
  sectionTitle: {
    color: designColours.primary,
    fontSize: designSizing.xl,
    fontWeight: '700',
    marginBottom: designSizing.sm,
  },
  specifications: {
    gap: designSizing.sm,
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
    fontSize: designSizing.md,
  },
  specValue: {
    color: designColours.text,
    fontSize: designSizing.md,
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
    gap: designSizing.sm,
  },
  feature: {
    backgroundColor: designColours.background,
    borderRadius: designSizing.sm,
    color: designColours.text,
    fontSize: designSizing.md,
    padding: designSizing.sm,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: designColours.accent,
    borderRadius: designSizing.sm,
    justifyContent: 'center',
    minHeight: touchTargets.minimumHeight,
    marginTop: designSizing.md,
    paddingHorizontal: designSizing.md,
  },
  primaryButtonText: {
    color: designColours.card,
    fontSize: designSizing.md,
    fontWeight: '700',
  },
  fallback: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: designSizing.lg,
  },
  fallbackTitle: {
    color: designColours.primary,
    fontSize: designSizing.xl3,
    fontWeight: '700',
  },
  fallbackText: {
    color: designColours.textMuted,
    fontSize: designSizing.md,
    marginTop: designSizing.sm,
    textAlign: 'center',
  },
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
  navigationIcon: {
    color: designColours.primary,
    fontSize: designSizing.xl2,
    lineHeight: 24,
  },
  navigationLabel: {
    color: designColours.text,
    fontSize: designSizing.xs,
    fontWeight: '600',
  },
});
