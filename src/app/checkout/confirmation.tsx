import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { designColours, designSpacing, touchTargets } from '@/constants/theme';
import { dummyCars } from '@/data/dummyCars';

export default function ConfirmationScreen() {
  const params = useLocalSearchParams<{
    carId?: string;
    pickupDate?: string;
    returnDate?: string;
    totalPrice?: string;
  }>();
  const car = useMemo(
    () => dummyCars.find((candidate) => candidate.carId === params.carId) ?? dummyCars[0],
    [params.carId],
  );
  const bookingReference = `BK-${car.carId.replace('car-', '').slice(0, 4).toUpperCase()}-${String(
    params.pickupDate ?? '00-00',
  ).replaceAll('-', '').slice(-2)}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.title}>Booking Confirmed</Text>
        <Text style={styles.subtitle}>Your car is reserved and ready for collection.</Text>
        <View style={styles.referenceBox}>
          <Text style={styles.referenceLabel}>Booking reference</Text>
          <Text style={styles.reference}>{bookingReference}</Text>
        </View>
        <View style={styles.summary}>
          <SummaryRow label="Car" value={`${car.brand} ${car.model}`} />
          <SummaryRow label="Pickup date" value={params.pickupDate ?? 'Not set'} />
          <SummaryRow label="Return date" value={params.returnDate ?? 'Not set'} />
          <SummaryRow label="Total price" value={`£${params.totalPrice ?? car.pricePerDay}`} />
        </View>
        <Pressable
          accessibilityLabel="Return to home"
          accessibilityRole="button"
          onPress={() => router.replace('/')}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Return Home</Text>
        </Pressable>
      </View>
      <NavigationBar />
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function NavigationBar() {
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

function NavigationButton({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <Pressable accessibilityLabel={label} accessibilityRole="button" onPress={onPress} style={styles.navigationItem}>
      <Text style={styles.navigationIcon}>{icon}</Text>
      <Text style={styles.navigationLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: designColours.background, flex: 1 },
  content: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: designSpacing.md },
  successIcon: { alignItems: 'center', backgroundColor: '#177245', borderRadius: 40, color: designColours.card, fontSize: 42, height: 80, lineHeight: 76, textAlign: 'center', width: 80 },
  title: { color: designColours.primary, fontSize: 28, fontWeight: '700', marginTop: designSpacing.md },
  subtitle: { color: designColours.textMuted, fontSize: 16, marginTop: designSpacing.sm, textAlign: 'center' },
  referenceBox: { alignItems: 'center', backgroundColor: designColours.card, borderRadius: designSpacing.md, marginTop: designSpacing.lg, padding: designSpacing.md, width: '100%' },
  referenceLabel: { color: designColours.textMuted, fontSize: 14 },
  reference: { color: designColours.primary, fontSize: 24, fontWeight: '700', letterSpacing: 1, marginTop: designSpacing.xs },
  summary: { backgroundColor: designColours.card, borderRadius: designSpacing.md, marginTop: designSpacing.md, padding: designSpacing.md, width: '100%' },
  summaryRow: { borderBottomColor: designColours.background, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', minHeight: touchTargets.minimumHeight, paddingVertical: designSpacing.sm },
  summaryLabel: { color: designColours.textMuted, fontSize: 15 },
  summaryValue: { color: designColours.text, fontSize: 15, fontWeight: '600', textAlign: 'right' },
  primaryButton: { alignItems: 'center', backgroundColor: designColours.primary, borderRadius: designSpacing.sm, justifyContent: 'center', minHeight: touchTargets.minimumHeight, marginTop: designSpacing.md, paddingHorizontal: designSpacing.md, width: '100%' },
  primaryButtonText: { color: designColours.card, fontSize: 17, fontWeight: '700' },
  navigation: { alignItems: 'center', backgroundColor: designColours.card, borderTopColor: designColours.secondary, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: designSpacing.xs, paddingTop: designSpacing.xs },
  navigationItem: { alignItems: 'center', justifyContent: 'center', minHeight: touchTargets.minimumHeight, minWidth: touchTargets.minimumWidth },
  navigationIcon: { color: designColours.primary, fontSize: 22, lineHeight: 24 },
  navigationLabel: { color: designColours.text, fontSize: 12, fontWeight: '600' },
});
