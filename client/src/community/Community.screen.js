import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../ui/theme';
import FullWidthButton from '../ui/FullWidthButton';
import { FCList } from '../components/FCList';
import { FCListItem } from '../components/FCListItem';
import TeamCircleSplit from '../../assets/svgs/TeamCircleSplit';

export const Community = ({ navigation, communities, setCommunities }) => {
  const generalListItemProps = {
    navigation,
  };

  return (
    <View style={styles.container}>
      <FullWidthButton
        text={'Create new community'}
        onPress={() => navigation.navigate('Create Community')}
        setItems={setCommunities}
      />
      {communities && (
        <FCList
          data={communities}
          renderItem={({ item }) => (
            <FCListItem
              {...generalListItemProps}
              topText={item.name}
              bottomText={item.home_pitch}
              thirdText={''}
              date={item.date}
              time={item.date}
              key={item._id}
              _id={item._id}
              admin={item.admin}
              admin_name={item.admin_name}
              max_players={item.max_players}
              teams={item.teams}
              players={item.players}
              setCommunities={setCommunities}
              image={
                <TeamCircleSplit
                  color1={item.colours[0]}
                  color2={item.colours[1]}
                  size={35}
                />
              }
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
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
