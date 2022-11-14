import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import { theme } from '../../theme';

import * as Clipboard from 'expo-clipboard';
import FullWidthButton from '../../components/FullWidthButton';

const PlayerT1 = (props) => (
  <View style={styles.playerInList}>
    <Text style={[styles.text]}>
      {props.position}: {props.name}
    </Text>
  </View>
);
const PlayerT2 = (props) => (
  <View style={styles.playerInList}>
    <Text style={[styles.text, styles.whiteText]}>
      {props.position}: {props.name}
    </Text>
  </View>
);

function sortTeams(players, teamSize) {
  const newPlayersArr = [...players];
  if (newPlayersArr.length > teamSize * 2) newPlayersArr.length = teamSize * 2;

  let GK = [];
  let DFs = [];
  let wDFs = [];
  let MDs = [];
  let wingers = [];
  let STs = [];
  let team1 = [];
  let team2 = [];

  function sortPositions(newPlayersArr) {
    while (newPlayersArr.length > 0) {
      const player = newPlayersArr.splice(0, 1)[0];
      if (player.position === 'GK') GK.push(player);
      if (player.position === 'defender') DFs.push(player);
      if (player.position === 'wide-defender') wDFs.push(player);
      if (player.position === 'midfielder') MDs.push(player);
      if (player.position === 'winger') wingers.push(player);
      if (player.position === 'striker') STs.push(player);
    }
    return;
  }

  sortPositions(newPlayersArr);

  pickPlayers(GK);
  pickPlayers(DFs);
  pickPlayers(wDFs);
  pickPlayers(MDs);
  pickPlayers(wingers);
  pickPlayers(STs);

  function pickPlayers(input) {
    let iteration = 0;
    while (input.length > 0) {
      if (team1.length == teamSize && team2.length == teamSize) return; //working but only picks defenders
      iteration++;
      const random = Math.floor(Math.random() * input.length);
      const randomPlayer = input.splice(random, 1)[0];
      if (team2.length > team1.length) team1.push(randomPlayer);
      else if (iteration % 2 === 0) team1.push(randomPlayer); // == or ===?
      else team2.push(randomPlayer);
    }
  }

  return [team1, team2];
}

export const MatchSetTeams = ({ navigation, route, playersPool, games }) => {
  const { _id, location, description, date, admin, max_players, players } =
    route.params;

  let [team1, team2] = sortTeams(players, max_players);

  const handlePress = () => {
    console.log(sortTeams(players, max_players));
  };

  // const copyToClipboard = async () => {
  //   await Clipboard.setStringAsync('hello world');
  // };

  return (
    <SafeAreaView style={styles.container}>
      <FullWidthButton text={'Set Again'} onPress={handlePress} />
      <View style={styles.teamSheetCont}>
        <View style={styles.teamOne}>
          <FlatList
            data={team1}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerT1
                name={item.name}
                position={
                  item.position === 'defender'
                    ? 'DF'
                    : '' || item.position === 'midfielder'
                    ? 'MD'
                    : '' || item.position === 'striker'
                    ? 'ST'
                    : '' || item.position === 'GK'
                    ? 'GK'
                    : ''
                }
              />
            )}
            ListHeaderComponent={<Text style={styles.heading}>Team 1</Text>}
          />
        </View>
        <View style={styles.teamTwo}>
          <FlatList
            data={team2}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerT2
                name={item.name}
                position={
                  item.position === 'defender'
                    ? 'DF'
                    : '' || item.position === 'midfielder'
                    ? 'MD'
                    : '' || item.position === 'striker'
                    ? 'ST'
                    : '' || item.position === 'GK'
                    ? 'GK'
                    : ''
                }
              />
            )}
            ListHeaderComponent={
              <Text style={[styles.heading, styles.whiteText]}>Team 2</Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamSheetCont: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamOne: {
    padding: 5,
    width: '50%',
    backgroundColor: theme.white,
  },
  teamTwo: {
    padding: 5,
    width: '50%',
    alignSelf: 'flex-end',
    backgroundColor: theme.onyx,
  },
  playerInList: {
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'GemunuLibreBold',
  },
  heading: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'GemunuLibreBold',
  },
  whiteText: {
    color: theme.white,
  },
});
