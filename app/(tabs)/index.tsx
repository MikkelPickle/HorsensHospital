import { Image, StyleSheet, Platform, View, Alert } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import ZoomButton from '@/components/ZoomButton'; 
import * as Location from 'expo-location';
import { useLocationTracking } from '@/hooks/useLocationTracking';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  useLocationTracking(setLocation, isCenterOnUser);

  const zoomToDefault = () => {
    setRegion(defaultRegion);
    setIsCenterOnUser(false);
  };

  // Define a function to handle marker press
const handleMarkerPress = (markerId: string) => {
  router.push({
    pathname: '/details',
    params: { id: markerId }, // Pass markerId or other relevant data
  });
};

  return (
    <View style={styles.container}>
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
});
