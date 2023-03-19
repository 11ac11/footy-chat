import Moment from 'moment';
import { Text, View, StyleSheet, Pressable } from 'react-native';
// import { UserContext } from '../../../userContext'; --- TO USE CONTEXT
import { UserContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { theme } from '../ui/theme';

export const FCListItem = ({
  navigation,
  leftBoxDate,
  hasSmallImg,
  timeOnRight,
  topText,
  bottomText,
  thirdText,
  date,
  time,
}) => {
  const user = useContext(UserContext);

  const handleNavigate = () => {
    console.log('would navigate');
  };

  return (
    <>
      <Pressable style={styles.gameItemBox} onPress={handleNavigate}>
        <View style={[styles.leftBox, leftBoxDate && styles.leftBoxDate]}>
          {leftBoxDate ? (
            <>
              <Text style={styles.gameDateDay}>
                {Moment(date).format('ddd')}
              </Text>
              <Text style={styles.gameDateDay}>{Moment(date).format('D')}</Text>
              <Text style={styles.gameDate}>{Moment(date).format('MMM')}</Text>
            </>
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={50}
              color={theme.emerald}
              style={styles.chatImg}
            />
          )}
        </View>
        <View
          style={[styles.infoBox, bottomText && styles.infoBoxWithThirdText]}
        >
          <View style={styles.detailsBox}>
            <Text style={styles.topText}>{topText}</Text>
          </View>
          {bottomText && (
            <View style={styles.detailsBox}>
              <Text style={styles.bottomText}>{bottomText}</Text>
            </View>
          )}
          {thirdText && (
            <View style={styles.detailsBox}>
              <Text style={styles.thirdText}>{thirdText}</Text>
            </View>
          )}
        </View>
        <View style={styles.rightBox}>
          {timeOnRight && (
            <Text
              style={[
                styles.msgPreviewTime,
                !hasSmallImg && styles.msgPreviewTimeExtraPadding,
              ]}
            >
              {time ? Moment(time).format('HH:mm') : 'now'}
            </Text>
          )}
          {hasSmallImg && (
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={theme.emerald}
              style={styles.chatImg}
            />
          )}
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  gameItemBox: {
    width: '100%',
    maxHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  leftBox: {
    borderRadius: 10,
    maxWidth: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  leftBoxDate: {
    backgroundColor: theme.onyx,
    padding: 10,
  },
  gameDateDay: {
    color: theme.emerald,
    fontFamily: 'GemunuLibreBold',
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
  },
  gameDate: {
    color: theme.emerald,
    fontFamily: 'GemunuLibreBold',
    fontSize: 14,
    letterSpacing: 2,
    textAlign: 'center',
  },
  gameTime: {
    color: theme.white,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    opacity: 0.5,
    fontSize: 10,
    position: 'absolute',
    bottom: 3,
  },
  infoBox: {
    minWidth: '60%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 5,
  },
  infoBoxWithThirdText: {
    justifyContent: 'space-around',
  },
  detailsBox: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  topText: {
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    fontSize: 20,
  },
  bottomText: {
    color: theme.darkGrey,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    fontSize: 14,
  },
  thirdText: {
    color: theme.darkGrey,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    fontSize: 14,
  },
  rightBox: {
    width: 50,
    height: '100%',
    alignItems: 'space-between',
    justifyContent: 'space-between',
  },
  msgPreviewTime: {
    opacity: 0.5,
    color: theme.emerald,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
  },
  msgPreviewTimeExtraPadding: {
    paddingTop: 10,
  },
});
