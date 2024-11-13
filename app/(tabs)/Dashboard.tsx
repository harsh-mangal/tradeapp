import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventSource from 'react-native-event-source';

const Dashboard = () => {
  const [ltpData, setLtpData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4000/fetchIndexesLTP');

    eventSource.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      setLtpData((prevData) => ({
        ...prevData,
        ...data,
      }));
    };

    eventSource.onerror = (error) => {
      console.error("Error in SSE connection:", error);
      setError("Failed to fetch real-time data");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(ltpData).length > 0 ? (
        <View style={styles.grid}>
          {Object.entries(ltpData).map(([name, { last_price, change }], index) => (
            <View
              key={index}
              style={[
                styles.card,
                change > 0 ? styles.cardPositive : styles.cardNegative
              ]}
            >
              <Text style={styles.cardTitle}>{name}</Text>
              <Text style={styles.price}>₹{last_price.toFixed(2)}</Text>
              <Text style={[styles.change, change > 0 ? styles.changePositive : styles.changeNegative]}>
                <Icon name={change > 0 ? "arrow-up" : "arrow-down"} size={12} />
                {Math.abs(change).toFixed(2)}%
              </Text>
            </View>
          ))}
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ActivityIndicator size="large" color="#888" style={styles.loading} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: '45%',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardPositive: {
    borderColor: '#A5D6A7',
    backgroundColor: '#E8F5E9',
  },
  cardNegative: {
    borderColor: '#EF9A9A',
    backgroundColor: '#FFEBEE',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  changePositive: {
    color: '#4CAF50',
  },
  changeNegative: {
    color: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  loading: {
    marginVertical: 20,
  },
});

export default Dashboard;
