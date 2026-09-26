import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { NavigationBar } from '@/app/_layout';
import { designColours, designSpacing, touchTargets } from '@/constants/theme';
import { dummyAddOns, dummyCars } from '@/data/dummyCars';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function calculateRentalDays(startDate: string, endDate: string) {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return 1;
  }
  return Math.max(1, Math.ceil((end - start) / DAY_IN_MILLISECONDS));
}

export default function CheckoutScreen() {
  const { carId } = useLocalSearchParams<{ carId?: string | string[] }>();
  const selectedCarId = Array.isArray(carId) ? carId[0] : carId;
  const car = useMemo(
    () => dummyCars.find((candidate) => candidate.carId === selectedCarId) ?? dummyCars[0],
    [selectedCarId],
  );
  const [pickupDate, setPickupDate] = useState('2026-10-04');
  const [returnDate, setReturnDate] = useState('2026-10-07');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const rentalDays = calculateRentalDays(pickupDate, returnDate);
  const addOnTotal = dummyAddOns
    .filter((addOn) => selectedAddOnIds.includes(addOn.addOnId))
    .reduce((total, addOn) => total + addOn.price, 0);
  const totalPrice = car.pricePerDay * rentalDays + addOnTotal;

  function toggleAddOn(addOnId: string) {
    setSelectedAddOnIds((current) =>
      current.includes(addOnId)
        ? current.filter((id) => id !== addOnId)
        : [...current, addOnId],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.card}>
          <Text style={styles.cardBrand}>{car.brand}</Text>
          <Text style={styles.cardModel}>{car.model}</Text>
          <Text style={styles.cardPrice}>£{car.pricePerDay} per day</Text>
        </View>

        <Text style={styles.sectionTitle}>Rental dates</Text>
        <DateInput
          label="Pickup date"
          value={pickupDate}
          onChangeText={setPickupDate}
        />
        <DateInput
          label="Return date"
          value={returnDate}
          onChangeText={setReturnDate}
        />

        <Text style={styles.sectionTitle}>Add-ons</Text>
        {dummyAddOns.map((addOn) => {
          const selected = selectedAddOnIds.includes(addOn.addOnId);
          return (
            <Pressable
              accessibilityLabel={`${selected ? 'Remove' : 'Add'} ${addOn.name}`}
              accessibilityRole="button"
              key={addOn.addOnId}
              onPress={() => toggleAddOn(addOn.addOnId)}
              style={[styles.addOn, selected && styles.addOnSelected]}>
              <View>
                <Text style={styles.addOnName}>{addOn.name}</Text>
                <Text style={styles.addOnPrice}>£{addOn.price} total</Text>
              </View>
              <Text style={styles.addOnState}>{selected ? 'Added' : 'Add'}</Text>
            </Pressable>
          );
        })}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total, {rentalDays} days</Text>
          <Text style={styles.totalPrice}>£{totalPrice}</Text>
        </View>
        <Pressable
          accessibilityLabel="Confirm booking"
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: '/checkout/confirmation',
              params: {
                carId: car.carId,
                pickupDate,
                returnDate,
                totalPrice: String(totalPrice),
              },
            } as unknown as Parameters<typeof router.push>[0])
          }
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Confirm Booking</Text>
        </Pressable>
      </ScrollView>
      <NavigationBar />
    </SafeAreaView>
  );
}

function DateInput({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityRole="text"
        keyboardType="numbers-and-punctuation"
        onChangeText={onChangeText}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={designColours.textMuted}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: designColours.background, flex: 1 },
  content: { padding: designSpacing.md },
  title: { color: designColours.primary, fontSize: 30, fontWeight: '700', marginBottom: designSpacing.md },
  card: { backgroundColor: designColours.primary, borderRadius: designSpacing.md, padding: designSpacing.md },
  cardBrand: { color: designColours.background, fontSize: 15, fontWeight: '600' },
  cardModel: { color: designColours.card, fontSize: 25, fontWeight: '700' },
  cardPrice: { color: designColours.background, fontSize: 16, marginTop: designSpacing.sm },
  sectionTitle: { color: designColours.primary, fontSize: 20, fontWeight: '700', marginTop: designSpacing.lg, marginBottom: designSpacing.sm },
  inputGroup: { marginBottom: designSpacing.sm },
  inputLabel: { color: designColours.text, fontSize: 14, fontWeight: '600', marginBottom: designSpacing.xs },
  input: { backgroundColor: designColours.card, borderColor: designColours.secondary, borderRadius: designSpacing.sm, borderWidth: 1, color: designColours.text, fontSize: 16, height: touchTargets.minimumHeight, paddingHorizontal: designSpacing.md },
  addOn: { alignItems: 'center', backgroundColor: designColours.card, borderColor: designColours.card, borderRadius: designSpacing.sm, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: designSpacing.sm, minHeight: touchTargets.minimumHeight, padding: designSpacing.sm },
  addOnSelected: { borderColor: designColours.accent },
  addOnName: { color: designColours.text, fontSize: 16, fontWeight: '600' },
  addOnPrice: { color: designColours.textMuted, fontSize: 13, marginTop: designSpacing.xs },
  addOnState: { color: designColours.accent, fontWeight: '700' },
  totalRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: designSpacing.md },
  totalLabel: { color: designColours.text, fontSize: 17, fontWeight: '600' },
  totalPrice: { color: designColours.primary, fontSize: 24, fontWeight: '700' },
  primaryButton: { alignItems: 'center', backgroundColor: designColours.accent, borderRadius: designSpacing.sm, justifyContent: 'center', minHeight: touchTargets.minimumHeight, marginTop: designSpacing.md },
  primaryButtonText: { color: designColours.card, fontSize: 17, fontWeight: '700' },
});
