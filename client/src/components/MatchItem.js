//import Moment from 'react-moment';
import Moment from 'moment';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../theme';

export default function MatchItem({
  _id,
  location,
  description,
  date,
  navigation,
  admin,
  max_players,
}) {
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
          })
        }
      >
        <View style={styles.gameDateBox}>
          <Text style={styles.gameDate}>
            {Moment(date).format('ddd Do MMM - HH:mm')}
          </Text>
        </View>
        <View>
          <Text style={styles.gameDetails}>
            {description} {'\n'}@ {location} {'\n'}
            Organiser
          </Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  gameItem: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    borderRadius: 20,
    marginBottom: 10,
    borderColor: theme.gainsboro,
    borderStyle: 'solid',
    borderWidth: 1,
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

  gameDetails: {
    padding: 10,
    color: theme.onyx,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 2,
  },

  selectGame: {
    width: 80,
    justifyContent: 'center',
    color: 'inherit',
  },
});
