//import Moment from 'react-moment';
import Moment from 'moment';
import { Text, View, StyleSheet, Pressable } from 'react-native';
// import { UserContext } from '../../../userContext'; --- TO USE CONTEXT
import { UserContext } from '../../../App';
import { useContext } from 'react';
import { theme } from '../../theme';

export default function MatchItem({
  _id,
  location,
  description,
  date,
  navigation,
  admin,
  admin_name,
  max_players,
  players,
  teams,
  games,
  setGames,
}) {
  const user = useContext(UserContext);

  return (
    <>
      <Pressable
        style={styles.gameItemBox}
        onPress={() =>
          navigation.navigate('Match Details', {
            _id: _id,
            location: location,
            date: date,
            admin: admin,
            description: description,
            date: date,
            max_players: max_players,
            players: players,
            teams,
            games,
            setGames,
          })
        }
      >
        <View style={styles.gameDateBox}>
          <Text style={styles.gameDate}>{Moment(date).format('ddd')}</Text>
          <Text style={styles.gameDate}>{Moment(date).format('D')}</Text>
          <Text style={styles.gameDate}>{Moment(date).format('MMM')}</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.gameDetailsBox}>
            <Text style={styles.gameDate}>{Moment(date).format('HH:mm')}</Text>
            <Text style={styles.gameLocationText}>@ {location} </Text>
          </View>
          <View style={styles.gameDetailsBox}>
            <Text style={styles.gameNameText}>{description}</Text>
          </View>
          <View style={styles.gameDetailsBox}>
            {admin === user._id ? (
              <Text style={[styles.gameNameText, styles.organiser]}>
                ⭐ You are organising
              </Text>
            ) : (
              <Text style={[styles.gameNameText, styles.organiser]}>
                Organiser : {admin_name}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  gameItemBox: {
    width: '99%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 80,
    marginBottom: 10,
  },
  gameDateBox: {
    backgroundColor: theme.onyx,
    borderRadius: 10,
    maxWidth: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameDate: {
    color: theme.emerald,
    fontFamily: 'GemunuLibreBold',
    fontSize: 16,
    letterSpacing: 3,
    textAlign: 'center',
  },
  infoBox: {
    width: '85%',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 0,
  },
  gameDetailsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameNameText: {
    padding: 0,
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    fontSize: 20,
  },
  gameLocationText: {
    padding: 0,
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
    fontSize: 14,
  },
  organiser: {
    color: theme.darkGrey,
    fontSize: 14,
    paddingVertical: 5,
  },
});
