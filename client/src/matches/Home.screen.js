import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchList } from './matchComponents/MatchList';
import { FCList } from '../components/FCList';
import { FCListItem } from '../components/FCListItem';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';
import TeamCircleSplit from '../../assets/svgs/TeamCircleSplit';

export const Home = ({ navigation, games, setGames }) => {
  const navigateToGame = () => {
    console.log('naving');
    navigation.navigate('Match Details', {
      _id: _id,
      location: location,
      date: date,
      admin: admin,
      description: description,
      date: date,
      max_players: max_players,
      players: players,
      teams,
      games,
      setGames,
    });
  };
  const generalListItemProps = {
    navigation,
    leftBoxDate: true,
    hasSmallImg: true,
    timeOnRight: true,
  };

  return (
    <View style={styles.container}>
      <FullWidthButton
        text={'Add Match'}
        onPress={() => navigation.navigate('Create Match')}
        setItems={setGames}
      />
      <FCList
        data={games}
        renderItem={({ item }) => (
          <FCListItem
            {...generalListItemProps}
            topText={item.description}
            bottomText={`@ ${item.location}`}
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
            image={
              <TeamCircleSplit
                color1={'#EE4B2B'}
                color2={'#EE4B2B'}
                size={35}
              />
            }
            onPress={() =>
              navigation.navigate('Match Details', {
                _id: item._id,
                location: item.location,
                date: item.date,
                admin: item.admin,
                description: item.description,
                date: item.date,
                max_players: item.max_players,
                players: item.players,
                teams: item.teams,
                games,
              })
            }
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
