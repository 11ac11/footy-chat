import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../../App';
import { theme } from '../ui/theme';
import { Chat } from './Chat';
import io from 'socket.io-client';
import { Messaging } from './Messaging';

import socket from '../../utils/socket';

const Stack = createStackNavigator();

export const MessageStack = ({ navigation, setIsAuthenticated }) => {
  const profile = useContext(UserContext);
  return (
    <Stack.Navigator
      initialRouteName="Messages"
      screenOptions={{
        headerTitleStyle: { color: 'black' },
        headerTitleAlign: 'center',
        headerTintColor: theme.emerald,
        headerStyle: {
          backgroundColor: theme.blackish,
          borderBottomWidth: 0,
          shadowColor: 'transparent', // this covers iOS
          elevation: 0, // this covers Android
        },
        headerTitleStyle: {
          color: theme.gainsboro,
          fontFamily: 'GemunuLibreBold',
          letterSpacing: 1,
        },
      }}
    >
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Chats',
        }}
      />
      <Stack.Screen name="Messaging" component={Messaging} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
