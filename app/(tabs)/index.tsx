import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import ZoomButton from '@/components/ZoomButton'; 
import * as Location from 'expo-location';
import { useLocationTracking } from '@/hooks/useLocationTracking';
import { useRouter } from 'expo-router';
import { SearchBar } from '@rneui/base';
import markers from '@/constants/Markers';
import styles from '@/constants/Styles';  // Import the styles
type MarkerKey = 'food' | 'entrance' | 'intensive';

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
  const [displayedMarker, setDisplayedMarker] = useState<MarkerKey | null>(null);

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

  const allSuggestions = ['intensive', 'entrance', 'food'];

  const updateSearch = (query: string) => {
    setSearch(query);
  
    // Filter suggestions based on the search query
    const filteredSuggestions = allSuggestions.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionPress = (item: string) => {
    setSearch(item); // Set the search input to the selected item
    setSuggestions([]); // Clear suggestions after selection
  
    // Find the marker that matches the selected suggestion
    const matchedMarker = Object.keys(markers).find((key) =>
      key.toLowerCase() === item.toLowerCase()
    ) as MarkerKey | undefined;
  
    if (matchedMarker) {
      const marker = markers[matchedMarker];
      // Update the map region to focus on the selected marker
      setRegion(defaultRegion);
      setDisplayedMarker(matchedMarker); // Update to display the selected marker only
    } else {
      setDisplayedMarker(null); // Reset to display all markers
    }
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
        onClear={() => {
          setSearch('');        // Clear the search text
          setSuggestions([]);   // Clear the suggestions
          setDisplayedMarker(null); // Show all markers
        }}
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

      {(!displayedMarker || displayedMarker === 'food') && (
        <Marker
          coordinate={markers.food.coordinate}
          onPress={() => handleMarkerPress('food')}
        >
          <Ionicons name={markers.food.icon} size={35} color="black" />
        </Marker>
      )}

      {(!displayedMarker || displayedMarker === 'entrance') && (
        <Marker
          coordinate={markers.entrance.coordinate}
          onPress={() => handleMarkerPress('entrance')}
        >
          <Ionicons name={markers.entrance.icon} size={35} color="white" />
        </Marker>
      )}

      {(!displayedMarker || displayedMarker === 'intensive') && (
        <Marker
          coordinate={markers.intensive.coordinate}
          onPress={() => handleMarkerPress('intensive')}
        >
          <Ionicons name={markers.intensive.icon} size={35} color="red" />
        </Marker>
      )}

      </MapView>

      <ZoomButton onPress={zoomToDefault} />
    </View>
  );
}


