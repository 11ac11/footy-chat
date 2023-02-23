import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { theme } from '../ui/theme';
import { UserContext } from '../../App';
import Moment from 'moment';

export default function MessageComponent({ item }) {
  const thisUser = useContext(UserContext);

  const status = item.user !== thisUser.name;

  return (
    <View style={styles.screenCont}>
      <View
        style={
          status
            ? styles.messageContainer
            : [styles.messageContainer, { alignItems: 'flex-end' }]
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={
              status
                ? styles.message
                : [styles.message, { backgroundColor: theme.emerald }]
            }
          >
            <Text
              style={
                status
                  ? styles.messagesUser
                  : [styles.messagesUser, { top: -20 }]
              }
            >
              {status ? item.user : 'You'}
            </Text>
            <Text
              style={
                status
                  ? styles.messagesText
                  : [styles.messagesText, { color: theme.onyx }]
              }
            >
              {item.text}
            </Text>
          </View>
        </View>
        <Text
          style={
            status
              ? styles.messagesTime
              : [styles.messagesTime, { color: theme.emerald }]
          }
        >
          {Moment(item.time).format('HH:mm')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenCont: {
    marginTop: 20,
  },
  messageContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  message: {
    minWidth: '35%',
    maxWidth: '50%',
    backgroundColor: theme.onyx,
    marginLeft: 5,
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  messagesUser: {
    alignItems: 'flex-start',
    color: theme.darkGrey,
    fontFamily: 'GemunuLibreMedium',
    position: 'absolute',
    left: 10,
    top: -20,
    letterSpacing: 2,
    fontSize: 16,
    borderRadius: 20,
  },
  messagesText: {
    color: theme.gainsboro,
    fontFamily: 'GemunuLibreMedium',
    fontSize: 16,
    letterSpacing: 1,
    color: theme.gainsboro,
  },
  messagesTime: {
    marginLeft: 5,
    color: theme.white,
    fontFamily: 'GemunuLibreBold',
    letterSpacing: 1,
    opacity: 0.5,
    fontSize: 10,
  },
});
