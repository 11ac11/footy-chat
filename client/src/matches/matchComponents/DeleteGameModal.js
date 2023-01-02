import React from 'react';
import { Text, Modal, View, StyleSheet, Pressable } from 'react-native';
import Moment from 'moment';
import PrimaryButton from '../../components/PrimaryButton';
import { theme } from '../../theme';

export default function deleteGameModal({
  setShowDelWindow,
  location,
  description,
  date,
  confirmDeleteGame,
}) {
  return (
    <Modal>
      <View style={styles.container}>
        <Text style={styles.matchTitle}>
          Are you sure you want to delete this game?
        </Text>
        <Text style={styles.matchDetails}>
          {description} <Text style={styles.span}>@</Text> {location + ' '}
        </Text>
        <Text style={styles.matchTime}>
          {' ' + Moment(date).format('ddd Do MMM - HH:mm')}
        </Text>
        <Pressable onPress={() => setShowDelWindow(false)}>
          <PrimaryButton
            text={"No, don't delete it"}
            onPress={() => setShowDelWindow(false)}
          />
          <PrimaryButton
            text={'Yes, delete it'}
            onPress={() => confirmDeleteGame()}
            mainColor={theme.red}
          />
        </Pressable>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.blackish,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchTitle: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreBold',
    fontSize: 32,
    marginTop: 5,
    letterSpacing: 2,
    color: theme.white,
  },
  matchDetails: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreBold',
    fontSize: 26,
    marginTop: 5,
    letterSpacing: 2,
    color: theme.emerald,
  },
  matchTime: {
    textAlign: 'center',
    fontFamily: 'GemunuLibreMedium',
    fontSize: 18,
    marginTop: 5,
    letterSpacing: 2,
    color: theme.white,
  },
});
