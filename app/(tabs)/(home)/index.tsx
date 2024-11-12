import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      
      <TouchableOpacity style={styles.button}>
        <Link href="/details/1" style={styles.linkText}>View First User Details</Link>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Link href="/details/2" style={styles.linkText}>View Second User Details</Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light grey background
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Dark grey for text
    marginBottom: 32, // Spacing for the heading
  },
  button: {
    backgroundColor: '#007BFF', // Blue background for buttons
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  linkText: {
    color: '#ffffff', // White text color
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
