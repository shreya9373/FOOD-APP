import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Animated } from 'react-native';
import { Text, Button, Card, ActivityIndicator, Appbar, IconButton } from 'react-native-paper';
import client from '../api/contentfulClient';
import { useNavigation } from '@react-navigation/native';

const MealDetailScreen = ({ route }) => {
  const { mealType } = route.params; // breakfast, lunch, dinner
  const [allEntries, setAllEntries] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fetchMealData = async () => {
    try {
      console.log('Fetching data for mealType:', mealType);
      
      const response = await client.getEntries({
        content_type: 'foodappApi',
        'fields.title': mealType,
      });

      console.log('Raw response:', JSON.stringify(response, null, 2));
      console.log('Response items:', response.items);

      const allItems = response.items || [];
      console.log('Processed items:', allItems);
      
      // For testing purposes, we'll use the most recent date from the data
      const todayEntries = allItems.sort((a, b) => {
        const dateA = new Date(a.fields.timings);
        const dateB = new Date(b.fields.timings);
        return dateB - dateA;
      }).slice(0, 2); // Get the two most recent entries

      console.log('Today entries:', JSON.stringify(todayEntries, null, 2));
      setAllEntries(todayEntries);

      // Get full menu for today
      const fullMenu = todayEntries.flatMap(entry => {
        if (!entry.fields || !entry.fields.menu) return [];
        console.log('Entry details:', {
          foodtype: entry.fields.foodtype,
          menu: entry.fields.menu,
          timings: entry.fields.timings
        });
        return entry.fields.menu;
      });
      console.log('Full menu:', fullMenu);
      setFilteredMenu(fullMenu);
    } catch (error) {
      console.error('Detailed error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    fetchMealData();
  }, [mealType]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'foodappApi',
          limit: 1
        });
        console.log('Test connection response:', response);
      } catch (error) {
        console.error('Connection test error:', error);
      }
    };
    
    testConnection();
  }, []);

  const handleFilter = (type) => {
    if (!allEntries || allEntries.length === 0) return;
  
    setSelectedType(type);
  
    const filteredEntries = allEntries.filter(entry => {
      const foodType = entry.fields?.foodtype;
      console.log('Filtering entry:', {
        foodtype: foodType,
        menu: entry.fields?.menu,
        type: type
      });
      
      // If foodType is undefined, skip this entry
      if (foodType === undefined) return false;
      
      // Check if the foodtype matches the selected type
      if (type === 'veg') return foodType === 'veg' || foodType === false;
      if (type === 'nonveg') return foodType === 'nonveg' || foodType === true;
      return true;
    });
  
    console.log('Filtered entries:', filteredEntries);
    const filteredMenus = filteredEntries.flatMap(entry => entry.fields?.menu || []);
    console.log('Filtered menus:', filteredMenus);
    setFilteredMenu(filteredMenus);
  };
  

  const handleReset = () => {
    setSelectedType(null);
    const fullMenu = allEntries.flatMap(entry => entry.fields?.menu || []);
    console.log('Reset menu:', fullMenu);
    setFilteredMenu(fullMenu);
  };
  

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content
          title={`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Menu`}
          titleStyle={styles.appBarTitle}
          subtitle="Today's Specials ✨"
          subtitleStyle={styles.appBarSubtitle}
        />
        <IconButton
          icon="refresh"
          iconColor="white"
          size={24}
          onPress={() => {
            setLoading(true);
            fetchMealData();
          }}
        />
      </Appbar.Header>

      {/* Filter Buttons */}
      <View style={styles.buttonRow}>
        <Button
          mode={selectedType === 'veg' ? 'contained' : 'outlined'}
          textColor="green"
          style={[styles.filterButton, { 
            borderColor: 'green',
            backgroundColor: selectedType === 'veg' ? '#e8f5e9' : 'transparent',
          }]}
          labelStyle={styles.buttonLabel}
          onPress={() => handleFilter('veg')}
        >
          Veg 🌱
        </Button>
        <Button
          mode={selectedType === 'nonveg' ? 'contained' : 'outlined'}
          textColor="red"
          style={[styles.filterButton, { 
            borderColor: 'red',
            backgroundColor: selectedType === 'nonveg' ? '#ffebee' : 'transparent',
          }]}
          labelStyle={styles.buttonLabel}
          onPress={() => handleFilter('nonveg')}
        >
          Non-Veg 🍗
        </Button>
      </View>

      {/* Menu List */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator animating size="large" color="#2e7d32" />
          <Text style={styles.loadingText}>Loading menu items...</Text>
        </View>
      ) : filteredMenu.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noItemsText}>No items found for selected type.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMenu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.itemText}>{item}</Text>
                </Card.Content>
              </Card>
            </Animated.View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Reset Button (Sticky Footer) */}
      <View style={styles.resetButtonWrapper}>
        <Button
          mode="contained-tonal"
          style={styles.resetButton}
          labelStyle={styles.resetButtonLabel}
          onPress={handleReset}
          icon="refresh"
        >
          Reset Filter
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fef4',
  },
  appBar: {
    backgroundColor: '#2e7d32',
    elevation: 6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 100,
    justifyContent: 'center',
  },
  appBarTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  appBarSubtitle: {
    fontSize: 16,
    color: '#d0f0c0',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: -4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  filterButton: {
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    paddingVertical: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  resetButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  resetButton: {
    borderRadius: 30,
    paddingVertical: 8,
    width: '60%',
    backgroundColor: '#2e7d32',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  resetButtonLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default MealDetailScreen;
