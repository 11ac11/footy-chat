import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import { MatchList } from './matchComponents/MatchList';
import { theme } from '../theme';
import { gameService } from '../services/gameService';

const image = {
  uri: 'https://images.unsplash.com/photo-1559019875-eaad55b75577?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
};

export const Home = ({ navigation, games, setGames }) => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Pressable
            onPress={() => navigation.navigate('Create Match')}
            setGames={setGames}
            navigation={navigation}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? theme.mediumGreen : theme.emerald,
              },
              styles.button,
            ]}
          >
            <Text>Add Match</Text>
          </Pressable>
          <MatchList navigation={navigation} games={games} />
        </ImageBackground>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },

  button: {
    height: 50,
    width: '100%',
    // marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
