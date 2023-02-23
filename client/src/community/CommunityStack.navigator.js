import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../ui/theme';
import { Community } from './Community.screen';

const Stack = createStackNavigator();

export const CommunityStack = ({ navigation }) => {
  // const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(false);

  // async function fetchGames() {
  //   try {
  //     setLoading(true);
  //     const games = await gameService.getGames();
  //     setGames(games.sort((a, b) => new Date(a.date) - new Date(b.date)));
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchGames();
  // }, []);

  return (
    <Stack.Navigator
      initialRouteName="Community"
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
      <Stack.Screen name="Community">
        {(props) => <Community {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
