import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import socket from '../../utils/socket';

import { ChatComponent } from './ChatComponent';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';
import { messageService } from '../services/messageService';

import { Modal } from './Modal';
import { Loading } from '../ui/Loading';

export const Chat = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  async function fetchGroups() {
    try {
      setLoading(true);
      const groups = await messageService.getMessageGroups();
      setRooms(groups);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      {visible ? <Modal setVisible={setVisible} setRooms={setRooms} /> : ''}
      <SafeAreaView style={styles.container}>
        <FullWidthButton text={'New Chat'} onPress={() => setVisible(true)} />
        <View>
          {rooms.length > 0 ? (
            <FlatList
              style={styles.chatList}
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
    padding: 0,
    backgroundColor: theme.blackish,
  },
  chatList: {
    height: '90%',
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
