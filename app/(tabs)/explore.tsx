import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/horsens.png')}  // Replace with your actual image path
          style={styles.headerImage}
          resizeMode="cover"  // Adjust how the image fits in the space
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Velkommen!</ThemedText>
      </ThemedView>
      <ThemedText>Dette er en app, der er beregnet til at hjælpe med at finde rundt på Horsens hospital.</ThemedText>
      <ThemedText>Du er meget velkommen til at kontake mig, hvis du har idéer til, hvordan appen kan forbedres.</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',  // Make the image take up the full width of the screen
    height: 310,    // Set the height of the header image
    bottom: -90,    // Adjust vertical position
    left: 0,        // Start from the left edge
    position: 'absolute',  // Absolute positioning for the header image
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,  // Adjust or remove padding for full-width effect
  },
});
