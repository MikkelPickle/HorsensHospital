// ZoomButton.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Get screen width
const { width: screenWidth } = Dimensions.get('window');

type Props = {
  onPress: () => void;
};

const ZoomButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="locate-sharp" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF', // Blue color for the button
    padding: 13,
    borderRadius: 30,
    marginLeft: screenWidth * 0.33, // Adjust based on button width
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow blur radius for iOS
  },
  buttonText: {
    color: 'white',
    marginLeft: 10, // Space between icon and text
    fontSize: 16,
  },
});

export default ZoomButton;
