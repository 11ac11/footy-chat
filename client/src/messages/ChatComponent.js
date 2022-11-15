import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Moment from 'moment';

export const ChatComponent = ({ item }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    item.messages ? setMessages(item.messages[item.messages.length - 1]) : {};
  }, [messages]);

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      _id: item._id,
      name: item.name,
    });
  };

  return (
    <Pressable style={styles.chatItemContainer} onPress={handleNavigation}>
      <Ionicons
        name="person-circle-outline"
        size={45}
        color={theme.emerald}
        style={styles.chatImg}
      />

      <View style={styles.chatDetailsContainer}>
        <View>
          <Text style={styles.chatNameText}>{item.name}</Text>

          <Text style={styles.msgPreview}>
            {messages?.text
              ? `${messages.user}: ${messages.text}`
              : 'Tap to start chatting'}
          </Text>
        </View>
        <View>
          <Text style={styles.msgPreviewTime}>
            {messages?.time ? Moment(messages.time).format('HH:mm') : 'now'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 80,
    marginBottom: 10,
  },
  chatImg: {
    marginRight: 15,
  },
  chatNameText: {
    fontSize: 20,
    marginBottom: 5,
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
  },
  msgPreview: {
    fontSize: 14,
    fontFamily: 'GemunuLibreBold',
    color: theme.darkGrey,
    letterSpacing: 1,
  },
  chatDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  msgPreviewTime: {
    opacity: 0.5,
    color: theme.emerald,
    fontFamily: 'GemunuLibreMedium',
    letterSpacing: 1,
  },
});
