import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { initI18n } from '@translations/index';
import { AuthService } from '@features/auth/services/authService';
import { useAuthStore } from '@store/authStore';
import { colors } from '@constants/theme';
import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 1000 * 60 * 5 },
  },
});

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(false);
  const { setUser, setInitialized } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    initI18n().then(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      setUser(user);
      setInitialized(true);
    });
    return unsubscribe;
  }, []);

  // Tapping an "upgrade" push opens the paywall for that event.
  useEffect(() => {
    let sub: { remove: () => void } | undefined;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Notifications = require('expo-notifications');
      sub = Notifications.addNotificationResponseReceivedListener((resp: { notification?: { request?: { content?: { data?: Record<string, string> } } } }) => {
        const data = resp?.notification?.request?.content?.data;
        if (!data?.eventId) return;
        if (data.type === 'upgrade') {
          router.push({ pathname: '/host/paywall', params: { upgradeId: data.eventId, current: data.current ?? 'free' } });
        } else {
          router.push({ pathname: '/host/event', params: { id: data.eventId } });
        }
      });
    } catch { /* native module missing */ }
    return () => { try { sub?.remove(); } catch { /* ignore */ } };
  }, []);

  if (!i18nReady || !fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brand.DEFAULT} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="host" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="guest" options={{ animation: 'slide_from_right' }} />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
