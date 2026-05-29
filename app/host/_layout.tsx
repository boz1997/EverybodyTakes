import { Stack } from 'expo-router';

export default function HostLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="create" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      <Stack.Screen name="paywall" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      <Stack.Screen name="qr" />
      <Stack.Screen name="event" />
    </Stack>
  );
}
