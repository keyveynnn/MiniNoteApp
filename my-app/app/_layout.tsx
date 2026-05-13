import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  // Ensure that reloading on a nested route keeps the back button working
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            // Optional: Customize your header appearance here
            backgroundColor: colorScheme === 'dark' ? '#111' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* The Landing/Home Screen */}
        <Stack.Screen 
          name="index" 
          options={{ title: 'Home' }} 
        />

        {/* The Main Task List */}
        <Stack.Screen 
          name="tasks" 
          options={{ title: 'My Tasks' }} 
        />

        {/* Create Task - Configured as a Modal for better UX */}
        <Stack.Screen 
          name="add-task" 
          options={{ 
            presentation: 'modal', 
            title: 'New Task' 
          }} 
        />

        {/* Edit Task Screen */}
        <Stack.Screen 
          name="edit-task" 
          options={{ title: 'Edit Task' }} 
        />

        {/* Individual Task Details */}
        <Stack.Screen 
          name="task-detail" 
          options={{ title: 'Details' }} 
        />

        {/* Keep this if you plan to use the generated Tab bar later */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}