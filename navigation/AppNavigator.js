import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';  
import MealDetailScreen from '../screens/MealDetailScreen';  
import FeedbackFormScreen from '../screens/FeedbackFormScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false, 
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
      <Stack.Screen
        name="FeedbackForm"
        options={{ headerShown: false }}
      >
      {(props) => <FeedbackFormScreen {...props} onClose={() => props.navigation.goBack()} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
