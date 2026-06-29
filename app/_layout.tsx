import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import * as Linking from 'expo-linking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { initI18n } from '@translations/index';
import { AuthService } from '@features/auth/services/authService';
import { configurePurchases } from '@features/purchases/purchaseService';
import { useAuthStore } from '@store/authStore';
import * as Sentry from '@sentry/react-native';
import { colors } from '@constants/theme';
import '../global.css';

// Crash + error reporting. Enabled in release builds only so local dev noise
// doesn't fill the dashboard. The DSN is a public client key (safe to ship).
// Source maps upload via the @sentry/react-native Expo plugin (app.json) during
// EAS builds, so release stack traces are symbolicated.
Sentry.init({
  dsn: 'https://fcfb4224cdbb1fe7052aa9bf4c3ead1a@o4511583063703552.ingest.de.sentry.io/4511583068749904',
  enabled: !__DEV__,
  environment: 'production',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 1000 * 60 * 5 },
  },
});

function RootLayout() {
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
      if (user) configurePurchases(user.uid);
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

  // Universal Links: guestcam.store/e.html?code=XXX opens the app directly (see
  // app.json associatedDomains + the AASA file). That path isn't an app route, so
  // we read the code and jump to the join screen. The custom guestcam:// scheme is
  // already handled by expo-router, so we only act on the e.html bridge link.
  useEffect(() => {
    const handle = (url: string | null) => {
      if (!url) return;
      try {
        const { path, queryParams } = Linking.parse(url);
        const code = typeof queryParams?.code === 'string' ? queryParams.code : null;
        if (code && path && path.includes('e.html')) {
          router.push({ pathname: '/guest/join', params: { code } });
        }
      } catch { /* ignore malformed links */ }
    };
    Linking.getInitialURL().then(handle);
    const sub = Linking.addEventListener('url', ({ url }) => handle(url));
    return () => sub.remove();
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

export default Sentry.wrap(RootLayout);
