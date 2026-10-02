import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavigationBar } from '@/app/_layout';
import { designColours, designSizing } from '@/constants/theme';
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
  content: { padding: designSizing.md },
  title: { color: designColours.primary, fontSize: 30, fontWeight: '700', marginBottom: designSizing.md },
  card: { backgroundColor: designColours.card, borderRadius: designSizing.md, marginBottom: designSizing.md, padding: designSizing.md },
  cardHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  reference: { color: designColours.textMuted, fontSize: 14, fontWeight: '600' },
  carName: { color: designColours.text, fontSize: 20, fontWeight: '700', marginTop: designSizing.xs },
  status: { backgroundColor: '#D8F3E5', borderRadius: designSizing.xs, color: '#177245', fontSize: 12, fontWeight: '700', paddingHorizontal: designSizing.sm, paddingVertical: designSizing.xs },
  dates: { color: designColours.textMuted, fontSize: 15, marginTop: designSizing.md },
  total: { color: designColours.primary, fontSize: 20, fontWeight: '700', marginTop: designSizing.sm },
});
