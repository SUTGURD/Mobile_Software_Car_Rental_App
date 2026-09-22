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

import { dummyCars } from '@/data/dummyCars';
import {
  designColours,
  designSpacing,
  touchTargets,
} from '@/constants/theme';
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

      <View style={styles.navigation}>
        <Pressable
          accessibilityLabel="Home"
          accessibilityRole="button"
          onPress={() => router.replace('/')}
          style={styles.navigationItem}>
          <Text style={styles.navigationIcon}>⌂</Text>
          <Text style={styles.navigationLabel}>Home</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Search"
          accessibilityRole="button"
          onPress={() => setSearchQuery('')}
          style={styles.navigationItem}>
          <Text style={styles.navigationIcon}>⌕</Text>
          <Text style={styles.navigationLabel}>Search</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Calendar"
          accessibilityRole="button"
          onPress={() => router.push('/explore')}
          style={styles.navigationItem}>
          <Text style={styles.navigationIcon}>□</Text>
          <Text style={styles.navigationLabel}>Calendar</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Back"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.navigationItem}>
          <Text style={styles.navigationIcon}>‹</Text>
          <Text style={styles.navigationLabel}>Back</Text>
        </Pressable>
      </View>
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
