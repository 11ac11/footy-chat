import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MatchStack } from '../matches/MatchStack.navigator';
import {
  HomeIcon,
  ProfileIcon,
  TeamIcon,
  MessageIcon,
} from '../components/Icons';
import { ProfileStack } from './../profile/ProfileStack.navigator';
import { theme } from '../theme';
import { MessageStack } from '../messages/MessageStack.navigator';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator = ({ setIsAuthenticated }) => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.nav,
        tabBarActiveTintColor: theme.emerald,
        tabBarInactiveTintColor: theme.onyx,
        tabBarShowLabel: false,
        borderTopWidth: 0,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'MatchStack') {
            return <HomeIcon color={color} size={size} />;
          } else if (route.name === 'ProfileStack') {
            return <ProfileIcon color={color} size={size} />;
          }
          // else if (route.name === 'Teams') {
          //   return <TeamIcon color={color} size={size} />;
          else if (route.name === 'MessageStack') {
            return <MessageIcon color={color} size={size} />;
          }
          return null;
        },
      })}
    >
      <BottomTabs.Screen
        name="MatchStack"
        component={MatchStack}
        style={styles.container}
      />
      <BottomTabs.Screen name="ProfileStack" style={styles.container}>
        {(props) => (
          <ProfileStack {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </BottomTabs.Screen>
      <BottomTabs.Screen name="MessageStack" style={styles.container}>
        {(props) => (
          <MessageStack {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    backgroundColor: theme.blackish,
    flex: 0.1,
    borderTopWidth: 0,
  },
});

// https://reactnavigation.org/docs/bottom-tab-navigator
