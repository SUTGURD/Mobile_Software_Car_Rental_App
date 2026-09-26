import { hashPassword } from '@/utils/password';
import type { User } from '@/types/models';

type DummyUserProfile = Omit<User, 'passwordHash' | 'createAccount'>;

const userProfiles: DummyUserProfile[] = [
  {
    userId: 'user-001',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    licenceNumber: 'MORGA123456AM9IJ',
    crossBorderPermit: true,
  },
  {
    userId: 'user-002',
    name: 'Jamie Patel',
    email: 'jamie.patel@example.com',
    licenceNumber: 'PATEL234567JP8KL',
    crossBorderPermit: false,
  },
  {
    userId: 'user-003',
    name: 'Taylor Reed',
    email: 'taylor.reed@example.com',
    licenceNumber: 'REED345678TR7MN',
    crossBorderPermit: true,
  },
  {
    userId: 'user-004',
    name: 'Riley Chen',
    email: 'riley.chen@example.com',
    licenceNumber: 'CHEN456789RC6PQ',
    crossBorderPermit: false,
  },
];

export const dummyUsers: Promise<User[]> = Promise.all(
  userProfiles.map(async (profile, index) => ({
    ...profile,
    passwordHash: await hashPassword(`1234${index + 1}`),
    createAccount() {},
  })),
);
