import { useLocalSearchParams } from 'expo-router'; // Import useSearchParams
import { View, Text, StyleSheet } from 'react-native';
import FoodDisplay from '@/components/Food'; 
import IntensiveDisplay from '@/components/Intensive';
import EntranceDisplay from '@/components/Entrance';

const DefaultDetails = () => (
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsText}>No details available!</Text>
    {/* Add more UI elements for default case */}
  </View>
);

export default function DetailsScreen() {
  const { id } = useLocalSearchParams(); // Retrieve parameters

  let DetailsComponent;
  switch (id) {
    case 'food':
      DetailsComponent = FoodDisplay;
      break;
    case 'entrance':
      DetailsComponent = EntranceDisplay;
      break;
    case 'intensive':
      DetailsComponent = IntensiveDisplay;
      break;
    default:
      DetailsComponent = DefaultDetails;
      break;
  }

  return (
    <View style={styles.container}>
      <DetailsComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  detailsText: {
    fontSize: 18,
  },
});
