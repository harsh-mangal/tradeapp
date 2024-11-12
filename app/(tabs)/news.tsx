import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser'; // Import Expo's WebBrowser

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'au', name: 'Australia' },
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${countries[selectedCountry].code}&category=${categories[selectedCategory]}&apiKey=807e28c51c2441f3809e3f1e084e7346`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCountry, selectedCategory]);

  const openLinkInBrowser = (url) => {
    WebBrowser.openBrowserAsync(url); // Use Expo WebBrowser to open URL
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        {/* Country Buttons */}
        <FlatList
          horizontal
          data={countries}
          keyExtractor={(item) => item.code}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.button, selectedCountry === index && styles.selectedButton]}
              onPress={() => setSelectedCountry(index)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Category Buttons */}
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.button, selectedCategory === index && styles.selectedButton]}
              onPress={() => setSelectedCategory(index)}
            >
              <Text style={styles.buttonText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openLinkInBrowser(item.url)}>
            <View style={styles.newsItem}>
              {item.urlToImage && (
                <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#111114',
  },
  filtersContainer: {
    marginBottom: 16,
    rowGap: 12,
  },
  button: {
    marginRight: 10,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#1e90ff',
  },
  selectedButton: {
    backgroundColor: '#ff6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  newsItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: '#ccc',
  },
});
