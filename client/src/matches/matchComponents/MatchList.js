import MatchItem from './MatchItem';
import { View, StyleSheet } from 'react-native';

export const MatchList = ({ navigation, games, setGames }) => {
  return (
    <>
      <View style={styles.container}>
        {games.map((game) => (
          <MatchItem
            navigation={navigation}
            key={game._id}
            _id={game._id}
            description={game.description}
            location={game.location}
            date={game.date}
            admin={game.admin}
            admin_name={game.admin_name}
            max_players={game.max_players}
            teams={game.teams}
            players={game.players}
            setGames={setGames}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
});
