import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';

import { designColours, designSpacing, touchTargets } from '@/constants/theme';
import { dummyBookings } from '@/data/dummyBookings';
import { dummyCars } from '@/data/dummyCars';

export default function BookingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Bookings</Text>
        {dummyBookings.map((booking) => {
          const car = dummyCars.find((candidate) => candidate.carId === booking.carId);
          return (
            <View key={booking.bookingId} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.reference}>{booking.bookingId}</Text>
                  <Text style={styles.carName}>{car ? `${car.brand} ${car.model}` : 'Vehicle unavailable'}</Text>
                </View>
                <Text style={styles.status}>CONFIRMED</Text>
              </View>
              <Text style={styles.dates}>{booking.startDate} to {booking.endDate}</Text>
              <Text style={styles.total}>£{booking.totalPrice}</Text>
            </View>
          );
        })}
      </ScrollView>
      <NavigationBar />
    </SafeAreaView>
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
        onPress={() => router.replace('/bookings' as Parameters<typeof router.replace>[0])}
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
  content: { padding: designSpacing.md },
  title: { color: designColours.primary, fontSize: 30, fontWeight: '700', marginBottom: designSpacing.md },
  card: { backgroundColor: designColours.card, borderRadius: designSpacing.md, marginBottom: designSpacing.md, padding: designSpacing.md },
  cardHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  reference: { color: designColours.textMuted, fontSize: 14, fontWeight: '600' },
  carName: { color: designColours.text, fontSize: 20, fontWeight: '700', marginTop: designSpacing.xs },
  status: { backgroundColor: '#D8F3E5', borderRadius: designSpacing.xs, color: '#177245', fontSize: 12, fontWeight: '700', paddingHorizontal: designSpacing.sm, paddingVertical: designSpacing.xs },
  dates: { color: designColours.textMuted, fontSize: 15, marginTop: designSpacing.md },
  total: { color: designColours.primary, fontSize: 20, fontWeight: '700', marginTop: designSpacing.sm },
  navigation: { alignItems: 'center', backgroundColor: designColours.card, borderTopColor: designColours.secondary, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: designSpacing.xs, paddingTop: designSpacing.xs },
  navigationItem: { alignItems: 'center', justifyContent: 'center', minHeight: touchTargets.minimumHeight, minWidth: touchTargets.minimumWidth },
  navigationIcon: { color: designColours.primary, fontSize: 22, lineHeight: 24 },
  navigationLabel: { color: designColours.text, fontSize: 12, fontWeight: '600' },
});
