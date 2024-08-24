import { useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export function useLocationTracking(
  setLocation: (location: Location.LocationObject) => void,
  isCenterOnUser: boolean
) {
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 100,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation); // Update state with new location
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isCenterOnUser]);
}
