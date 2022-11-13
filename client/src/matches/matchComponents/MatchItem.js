//import Moment from 'react-moment';
import Moment from 'moment';
import { Text, View, StyleSheet, Pressable } from 'react-native';
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
  games,
  setGames,
}) {
  const user = useContext(UserContext);

  return (
    <>
      <Pressable
        style={styles.gameItem}
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
            games,
            setGames,
          })
        }
      >
        <View style={styles.gameDateBox}>
          <Text style={styles.gameDate}>
            {Moment(date).format('ddd Do MMM - HH:mm')}
          </Text>
        </View>
        <View style={styles.gameDetailsBox}>
          <Text style={styles.gameDetails}>{description}</Text>
          <Text style={styles.gameDetails}>@ {location} </Text>
        </View>

        <View>
          {admin === user._id ? (
            <Text style={[styles.gameDetails, styles.organiser]}>
              ⭐ You are organising
            </Text>
          ) : (
            <Text style={[styles.gameDetails, styles.organiser]}>
              Organiser : {admin_name}
            </Text>
          )}
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  gameItem: {
    textDecoration: 'none',
    color: 'inherit',
    width: '80%',
    margin: 10,
    borderColor: theme.gainsboro,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
  },

  gameDateBox: {
    backgroundColor: theme.mediumGreen,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  gameDate: {
    color: theme.white,
    fontFamily: 'GemunuLibreBold',
    fontSize: 18,
    letterSpacing: 2,
  },

  gameDetailsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  gameDetails: {
    padding: 0,
    color: theme.onyx,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
    fontSize: 16,
  },

  organiser: {
    color: 'grey',
    fontSize: 14,
    padding: 10,
    paddingTop: 0,
  },

  selectGame: {
    width: 80,
    justifyContent: 'center',
    color: 'inherit',
  },
});
