import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';  // path to your HomeScreen
import MealDetailScreen from '../screens/MealDetailScreen';  // path to your MealDetailScreen

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false, // This will hide the default header
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: 'Netradyne Cafeteria',
        }}
      />
      <Stack.Screen 
        name="MealDetailScreen" 
        component={MealDetailScreen}
        options={{
          title: 'Menu',
        }}
      />
    </Stack.Navigator>
  );
}
