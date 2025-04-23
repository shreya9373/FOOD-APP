// screens/FeedbackFormScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function FeedbackFormScreen() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!name || !feedback) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    Alert.alert("Thank you for your feedback!", `From: ${name}`);
    setName("");
    setFeedback("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>

      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Your Feedback"
        value={feedback}
        onChangeText={setFeedback}
        style={[styles.input, styles.feedbackInput]}
        multiline
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  feedbackInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
  },
});
