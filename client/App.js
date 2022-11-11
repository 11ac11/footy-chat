import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import auth from './utils/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';

import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { theme } from './src/theme';
import Login from './src/screens/Login';
import { CreateAccount } from './src/components/CreateAccount';

import { playerService } from './src/services/playerService';

export const UserContext = createContext();

export default function App() {
  const [fontsLoaded] = useFonts({
    GemunuLibre: require('./assets/fonts/GemunuLibre-VariableFont_wght.ttf'),
    GemunuLibreBold: require('./assets/fonts/Gemunu_Libre/GemunuLibre-Bold.ttf'),
    GemunuLibreLight: require('./assets/fonts/Gemunu_Libre/GemunuLibre-Light.ttf'),
    GemunuLibreMedium: require('./assets/fonts/Gemunu_Libre/GemunuLibre-Medium.ttf'),
  });

  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');

  async function fetchProfile() {
    const profile = await playerService.getPlayerByEmail(userEmail);
    setCurrentUser(profile);
    console.log(profile.name);
  }

  useEffect(() => {
    fetchProfile();
    console.log(userEmail);
  }, [userEmail]);

  const Stack = createStackNavigator();

  return fontsLoaded ? (
    <UserContext.Provider value={currentUser}>
      <NavigationContainer style={styles.container}>
        {isAuthenticated ? (
          <BottomTabsNavigator setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Stack.Navigator
            style={styles.login}
            initialRouteName="Log In"
            screenOptions={{ headerShown: false, presentation: 'modal' }}
          >
            <Stack.Screen style={styles.login} name="Log In">
              {(props) => (
                <Login
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserEmail={setUserEmail}
                />
              )}
            </Stack.Screen>
            <Stack.Screen style={styles.login} name="Create Account">
              {(props) => (
                <CreateAccount
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                  setUserEmail={setUserEmail}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </UserContext.Provider>
  ) : (
    <Text>loading...</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 19,
    backgroundColor: theme.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    flex: 1,
    backgroundColor: theme.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
