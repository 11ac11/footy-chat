import { gameService } from '../services/gameService';
import { useState, useEffect } from 'react';
import MatchItem from './MatchItem';
import { Text, View, StyleSheet } from 'react-native';

export default function MatchList({ navigation }) {
  const [games, setGames] = useState([]);

  async function fetchGames() {
    const games = await gameService.getGames();
    setGames(games.sort((a, b) => new Date(a.date) - new Date(b.date)));
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {games.map((game) => (
          <MatchItem
            navigation={navigation}
            key={game._id}
            id={game._id}
            description={game.description}
            location={game.location}
            date={game.date}
            admin={game.admin}
            admin_name={game.admin_name}
            max_players={game.max_players}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
