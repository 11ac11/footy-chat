import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import socket from '../../utils/socket';

import { ChatComponent } from './ChatComponent';
import { theme } from '../theme';
import FullWidthButton from '../components/FullWidthButton';
import { messageService } from '../services/messageService';

import { Modal } from './Modal';
import { Loading } from '../components/Loading';

export const Chat = () => {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  async function fetchGroups() {
    const groups = await messageService.getMessageGroups();
    setRooms(groups);
  }
  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on('roomsList', (newRoom) => {
      setRooms((prevRooms) => [newRoom, ...prevRooms]);
    });
    socket.on('roomsListUpdate', (newRoom) => {
      setRooms(newRoom);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.on('roomsListUpdate', (newRoom) => {
  //     setRooms(newRoom);
  //   });
  // }, [socket]);

  return (
    <>
      {visible ? <Modal setVisible={setVisible} setRooms={setRooms} /> : ''}
      <SafeAreaView style={styles.container}>
        <FullWidthButton text={'New Chat'} onPress={() => setVisible(true)} />
        <View>
          {rooms.length > 0 ? (
            <FlatList
              data={rooms}
              renderItem={({ item }) => <ChatComponent item={item} />}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <View style={[styles.chatListEmpty, { paddingTop: 50 }]}>
              <Loading />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.blackish,
  },
  chatListEmpty: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChatListText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 30,
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreBold',
  },
});
