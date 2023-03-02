//import Moment from 'react-moment';
import Moment from 'moment';
import { Text, View, StyleSheet, Pressable } from 'react-native';
// import { UserContext } from '../../../userContext'; --- TO USE CONTEXT
import { UserContext } from '../../App';
import { useContext } from 'react';
import { theme } from '../ui/theme';

export const Item = ({
  leftBoxDate,
  hasTime,
  hasSmallImg,
  topText,
  bottomText,
}) => {
  const user = useContext(UserContext);

  const date = new Date();

  console.log('lItem', leftBoxDate);

  const handleNavigate = () => {
    console.log('would navigate');
  };

  return (
    <>
      <Pressable style={styles.gameItemBox} onPress={handleNavigate()}>
        <View style={styles.leftBox}>
          {leftBoxDate ? (
            <View style={styles.gameDateBox}>
              <Text style={styles.gameDate}>{Moment(date).format('ddd')}</Text>
              <Text style={styles.gameDate}>{Moment(date).format('D')}</Text>
              <Text style={styles.gameDate}>{Moment(date).format('MMM')}</Text>
            </View>
          ) : (
            <Image />
          )}
        </View>
        <View style={styles.infoBox}>
          <View style={styles.detailsBox}>
            <Text style={styles.topText}>{topText}</Text>
            {hasTime && (
              <Text style={styles.gameDate}>
                {Moment(date).format('HH:mm')}
              </Text>
            )}
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.bottomText}>{bottomText}</Text>
          </View>
          <View style={styles.detailsBox}></View>
          {hasSmallImg && <Text>Img</Text>}
        </View>
      </Pressable>
    </>
  );
};

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
  detailsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topText: {
    padding: 0,
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    fontSize: 20,
  },
  bottomText: {
    color: theme.darkGrey,
    fontSize: 14,
    paddingVertical: 5,
  },
  gameLocationText: {
    padding: 0,
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
    fontSize: 14,
  },
});
