import MatchItem from './MatchItem';
import { View, StyleSheet, FlatList } from 'react-native';

export const MatchList = ({ navigation, games, setGames }) => {
  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.chatList}
          data={games}
          renderItem={({ item }) => (
            <MatchItem
              navigation={navigation}
              key={item._id}
              _id={item._id}
              description={item.description}
              location={item.location}
              date={item.date}
              admin={item.admin}
              admin_name={item.admin_name}
              max_players={item.max_players}
              teams={item.teams}
              players={item.players}
              setGames={setGames}
            />
          )}
          keyExtractor={(item) => item._id}
        />
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
