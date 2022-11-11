import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, { useContext } from 'react';
import Moment from 'moment';
import { UserContext } from '../../App';
import { theme } from '../theme';

const confirmedPlayers = [
  { name: 'Alex', id: 1 },
  { name: 'Pete', id: 2 },
  { name: 'Sam', id: 3 },
  { name: 'Rob', id: 4 },
  { name: 'Simon', id: 5 },
  { name: 'Alexander Crump', id: 6 },
  { name: 'Alex', id: 7 },
  { name: 'Pete', id: 8 },
  { name: 'Sam', id: 9 },
  { name: 'Rob', id: 10 },
  { name: 'Simon', id: 11 },
  { name: 'Alexander Crump', id: 12 },
  { name: 'Alex', id: 13 },
  { name: 'Pete', id: 14 },
  { name: 'Sam', id: 15 },
  { name: 'Rob', id: 16 },
  { name: 'Simon', id: 17 },
  { name: 'Alexander Crump', id: 18 },
];

const image = {
  uri: 'https://i.postimg.cc/DZv8w2Sr/Pitch.png',
  // uri: 'https://media.cnn.com/api/v1/images/stellar/prod/background-pitch.png?q=h_596,w_561,x_0,y_0/w_1280',
};

const Player = ({ name }) => (
  <View style={styles.player}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default function MatchDetails({ navigation, route }) {
  const user = useContext(UserContext);
  const { _id, location, description, date, admin, max_players } = route.params;

  const renderPlayer = ({ item }) => (
    <Player name={item.name}>
      <Text>{item.name}</Text>
    </Player>
  );

  return (
    <View contentContainerStyle={styles.container}>
      <View style={styles.matchInfo}>
        <Text style={styles.matchTitle}>{description}</Text>
        <View style={styles.timeLocation}>
          <Text style={styles.matchDetailsText}>
            Max players: {max_players}
          </Text>
          <Text style={styles.matchDetailsText}>@ {location}</Text>
          <Text style={styles.matchDetailsText}>
            {Moment(date).format('ddd Do MMM - HH:mm')}
          </Text>
        </View>
        {user._id === admin ? (
          <Text style={{ color: 'red' }}>Delete game</Text>
        ) : (
          <></>
        )}
      </View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.teamList}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? theme.emerald : theme.mediumGreen,
              },
              styles.button,
            ]}
          >
            <Text>Join</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? theme.emerald : theme.white,
              },
              styles.button,
              styles.createAcc,
            ]}
          >
            <Text>Invite</Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: 'white',
            fontFamily: 'GemunuLibreBold',
            padding: 10,
          }}
        >
          Confirmed Players
        </Text>
        <FlatList
          data={confirmedPlayers}
          renderItem={renderPlayer}
          keyExtractor={(player) => player.id}
          horizontal={false}
          numColumns={3}
          contentContainerStyle={styles.teamList}
        />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  matchDetailsText: {
    color: theme.onyx,
    fontFamily: 'GemunuLibreMedium',
    margin: 5,
  },
  matchInfo: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: theme.gainsboro,
  },
  matchTitle: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreMedium',
    fontSize: 32,
    marginTop: 5,
  },
  teamList: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 300,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  player: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 5,
    margin: 5,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreMedium',
  },
  image: {
    height: '100%',
    alignItems: 'center',
  },
});
