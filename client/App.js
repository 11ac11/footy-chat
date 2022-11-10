import React from 'react';
import { StyleSheet, View, useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    GemunuLibre: require('./assets/fonts/GemunuLibre-VariableFont_wght.ttf'),
    GemunuLibreBold: require('./assets/fonts/Gemunu_Libre/GemunuLibre-Bold.ttf'),
    GemunuLibreLight: require('./assets/fonts/Gemunu_Libre/GemunuLibre-Light.ttf'),
    GemunuLibreMedium: require('./assets/fonts/Gemunu_Libre/GemunuLibre-Medium.ttf'),
  });

  return (
    <NavigationContainer style={styles.container}>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 19,
    backgroundColor: 'teal',
  },
});
