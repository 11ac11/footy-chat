import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home.screen';
import { CreateMatchModal } from '../components/CreateMatchModal';
import MatchDetails from './MatchDetails';
import { theme } from '../theme';

const Stack = createStackNavigator();

export const MatchStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Matches"
      screenOptions={{
        headerTitleStyle: { color: 'black' },
        headerTitleAlign: 'center',
        headerTintColor: theme.emerald,
      }}
    >
      <Stack.Screen name="Matches" component={Home} />
      <Stack.Screen name="Create Match" component={CreateMatchModal} />
      <Stack.Screen name="Match Details" component={MatchDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
