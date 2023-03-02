import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchList } from './matchComponents/MatchList';
import { List } from '../components/List';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';

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
        <List listData={games} leftBoxDate={false} />
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
