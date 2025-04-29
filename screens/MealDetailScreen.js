// src/screens/MealDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import client from '../api/contentfulClient';

const MealDetailScreen = ({ route }) => {
  const { mealType } = route.params; // e.g., 'Breakfast'
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'foodappApi',
          'fields.title': mealType,
        });

        const menu = response.items[0]?.fields?.menu || [];
        setMenuItems(menu);
      } catch (error) {
        console.error('Contentful fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [mealType]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{mealType} Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2e7d32',
    fontStyle: 'italic',
  },
  itemBox: {
    padding: 12,
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Arial',
    fontStyle: 'italic',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
