import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavigationBar } from '@/app/_layout';
import { designColours, designSpacing } from '@/constants/theme';
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
});
