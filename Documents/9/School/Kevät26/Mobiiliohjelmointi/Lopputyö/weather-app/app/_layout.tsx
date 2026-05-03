import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';

import { DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { useFonts } from 'expo-font';



export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    DancingScript_700Bold,
  });

  return (
    <GestureHandlerRootView>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: "Back", headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="city" options={{ title: "Weather" }} />
      </Stack>
      <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
  );
}
