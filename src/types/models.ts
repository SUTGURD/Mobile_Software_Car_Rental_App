export enum CarSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  PREMIUM = 'PREMIUM',
}

export enum GearType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  HYBRID = 'HYBRID',
  ELECTRIC = 'ELECTRIC',
}

export enum BookingStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum SyncStatus {
  PENDING = 'pending',
  SYNCED = 'synced',
  FAILED = 'failed',
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  passwordHash: string;
  licenceNumber: string;
  crossBorderPermit: boolean;
  createAccount(): void;
}

export interface Feature {
  featureId: string;
  name: string;
}

export interface Car {
  carId: string;
  brand: string;
  model: string;
  size: CarSize;
  gearType: GearType;
  fuelType: FuelType;
  seats: number;
  luggageSpace: number;
  fuelEfficiency: number;
  crossBorderOk: boolean;
  environmentZoneCompliant: boolean;
  pricePerDay: number;
  available: boolean;
  features: Feature[];
  checkAvailability(dateRange: DateRange): boolean;
}

export interface AddOn {
  addOnId: string;
  name: string;
  price: number;
}

export interface Booking {
  bookingId: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  syncStatus: SyncStatus;
  cancelBooking(): void;
  calculateTotalPrice(): number;
}

export interface BookingAddOn {
  bookingAddOnId: string;
  bookingId: string;
  addOnId: string;
  quantity: number;
  syncStatus: SyncStatus;
}
