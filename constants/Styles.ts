import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 70,
    left: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 20,
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
  },
  searchBarInput: {
    fontSize: 16,
    color: 'black',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 130,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5, // Adds shadow effect on Android
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default styles;
