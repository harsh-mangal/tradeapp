import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image, Share } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

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
    WebBrowser.openBrowserAsync(url);
  };

  const shareArticle = async (url) => {
    try {
      await Share.share({
        message: `Check out this article: ${url}\n\nStay informed with our news app! Download it here: https://github.com`,
      });
    } catch (error) {
      console.error('Error sharing the article:', error);
    }
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
        renderItem={({ item }) => {
          const timeAgo = moment(item.publishedAt).fromNow();
          
          return (
            <View style={styles.newsItem}>
              <TouchableOpacity onPress={() => openLinkInBrowser(item.url)}>
                {item.urlToImage && (
                  <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
                )}
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.hr} />
                <Text style={styles.timeAgo}>{timeAgo}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </TouchableOpacity>

              {/* Share Button at the bottom */}
              <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.shareButton} onPress={() => shareArticle(item.url)}>
                  <Ionicons name="share-social-outline" size={20} color="#fff" />
                  <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f4f8',  // Very light blue-gray background
  },
  filtersContainer: {
    marginBottom: 16,
    rowGap: 8,
  },
  button: {
    marginRight: 10,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#82caff',  // Light, cool cyan color for buttons
  },
  selectedButton: {
    backgroundColor: '#6dd3c4',  // Soft mint green for selected button
  },
  buttonText: {
    color: '#333',  // Darker text for better readability
    fontSize: 14,
  },
  newsItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',  // Light background for news item
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
    color: '#333',  // Darker text for contrast
  },
  hr: {
    height: 1,
    backgroundColor: '#ddd',  // Light gray separator line
    marginVertical: 8,
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',  // Softer gray for less prominent info
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: '#555',  // Slightly darker text for readability
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#82caff',  // Same light cyan color as main button
    borderRadius: 5,
  },
  shareText: {
    color: '#333',  // Darker text color for readability on lighter button
    marginLeft: 6,
    fontSize: 14,
  },
});

