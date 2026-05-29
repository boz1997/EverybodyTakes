// Redirect unauthenticated host attempts to auth screen
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@store/authStore';

export default function HostAuth() {
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      router.replace({ pathname: '/auth', params: { role: 'host' } });
    } else {
      router.replace('/host/dashboard');
    }
  }, [user, isInitialized]);

  return null;
}
