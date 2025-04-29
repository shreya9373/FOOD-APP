import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Menu</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.breakfast]}
          onPress={() => navigation.navigate('MealDetailScreen', { mealType: 'Breakfast' })}
        >
          <Text style={styles.buttonText}>Breakfast</Text>
          <Text style={styles.buttonTime}>7:00 AM - 10:00 AM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.lunch]}
          onPress={() => navigation.navigate('MealDetailScreen', { mealType: 'Lunch' })}
        >
          <Text style={styles.buttonText}>Lunch</Text>
          <Text style={styles.buttonTime}>12:00 PM - 2:00 PM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.snacks]}
          onPress={() => navigation.navigate('MealDetailScreen', { mealType: 'Snacks' })}
        >
          <Text style={styles.buttonText}>Snacks</Text>
          <Text style={styles.buttonTime}>4:00 PM - 6:00 PM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonTime: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  breakfast: {
    backgroundColor: 'lightgreen',
  },
  lunch: {
    backgroundColor: 'lightgreen',
  },
  snacks: {
    backgroundColor: 'lightgreen',
  },
});

export default HomeScreen;
