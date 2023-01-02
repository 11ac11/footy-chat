import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Pressable,
  Modal,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Moment from 'moment';
import { UserContext } from '../../../App';
import { theme } from '../../theme';

import { TrashIcon } from '../../components/Icons';
import { gameService } from '../../services/gameService';
import FullWidthButton from '../../components/FullWidthButton';
import PrimaryButton from '../../components/PrimaryButton';
import DeleteGameModal from './DeleteGameModal';
import { Loading } from '../../components/Loading';

const image = {
  uri: 'https://i.postimg.cc/DZv8w2Sr/Pitch.png',
};

const Player = ({ name }) => (
  <View style={styles.player}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default function MatchDetails({ navigation, route, setGames }) {
  let { _id, location, description, date, admin, max_players, teams } =
    route.params;
  const player = useContext(UserContext);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDelWindow, setShowDelWindow] = useState(false);
  const [isPlayerInGame, setIsPlayerInGame] = useState(false);

  async function fetchPlayers() {
    try {
      setLoading(true);
      const thisGame = await gameService.getThisGame(_id);
      setPlayers(thisGame.players);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => setIsPlayerInGame(checkPlayersInGame()), [players]);

  const checkPlayersInGame = function () {
    return players.some((element) => {
      return element.name == player.name ? true : false;
    });
  };

  function addPlayerToGame() {
    gameService
      .addPlayerToGame({ player: player, _id })
      .then((fromDB) => {
        console.log('fromDb', fromDB);
        setPlayers((prevState) => [fromDB, ...prevState]);
        setIsPlayerInGame(true);
      })
      .catch((error) => console.log(error));
  }

  function removePlayerFromGame() {
    gameService
      .removePlayerFromGame({ player: player, _id })
      .then((res) => {
        setPlayers((prevState) => {
          return [
            ...prevState.filter((el) => {
              console.log('el', el._id, el._id != player._id);
              return el._id != player._id;
            }),
          ];
        });
        setIsPlayerInGame(false);
      })
      .catch((error) => console.log(error));
  }

  function confirmDeleteGame() {
    gameService
      .deleteThisGame(_id)
      .then((res) =>
        setGames((prevState) => {
          return prevState.filter((game) => game._id != _id);
        })
      )
      .catch((error) => console.log(error));
    setShowDelWindow(false);
    navigation.goBack();
  }

  const renderPlayer = ({ item }) => (
    <Player name={item.name}>
      <Text>{item.name}</Text>
    </Player>
  );

  return !loading ? (
    <View style={styles.container}>
      <View style={styles.matchInfo}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text style={styles.matchTitle}>{description}</Text>
          <Text style={styles.matchDetailsTime}>
            {Moment(date).format('ddd Do MMM - HH:mm')}
          </Text>

          {player._id === admin ? (
            <Pressable
              onPress={() => setShowDelWindow(true)}
              style={({ pressed }) => styles.deletebtn}
            >
              <TrashIcon />
            </Pressable>
          ) : (
            <></>
          )}
        </View>
        {showDelWindow ? (
          <DeleteGameModal
            showDelWindow={showDelWindow}
            setShowDelWindow={setShowDelWindow}
            _id={_id}
            location={location}
            description={description}
            date={date}
            navigation={navigation}
            confirmDeleteGame={confirmDeleteGame}
          />
        ) : (
          <></>
        )}
        <View style={styles.matchDetailsBox}>
          <Text style={styles.matchDetailsText}>
            Max players: {teams === 2 ? max_players * 2 : max_players}
          </Text>
          <Text style={styles.matchDetailsText}>@ {location}</Text>
        </View>
      </View>
      <ImageBackground
        source={require('../../../assets/Pitch.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <View style={styles.btnsContainer}>
            {!isPlayerInGame ? (
              <FullWidthButton onPress={addPlayerToGame} text={'Join'} />
            ) : (
              <FullWidthButton onPress={removePlayerFromGame} text={'Leave'} />
            )}
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
            <PrimaryButton
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
                  route,
                })
              }
              text={'Set teams'}
            />
          </View>
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  ) : (
    <>
      <Loading />
    </>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.blackish,
  },
  matchTitle: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreBold',
    fontSize: 32,
    marginTop: 5,
    letterSpacing: 2,
    color: theme.white,
  },
  matchDetailsText: {
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
  },
  matchDetailsTime: {
    color: theme.emerald,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
  },
  matchDetailsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    width: '95%',
  },
  teamList: {
    width: '100%',
    alignItems: 'space-between',
  },
  list: {
    flex: 2.5,
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
    fontFamily: 'GemunuLibreBold',
  },
  image: {
    height: '100%',
    alignItems: 'center',
  },
});
