import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { gameService } from '../services/gameService';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home.screen';
import { CreateMatchModal } from './matchComponents/CreateMatchModal';
import MatchDetails from './matchComponents/MatchDetails';
import { MatchSetTeams } from './matchComponents/MatchSetTeams';
import { theme } from '../theme';

const Stack = createStackNavigator();

export const MatchStack = ({ navigation }) => {
  const [games, setGames] = useState([]);

  async function fetchGames() {
    const games = await gameService.getGames();
    setGames(games);
  }

  useEffect(() => {
    fetchGames();
  }, []);

  //console.log(games);
  return (
    <Stack.Navigator
      initialRouteName="Matches"
      screenOptions={{
        headerTitleStyle: { color: 'black' },
        headerTitleAlign: 'center',
        headerTintColor: theme.emerald,
      }}
    >
      <Stack.Screen name="Matches">
        {(props) => <Home {...props} setGames={setGames} games={games} />}
      </Stack.Screen>
      <Stack.Screen name="Create Match">
        {(props) => (
          <CreateMatchModal {...props} setGames={setGames} games={games} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Match Details">
        {(props) => (
          <MatchDetails {...props} setGames={setGames} games={games} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Set Teams">
        {(props) => (
          <MatchSetTeams {...props} setGames={setGames} games={games} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
