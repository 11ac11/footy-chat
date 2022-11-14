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
import FullWidthButton from '../components/FullWidthButton';

export const Home = ({ navigation, games, setGames }) => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <FullWidthButton
          text={'Add Match'}
          onPress={() => navigation.navigate('Create Match')}
          setGames={setGames}
          //navigation={navigation}
        />
        <MatchList navigation={navigation} games={games} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.blackish,
  },
});
