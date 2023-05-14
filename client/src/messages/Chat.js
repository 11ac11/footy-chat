import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import socket from '../../utils/socket';

import { FCList } from '../components/FCList';
import { FCListItem } from '../components/FCListItem';
import TeamCircleSplit from '../../assets/svgs/TeamCircleSplit';

import { ChatComponent } from './ChatComponent';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';
import { messageService } from '../services/messageService';

import { Modal } from './Modal';
import { Loading } from '../ui/Loading';
import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation();

  const chatListItemProps = {
    navigation: navigation,
    leftBoxDate: false,
    hasSmallImg: false,
    timeOnRight: true,
  };

  console.log(rooms);

  return (
    <>
      {visible ? <Modal setVisible={setVisible} setRooms={setRooms} /> : ''}
      <SafeAreaView style={styles.container}>
        <FullWidthButton text={'New Chat'} onPress={() => setVisible(true)} />
        {rooms.length > 0 ? (
          <FCList
            data={rooms}
            renderItem={({ item }) => (
              <FCListItem
                {...chatListItemProps}
                topText={item.name}
                bottomText={`${item.messages[item.messages.length - 1].user}: ${
                  item.messages[item.messages.length - 1].text
                }`}
                time={item.messages[item.messages.length - 1].time}
                key={item.messages._id}
                _id={item.messages._id}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <View style={[styles.chatListEmpty, { paddingTop: 50 }]}>
            <Loading />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: theme.blackish,
    justifyContent: 'center',
  },
  chatList: {
    height: '50%',
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
