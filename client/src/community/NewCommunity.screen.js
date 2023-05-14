import React, { useState, useContext } from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserContext } from '../../App';
import { theme } from '../ui/theme';
import PrimaryButton from '../ui/PrimaryButton';
import { DropDown } from '../ui/DropDown';
import { Checkbox } from '../ui/Checkbox';

export const CreateCommunity = ({ navigation }) => {
  const [name, setName] = useState('');
  const [homePitch, setHomePitch] = useState('');
  const [numberASide, setNumberASide] = useState('');
  const [isTeam, setIsTeam] = useState(false);

  const userProfile = useContext(UserContext);

  function handlePress() {
    const newCommunity = {
      name: name,
      home_pitch: homePitch,
      //days: days,
      max_players: numberASide,
      isTeam: isTeam,
      creator: userProfile,
      admins: [userProfile],
      members: [userProfile],
    };

    console.log(newCommunity);

    // HANDLE COMMUNITY
    // gameService
    //   .postGame(newGame)
    //   .then((eventFromDB) => {
    //     setGames((prevState) =>
    //       [eventFromDB, ...prevState].sort(
    //         (a, b) => new Date(a.date) - new Date(b.date)
    //       )
    //     );
    //   })
    //   .catch((error) => console.log(error));
    // navigation.goBack();
  }

  return (
    <View style={styles.bg}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          label="Name"
          onChangeText={setName}
          placeholder="World XI"
          maxLength={50}
          placeholderTextColor={theme.darkGrey}
        />
        <Text style={styles.label}>Home pitch</Text>
        <TextInput
          style={styles.input}
          value={homePitch}
          label="Home Pitch"
          onChangeText={setHomePitch}
          placeholder="Green Park"
          keyboardType="default"
          maxLength={50}
          placeholderTextColor={theme.darkGrey}
        />

        <Text style={styles.label}>How many starting players?</Text>
        <DropDown
          setSelected={setNumberASide}
          data={[
            '5-a-side',
            '6-a-side',
            '7-a-side',
            '8-a-side',
            '9-a-side',
            '10-a-side',
            '11-a-side',
          ]}
          onSelect={() => console.log('done')}
        />
        <Checkbox
          label={'This community is a team'}
          checked={isTeam}
          setChecked={setIsTeam}
        />
        <PrimaryButton onPress={handlePress} text={'Save'} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.blackish,
  },
  container: {
    flexGrow: 1,
    padding: 0,
    width: '100%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.blackish,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 10,
    fontFamily: 'GemunuLibreBold',
    fontSize: 16,
    alignSelf: 'flex-start',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    width: 300,
    color: theme.white,
  },
});
