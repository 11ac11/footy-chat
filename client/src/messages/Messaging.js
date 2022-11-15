import React, { useLayoutEffect, useState, useContext, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import MessageComponent from './MessageComponent';
import { theme } from '../theme';
import socket from '../../utils/socket';
import { UserContext } from '../../App';

export const Messaging = ({ route, navigation }) => {
  const thisUser = useContext(UserContext);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const flatlistRef = useRef();

  const { name, _id } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });

    socket.emit('findRoom', _id);
    socket.on('foundRoom', (roomChats) => setChatMessages(roomChats));
  }, []);

  const handleNewMessage = () => {
    socket.emit('newMessage', {
      message,
      room_id: _id,
      user: thisUser.name,
      timestamp: new Date(),
    });
    setMessage('');
    flatlistRef.current.scrollToEnd({ animating: true });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 80 : -200}
      behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
    >
      <View
        style={[
          styles.messageListContainer,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            ref={flatlistRef}
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={thisUser} />
            )}
            keyExtractor={(item) => item._id}
            _id={_id}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
          autoCorrect={false}
          spellCheck={false}
          clearButtonMode="always"
          value={message}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text
              style={{
                color: theme.blackish,
                fontSize: 15,
                fontFamily: 'GemunuLibreBold',
              }}
            >
              SEND
            </Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.blackish,
  },
  messageListContainer: {
    backgroundColor: theme.blackish,
    marginBottom: 50,
  },
  messaginginputContainer: {
    position: 'relative',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    zIndex: 10,
    backgroundColor: theme.blackish,
  },
  messaginginput: {
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: theme.onyx,
    color: theme.gainsboro,
  },
  messagingbuttonContainer: {
    width: '30%',
    backgroundColor: theme.emerald,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
