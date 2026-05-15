import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Tells the app to load the tab system as the main screen */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Your original modal and detail screens */}
        <Stack.Screen name="add-task" options={{ presentation: 'modal', title: 'New Task' }} />
        <Stack.Screen name="edit-task" options={{ title: 'Update Task' }} />
        <Stack.Screen name="task-detail" options={{ title: 'Task Details' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}