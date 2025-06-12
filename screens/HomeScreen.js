import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Text, Card, Appbar, Button } from 'react-native-paper';
import FeedbackFormScreen from './FeedbackFormScreen';
const meals = [
  { type: 'Breakfast', time: '☀️ 8:30 AM - 10:00 AM' },
  { type: 'Lunch', time: '🍛 12:30 PM - 2:00 PM' },
  { type: 'Snacks', time: '🌙 4:30 PM - 6:00 PM' },
];

const HomeScreen = ({ navigation }) => {
  const handleMealSelect = (mealType) => {
    navigation.navigate('MealDetailScreen', { mealType });
  };
  const handleFeedbackPress = () => {
    navigation.navigate('FeedbackForm');
  };
  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={styles.appBar}>
      <Appbar.Content
        title="🍽️ Netradyne Cafeteria"
        titleStyle={styles.appBarTitle}
        subtitle="Today's Delight ✨"
        subtitleStyle={styles.appBarSubtitle}
      />
    </Appbar.Header>



      <FlatList
        data={meals}
        keyExtractor={(item) => item.type}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMealSelect(item.type)}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.mealType}>{item.type}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
      {/* Feedback Button - WITHOUT ICON */}
      <Button 
        mode="contained" // Makes the button have a filled background
        onPress={handleFeedbackPress}
        style={styles.feedbackButton}
        labelStyle={styles.feedbackButtonLabel}
      >
        Give Feedback
      </Button>
    </View>
  );
};

export default HomeScreen;

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
  
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#e1f8e7',
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  mealType: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1b5e20',
    fontFamily: 'sans-serif-condensed',
  },
  timeText: {
    fontSize: 16,
    color: '#4d4d4d',
    marginTop: 6,
    fontStyle: 'italic',
  },
  feedbackButton: {
    position: 'absolute', 
    bottom: 20,            
    left: 20,             
    right: 20,             
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    paddingVertical: 5,    
    elevation: 6,          
    shadowColor: '#000',   
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  feedbackButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkgreen',       
    textAlign: 'center',   
  },
});
