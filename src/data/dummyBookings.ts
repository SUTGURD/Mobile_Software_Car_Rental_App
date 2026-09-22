import { Booking, BookingStatus, SyncStatus } from '@/types/models';

export const dummyBookings: Booking[] = [
  {
    bookingId: 'BK-AYGO-01',
    userId: 'user-demo',
    carId: 'car-aygo',
    startDate: '2026-10-04',
    endDate: '2026-10-07',
    totalPrice: 141,
    status: BookingStatus.ACTIVE,
    createdAt: '2026-09-22T10:00:00.000Z',
    syncStatus: SyncStatus.SYNCED,
    cancelBooking: () => undefined,
    calculateTotalPrice: () => 141,
  },
  {
    bookingId: 'BK-GOLF-02',
    userId: 'user-demo',
    carId: 'car-golf',
    startDate: '2026-11-12',
    endDate: '2026-11-15',
    totalPrice: 189,
    status: BookingStatus.COMPLETED,
    createdAt: '2026-08-15T10:00:00.000Z',
    syncStatus: SyncStatus.SYNCED,
    cancelBooking: () => undefined,
    calculateTotalPrice: () => 189,
  },
];
