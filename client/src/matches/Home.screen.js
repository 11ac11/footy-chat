import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MatchList } from './matchComponents/MatchList';
import { List } from '../components/List';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';
import { Item } from './../components/ListItem';

export const Home = ({ navigation, games, setGames }) => {
  const generalListItemProps = {
    leftBoxDate: true,
    hasSmallImg: true,
    timeOnRight: true,
    hasTime: true,
  };

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
        <List
          data={games}
          renderItem={({ item }) => (
            <Item
              {...generalListItemProps}
              topText={item.description}
              bottomText={item.location}
              thirdText={'FC Real Love Inn'}
              date={item.date}
              time={item.date}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.blackish,
  },
});
