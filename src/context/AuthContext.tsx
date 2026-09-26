import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { dummyUsers } from '@/data/dummyUsers';
import type { User } from '@/types/models';
import { verifyPassword } from '@/utils/password';

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const users = await dummyUsers;
    const normalisedEmail = email.trim().toLowerCase();
    const user = users.find(
      (candidate) => candidate.email.toLowerCase() === normalisedEmail,
    );

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return false;
    }

    setCurrentUser(user);
    return true;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: currentUser !== null,
      login,
      logout,
    }),
    [currentUser, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
