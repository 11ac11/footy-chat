import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Messages } from './Messages.screen';
import { Teams } from './Teams.screen';
import { MatchStack } from '../matches/MatchStack.navigator';
import {
  HomeIcon,
  ProfileIcon,
  TeamIcon,
  MessageIcon,
} from '../components/Icons';
import { ProfileStack } from './ProfileStack.navigator';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator = ({ setIsAuthenticated }) => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.nav,
        tabBarActiveTintColor: theme.white,
        tabBarInactiveTintColor: theme.emerald,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'MatchStack') {
            return <HomeIcon color={color} size={size} />;
          } else if (route.name === 'ProfileStack') {
            return <ProfileIcon color={color} size={size} />;
          }
          // else if (route.name === 'Teams') {
          //   return <TeamIcon color={color} size={size} />;
          else if (route.name === 'Messages') {
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

      {/* <BottomTabs.Screen
        name="Teams"
        component={Teams}
        style={styles.container}
      /> */}
      <BottomTabs.Screen
        name="Messages"
        component={Messages}
        style={styles.container}
      />
    </BottomTabs.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    backgroundColor: theme.mediumGreen,
    flex: 0.1,
  },
});

// https://reactnavigation.org/docs/bottom-tab-navigator
