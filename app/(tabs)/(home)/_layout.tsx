import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e', // Vibrant orange color for the header
          elevation: 4, // Adds shadow on Android
          shadowOpacity: 0.3, // Adds shadow on iOS
        },
        headerTintColor: '#fff', // White color for back button and title text
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#fff', // Ensures the title text is clearly visible
        },
        headerBackTitleVisible: false, // Hides the "Back" text on iOS
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  );
}
