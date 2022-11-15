import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import socket from '../../utils/socket';
import { theme } from '../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Modal = ({ setVisible, setRooms }) => {
  const [groupName, setGroupName] = useState('');
  const closeModal = () => setVisible(false);

  const handleCreateRoom = () => {
    socket.emit('createRoom', groupName);
    closeModal();
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <Pressable style={styles.closeBtnCont} onPress={closeModal}>
          <Text style={styles.closeBtnText}>X</Text>
        </Pressable>
        <Text style={styles.modalsubheading}>Chat name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Best XI FC"
          onChangeText={(value) => setGroupName(value)}
        />
        <PrimaryButton onPress={handleCreateRoom} text={'Create'} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    height: '100%',
    width: '100%',
    elevation: 1,
    backgroundColor: theme.blackish,
    zIndex: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnCont: {
    position: 'absolute',
    top: 1,
    right: 5,
    padding: 10,
  },
  closeBtnText: {
    color: theme.gainsboro,
    fontSize: 20,
  },

  input: {
    padding: 15,
    borderRadius: 20,
    width: '90%',
    backgroundColor: theme.onyx,
    color: theme.gainsboro,
  },
  modalsubheading: {
    margin: 20,
    fontFamily: 'GemunuLibreBold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
});
