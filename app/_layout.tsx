import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react'; // Added useEffect
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { initDatabase } from '../lib/database'; // Import your DB init

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // IMPORTANT: Initialize the database when the app first loads
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      console.error("Database failed to initialize:", error);
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // Minimalist Black & White Header Style
          headerStyle: { backgroundColor: '#FFF' },
          headerTintColor: '#1C1C1E',
          headerTitleStyle: { fontWeight: '800' },
          headerShadowVisible: false, // Cleaner look
        }}
      >
        {/* Main Tab System */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Modals and Details */}
        <Stack.Screen 
          name="add-task" 
          options={{ 
            presentation: 'modal', 
            title: 'New Task' 
          }} 
        />
        
        <Stack.Screen 
          name="edit-task" 
          options={{ 
            title: 'Update Task',
            headerBackTitle: 'Back' 
          }} 
        />
        
        <Stack.Screen 
          name="task-detail" 
          options={{ 
            title: 'Task Details',
            headerBackTitle: 'Back' 
          }} 
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}