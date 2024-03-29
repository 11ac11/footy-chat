import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { gameService } from '../services/gameService';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home.screen';
import { CreateMatchModal } from './matchComponents/CreateMatchModal';
import MatchDetails from './matchComponents/MatchDetails';
import { MatchSetTeams } from './matchComponents/MatchSetTeams';
import { theme } from '../ui/theme';

const Stack = createStackNavigator();

export const MatchStack = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchGames() {
    try {
      setLoading(true);
      const games = await gameService.getGames();
      setGames(games.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Matches"
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
