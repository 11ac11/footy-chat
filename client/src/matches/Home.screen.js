import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchList } from './matchComponents/MatchList';
import { theme } from '../theme';
import FullWidthButton from '../components/FullWidthButton';

export const Home = ({ navigation, games, setGames }) => {
  return (
    <>
      <View style={styles.container}>
        <FullWidthButton
          text={'Add Match'}
          onPress={() => navigation.navigate('Create Match')}
          setGames={setGames}
          //navigation={navigation}
        />
        <MatchList navigation={navigation} games={games} />
      </View>
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
