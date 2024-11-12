import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.detailsText}>Details of User <Text style={styles.userId}>{id}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  detailsText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  userId: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#f4511e',
  },
});
