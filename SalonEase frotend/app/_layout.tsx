import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="verify-phone" />
        <Stack.Screen name="otp-code" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="forgot-password-email" />
        <Stack.Screen name="reset-password" />
        <Stack.Screen name="password-success" />
        <Stack.Screen name="enable-location" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Appointment/[id]" />
        <Stack.Screen name="Appointment/select-service" />
        <Stack.Screen name="Appointment/checkout" />
        <Stack.Screen name="Appointment/success" />
        <Stack.Screen name="payment/add-card" options={{ presentation: 'modal' }} />
        <Stack.Screen name="saloon/detail" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
