import React from 'react';
import { gameService } from '../../services/gameService';
import { Text, Modal, View, StyleSheet, Pressable } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { theme } from '../../theme';

export default function deleteGameModal({
  showDelWindow,
  setShowDelWindow,
  _id,
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
        <Text style={styles.matchTitle}>
          {description} @ {location} on {date}
        </Text>
        <Pressable onPress={() => setShowDelWindow(false)}>
          <PrimaryButton text={'No'} onPress={() => setShowDelWindow(false)} />
          <PrimaryButton
            text={'Yes, delete'}
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
});
