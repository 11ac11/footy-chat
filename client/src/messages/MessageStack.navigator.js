import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../../App';
import { theme } from '../theme';
import { Profile } from '../profile/Profile.screen';
import { Messages } from './Messages.screen';

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
      <Stack.Screen name="Messages">
        {(props) => (
          <Messages {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Messaging">
        {(props) => (
          <Messaging {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
