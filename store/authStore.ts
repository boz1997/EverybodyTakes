import { create } from 'zustand';
import { User } from 'firebase/auth';

type UserRole = 'host' | 'guest' | null;

interface AuthState {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: false,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  reset: () => set({ user: null, role: null, isLoading: false }),
}));
