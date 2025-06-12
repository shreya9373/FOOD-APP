import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Appbar, Snackbar } from 'react-native-paper';

const FeedbackFormScreen = ({ onClose }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSubmitFeedback = () => {
    if (feedbackText.trim() === '') {
      setSnackbarVisible(true); 
      return;
    }
    
    console.log('Feedback submitted:', feedbackText);
    alert('Thank you for your feedback!'); 
    setFeedbackText(''); 
    onClose(); 
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon="close" onPress={onClose} />
        <Appbar.Content title="Give Your Feedback" titleStyle={styles.appBarTitle} />
      </Appbar.Header>

      <View style={styles.formContent}>
        <Text style={styles.promptText}>
          We'd love to hear your thoughts on today's meals!
        </Text>
        <TextInput
          label="Your Feedback"
          value={feedbackText}
          onChangeText={setFeedbackText}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={styles.textInput}
          placeholder="e.g., 'The lunch biryani was excellent today!'"
        />

        <Button
          mode="contained"
          onPress={handleSubmitFeedback}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
        >
          Submit Feedback
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        Please enter your feedback before submitting.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdf8', 
  },
  appBar: {
    backgroundColor: '#2e7d32',
    elevation: 4,
  },
  appBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContent: {
    padding: 20,
    flex: 1,
  },
  promptText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: 'white', 
  },
  submitButton: {
    backgroundColor: '#4caf50', 
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 20,
    elevation: 3,
  },
  submitButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FeedbackFormScreen;