import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Moment from 'moment';
import { UserContext } from '../../../App';
import { theme } from '../../theme';

import { TrashIcon } from '../../components/Icons';
import { gameService } from '../../services/gameService';

const image = {
  uri: 'https://i.postimg.cc/DZv8w2Sr/Pitch.png',
};

const Player = ({ name }) => (
  <View style={styles.player}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default function MatchDetails({ navigation, route, setGames }) {
  const player = useContext(UserContext);
  const [playersPool, setPlayers] = useState([players]);

  const { _id, location, description, date, admin, max_players, players } =
    route.params;

  console.log('CURRENT PLAYER ==========', player.name);
  // console.log('PLAYERS IN DETAILSVIEW ================', players);

  const checkPlayersInGame = players.some((element) => {
    return element.name == player.name ? true : false;
  });

  function addPlayerToGame() {
    gameService
      .addPlayerToGame({ player: player, _id })
      .then((fromDB) => {
        players.push(fromDB);
        setPlayers((prevState) => [fromDB, ...prevState]);
      })
      .catch((error) => console.log(error));
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // TODO -  WHY DOES THIS NOT LIVE UPDATE?!?!?!?

  function removePlayerFromGame() {
    gameService
      .removePlayerFromGame({ player: player, _id })
      .then((res) => {
        setPlayers((playersPool) => {
          // console.log('prevState: ', prevState);
          // console.log('players: ', players);
          // console.log('player to remove: ', player);
          // // prevState.forEach((el) =>
          // //   console.log('each player in players list:', el)
          // // );
          return playersPool.filter((el) => el != player);
        });
      })
      .catch((error) => console.log(error));
  }
  //////////////////////////////////////////////////////////////////////////////////////

  function deleteGame() {
    gameService
      .deleteThisGame(_id)
      .then((res) =>
        setGames((prevState) => {
          return prevState.filter((game) => game._id != _id);
        })
      )
      .catch((error) => console.log(error));
    navigation.goBack();
  }

  const renderPlayer = ({ item }) => (
    <Player name={item.name}>
      <Text>{item.name}</Text>
    </Player>
  );

  return (
    <View style={styles.container}>
      <View style={styles.matchInfo}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text style={styles.matchTitle}>{description}</Text>
          {player._id === admin ? (
            <Pressable
              onPress={deleteGame}
              style={({ pressed }) => styles.deletebtn}
            >
              <TrashIcon />
            </Pressable>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.timeLocation}>
          <Text style={styles.matchDetailsText}>
            Max players: {max_players}
          </Text>
          <Text style={styles.matchDetailsText}>@ {location}</Text>
          <Text style={styles.matchDetailsText}>
            {Moment(date).format('ddd Do MMM - HH:mm')}
          </Text>
        </View>
      </View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <View style={styles.btnsContainer}>
            {!checkPlayersInGame ? (
              <Pressable
                onPress={addPlayerToGame}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? theme.gainsboro : theme.emerald,
                  },
                  styles.button,
                ]}
              >
                <Text>Join</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={removePlayerFromGame}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? theme.white : theme.gainsboro,
                  },
                  styles.button,
                ]}
              >
                <Text style={{ color: theme.red }}>Leave Game</Text>
              </Pressable>
            )}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? theme.emerald : theme.mediumGreen,
                },
                styles.button,
                styles.createAcc,
              ]}
            >
              <Text>Invite</Text>
            </Pressable>
          </View>
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
        <View style={styles.list}>
          <FlatList
            data={players}
            renderItem={renderPlayer}
            keyExtractor={(player) => player._id}
            horizontal={false}
            numColumns={3}
          />
        </View>
        {players.length === max_players * 2 ? (
          <View style={styles.sortTeamBtnCont}>
            <Pressable
              onPress={() =>
                navigation.navigate('Set Teams', {
                  _id,
                  location,
                  date,
                  admin,
                  description,
                  date,
                  max_players,
                  players,
                  playersPool,
                  route,
                })
              }
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? theme.gainsboro : theme.emerald,
                },
                styles.setTeamBtn,
              ]}
            >
              <Text>Sort Teams</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
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
  matchInfo: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: theme.gainsboro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchTitle: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreMedium',
    fontSize: 32,
    marginTop: 5,
    letterSpacing: 2,
  },
  matchDetailsText: {
    color: theme.onyx,
    fontFamily: 'GemunuLibreMedium',
    margin: 5,
    letterSpacing: 1,
  },
  timeLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  teamList: {
    width: '100%',
    alignItems: 'space-between',
  },
  list: {
    flex: 3,
  },
  sortTeamBtnCont: {
    flex: 2,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  btnsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    // height: 50,
    // width: 150,
    flex: 1,
    // margin: 10,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    // borderRadius: 20,
    justifyContent: 'center',
  },
  setTeamBtn: {
    padding: 10,
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
  deletebtn: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 2,
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
