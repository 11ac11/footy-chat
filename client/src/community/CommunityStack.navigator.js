import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../ui/theme';
import { Community } from './Community.screen';
import { CreateCommunity } from './NewCommunity.screen';
import { communityService } from '../services/communityService';

const Stack = createStackNavigator();

export const CommunityStack = ({ navigation }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCommunities() {
    try {
      setLoading(true);
      const communities = await communityService.getCommunities();
      console.log(communities);
      setCommunities(communities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Community"
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
      <Stack.Screen name="Community">
        {(props) => (
          <Community
            {...props}
            setCommunities={setCommunities}
            communities={communities}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Create Community">
        {(props) => (
          <CreateCommunity
            {...props}
            setCommunities={setCommunities}
            communities={communities}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
