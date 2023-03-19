import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchList } from './matchComponents/MatchList';
import { FCList } from '../components/FCList';
import { FCListItem } from '../components/FCListItem';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';

export const Home = ({ navigation, games, setGames }) => {
  const generalListItemProps = {
    navigation: navigation,
    leftBoxDate: true,
    hasSmallImg: true,
    timeOnRight: true,
  };

  return (
    <View style={styles.container}>
      <FullWidthButton
        text={'Add Match'}
        onPress={() => navigation.navigate('Create Match')}
        setGames={setGames}
      />
      <MatchList navigation={navigation} games={games} />
      <FCList
        data={games}
        renderItem={({ item }) => (
          <FCListItem
            {...generalListItemProps}
            topText={item.description}
            bottomText={item.location}
            thirdText={'FC Real Love Inn'}
            date={item.date}
            time={item.date}
            key={item._id}
            _id={item._id}
            admin={item.admin}
            admin_name={item.admin_name}
            max_players={item.max_players}
            teams={item.teams}
            players={item.players}
            setGames={setGames}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
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
