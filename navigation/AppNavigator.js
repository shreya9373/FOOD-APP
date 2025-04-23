import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FeedbackFormScreen from '../screens/FeedbackFormScreen'; 

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      <Stack.Screen name="Feedback" component={FeedbackFormScreen} />
      {/* Add more screens here as needed */}
    </Stack.Navigator>
  );
}
