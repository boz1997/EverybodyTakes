import { Stack } from 'expo-router';

export default function GuestLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="scan" />
      <Stack.Screen name="joined" />
      <Stack.Screen name="join" />
      <Stack.Screen name="camera" />
    </Stack>
  );
}
