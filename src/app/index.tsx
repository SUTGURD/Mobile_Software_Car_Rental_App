import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { NavigationBar } from '@/app/_layout';
import {
  designColours,
  designSpacing,
  touchTargets,
} from '@/constants/theme';
import { dummyCars } from '@/data/dummyCars';
import type { Car } from '@/types/models';

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function CarCard({ car }: { car: Car }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Text style={styles.brand}>{car.brand}</Text>
          <Text style={styles.model}>{car.model}</Text>
        </View>
        <Text style={styles.price}>£{car.pricePerDay}/day</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detail}>{formatLabel(car.size)}</Text>
        <Text style={styles.detail}>{formatLabel(car.fuelType)}</Text>
        <Text style={styles.detail}>{formatLabel(car.gearType)}</Text>
        <Text style={styles.detail}>{formatLabel(car.seats.toString() + ' seats')}</Text>
      </View>

      <Pressable
        accessibilityLabel={`View ${car.brand} ${car.model}`}
        accessibilityRole="button"
        onPress={() =>
          router.push({
            pathname: '/car/[id]',
            params: { id: car.carId },
          } as Parameters<typeof router.push>[0])
        }
        style={({ pressed }) => [styles.viewButton, pressed && styles.pressed]}>
        <Text style={styles.viewButtonText}>View Car</Text>
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCars = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return dummyCars;
    }

    return dummyCars.filter((car) =>
      `${car.brand} ${car.model}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.heading}>Browse Cars</Text>
        <TextInput
          accessibilityLabel="Search cars by brand or model"
          accessibilityRole="search"
          autoCapitalize="none"
          onChangeText={setSearchQuery}
          placeholder="Search by brand or model"
          placeholderTextColor={designColours.textMuted}
          style={styles.searchInput}
          value={searchQuery}
        />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={filteredCars}
          keyExtractor={(car) => car.carId}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No cars match your search.</Text>
          }
          renderItem={({ item }) => <CarCard car={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: designColours.background,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: designSpacing.md,
  },
  heading: {
    color: designColours.primary,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: designSpacing.md,
    marginTop: designSpacing.sm,
  },
  searchInput: {
    backgroundColor: designColours.card,
    borderColor: designColours.secondary,
    borderRadius: designSpacing.sm,
    borderWidth: 1,
    color: designColours.text,
    fontSize: 16,
    height: touchTargets.minimumHeight,
    paddingHorizontal: designSpacing.md,
  },
  listContent: {
    gap: designSpacing.md,
    paddingBottom: designSpacing.md,
    paddingTop: designSpacing.md,
  },
  card: {
    backgroundColor: designColours.card,
    borderRadius: designSpacing.md,
    padding: designSpacing.md,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    flex: 1,
  },
  brand: {
    color: designColours.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  model: {
    color: designColours.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: designSpacing.xs,
  },
  price: {
    color: designColours.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: designSpacing.sm,
    marginVertical: designSpacing.md,
  },
  detail: {
    backgroundColor: designColours.background,
    borderRadius: designSpacing.xs,
    color: designColours.text,
    fontSize: 13,
    paddingHorizontal: designSpacing.sm,
    paddingVertical: designSpacing.xs,
  },
  viewButton: {
    alignItems: 'center',
    backgroundColor: designColours.primary,
    borderRadius: designSpacing.sm,
    justifyContent: 'center',
    minHeight: touchTargets.minimumHeight,
    paddingHorizontal: designSpacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  viewButtonText: {
    color: designColours.card,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: designColours.textMuted,
    fontSize: 16,
    paddingVertical: designSpacing.lg,
    textAlign: 'center',
  },
});
