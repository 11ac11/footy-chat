import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from './Profile.screen';
import { UserContext } from '../../App';

const Stack = createStackNavigator();

export const ProfileStack = ({ navigation, setIsAuthenticated }) => {
  const profile = useContext(UserContext);
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" options={{ title: `Your profile` }}>
        {(props) => (
          <Profile {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
