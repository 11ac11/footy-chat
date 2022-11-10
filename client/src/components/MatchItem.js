//import Moment from 'react-moment';
import Moment from 'moment';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../theme';

export default function MatchItem({
  _id,
  location,
  description,
  date,
  organiser,
  navigation,
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
            organiser: organiser,
            description: description,
            date: date,
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
