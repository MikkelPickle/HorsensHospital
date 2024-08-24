import { Image, StyleSheet, Platform, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Circle, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import ZoomButton from '@/components/ZoomButton'; // Adjust the path as necessary
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocationTracking } from '@/hooks/useLocationTracking';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
  // Default region, this will be the center of the map initially
  const defaultRegion = {
    latitude: 55.86385746324295, // Default latitude 
    longitude: 9.873457239221938, // Default longitude
    latitudeDelta: 0.005,
    longitudeDelta: 0.007,
  };

  // Keep track of whether the map should be centered on the user location
  const [isCenterOnUser, setIsCenterOnUser] = useState(false);

  const [region, setRegion] = useState(defaultRegion);
  
  useLocationTracking(setLocation, isCenterOnUser); 

  const zoomToDefault = () => {
    setRegion(defaultRegion);
    setIsCenterOnUser(false); // Disable automatic centering
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // The map will center on this region
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
            { latitude: 55.86125746324295, longitude: 9.876357239221938 }, // top-left
            { latitude: 55.86505746324295, longitude: 9.876357239221938 }, // top-right
            { latitude: 55.86505746324295, longitude: 9.870457239221938 }, // bottom-right
            { latitude: 55.86125746324295, longitude: 9.870457239221938 }, // bottom-left
          ]}
          strokeColor="rgba(0,255,0,1)" // outline color
          fillColor="rgba(0,255,0,1)" // fill color (green with 50% opacity)
          strokeWidth={2}
        />

        {/* Marker with Ionicon */}
        <Marker coordinate={{ latitude: 55.86334846324295, longitude: 9.872087239221938 }}>
          <Ionicons name="fast-food-outline" size={30} color="black" />
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
});