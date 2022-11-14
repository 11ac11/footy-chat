import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from './Profile.screen';
import { UserContext } from '../../App';
import { theme } from '../theme';

const Stack = createStackNavigator();

export const ProfileStack = ({ navigation, setIsAuthenticated }) => {
  const profile = useContext(UserContext);
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleStyle: { color: 'black' },
        headerTitleAlign: 'center',
        headerTintColor: theme.emerald,
        headerStyle: {
          backgroundColor: theme.blackish,
          borderBottomWidth: 0,
          shadowColor: 'transparent', // this covers iOS
          elevation: 0, // this covers Android
        },
        headerTitleStyle: {
          color: theme.gainsboro,
          fontFamily: 'GemunuLibreBold',
          letterSpacing: 1,
        },
      }}
    >
      <Stack.Screen name="Profile" options={{ title: `Your profile` }}>
        {(props) => (
          <Profile {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
