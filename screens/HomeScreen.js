import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { getMeals } from '../api/getMeals'; // Import the function to fetch meals from Contentful

export default function HomeScreen({ navigation }) {
  const [meals, setMeals] = useState([]);

  // Fetch the meals from Contentful when the component is mounted
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const fetchedMeals = await getMeals(); // Assuming getMeals fetches data from Contentful
        setMeals(fetchedMeals);
      } catch (error) {
        console.error("Error fetching meals from Contentful:", error);
      }
    };

    fetchMeals();
  }, []);

  // Render each meal as a button
  const renderMealButton = ({ item }) => (
    <TouchableOpacity
      style={styles.mealButton}
      onPress={() => handleMealPress(item.name)} // On press, navigate to MealDetail screen
    >
      <Text style={styles.mealName}>{item.name}</Text>
      <Text style={styles.mealTime}>{item.timing}</Text> {/* Show the timing for the meal */}
    </TouchableOpacity>
  );

  const handleMealPress = (mealName) => {
    // Navigate to MealDetail and pass the mealName as a parameter
    navigation.navigate('MealDetail', { mealName }); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.menuText}>Welcome</Text>
      <FlatList
        data={meals} // Use the meals state array to render meals dynamically
        keyExtractor={(item) => item.sys.id} // Use the Contentful sys.id as the unique key
        renderItem={renderMealButton} // Render each meal as a button
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={[styles.mealButton, { backgroundColor: 'lightgreen' }]}
        onPress={() => navigation.navigate('Feedback')}
      >
        <Text style={[styles.mealName, { color: 'darkgreen' }]}>Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  mealButton: {
    backgroundColor: 'lightgreen',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
    textAlign: 'center',
  },
  mealTime: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  logo: {
    width: 150,
    height: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
