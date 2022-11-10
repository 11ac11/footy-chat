import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from './Profile.screen';
import { CreateMatchModal } from '../components/CreateMatchModal';

const Stack = createStackNavigator();

export const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Matches">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
