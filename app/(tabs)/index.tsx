import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import ZoomButton from '@/components/ZoomButton'; 
import * as Location from 'expo-location';
import { useLocationTracking } from '@/hooks/useLocationTracking';
import { useRouter } from 'expo-router';
import { SearchBar } from '@rneui/base';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const defaultRegion = {
    latitude: 55.86315746324295,
    longitude: 9.873457239221938,
    latitudeDelta: 0.005,
    longitudeDelta: 0.007,
  };
  const [region, setRegion] = useState(defaultRegion);
  const [isCenterOnUser, setIsCenterOnUser] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const router = useRouter();

  useLocationTracking(setLocation, isCenterOnUser);

  const zoomToDefault = () => {
    setRegion(defaultRegion);
    setIsCenterOnUser(false);
  };

  const handleMarkerPress = (markerId: string) => {
    router.push({
      pathname: '/details',
      params: { id: markerId }, // Pass markerId or other relevant data
    });
  };

  const allSuggestions = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];

  const updateSearch = (query: string) => {
    setSearch(query);
    const filteredSuggestions = allSuggestions.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionPress = (item: string) => {
    setSearch(item); // Set the search input to the selected item
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        onClear={() => setSuggestions([])}
        onFocus={() => setKeyboardVisible(true)} // Ensure suggestions show when focused
      />

      {/* Render suggestions only if the keyboard is visible and there are suggestions */}
      {keyboardVisible && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Du er her!"
          />
        )}

        <Polygon
          coordinates={[
            { latitude: 55.86125746324295, longitude: 9.876357239221938 },
            { latitude: 55.86505746324295, longitude: 9.876357239221938 },
            { latitude: 55.86505746324295, longitude: 9.870457239221938 },
            { latitude: 55.86125746324295, longitude: 9.870457239221938 },
          ]}
          strokeColor="rgba(0,0,0,0.6)"
          fillColor="rgba(255,255,255,0.2)" 
          strokeWidth={5}
        />

        <Marker
          coordinate={{ latitude: 55.86334846324295, longitude: 9.872087239221938 }}
          onPress={() => handleMarkerPress('food')}
        >
          <Ionicons name="fast-food-outline" size={35} color="black" />
        </Marker>

        <Marker
          coordinate={{ latitude: 55.863788, longitude: 9.872603 }}
          onPress={() => handleMarkerPress('entrance')}
        >
          <Ionicons name="enter-outline" size={35} color="black" />
        </Marker>

        <Marker
          coordinate={{ latitude: 55.86399301386834, longitude: 9.871609634919366 }}
          onPress={() => handleMarkerPress('intensive')}
        >
          <Ionicons name="alert-outline" size={35} color="black" />
        </Marker>

      </MapView>

      <ZoomButton onPress={zoomToDefault} />
    </View>
  );
}

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
    top: 130, // Adjust this value based on the SearchBar's position
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5, // Optional: Adds shadow effect on Android
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
