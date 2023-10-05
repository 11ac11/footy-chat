import React, { useState, useContext } from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserContext } from '../../App';
import { theme } from '../ui/theme';
import PrimaryButton from '../ui/PrimaryButton';
import { DropDown } from '../ui/DropDown';
import { Checkbox } from '../ui/Checkbox';
import { DropDownMulti } from '../ui/DropDownMulti';
import TeamCircleSplit from '../../assets/svgs/TeamCircleSplit';
import { communityService } from '../services/communityService';

export const CreateCommunity = ({ navigation, setCommunities }) => {
  const [name, setName] = useState('');
  const [homePitch, setHomePitch] = useState('');
  const [numberASide, setNumberASide] = useState('');
  const [isTeam, setIsTeam] = useState(false);
  const [daysPlayed, setDaysPlayed] = useState([]);
  const [colourOne, setColourOne] = useState(theme.blackish);
  const [colourTwo, setColourTwo] = useState(theme.white);

  const userProfile = useContext(UserContext);

  function handlePress() {
    const newCommunity = {
      name: name,
      home_pitch: homePitch,
      days: daysPlayed,
      max_players: numberASide,
      is_team: isTeam,
      creator: userProfile,
      admins: [userProfile],
      members: [userProfile],
      colours: [colourOne, colourTwo],
    };

    console.log(newCommunity);

    // HANDLE COMMUNITY
    communityService
      .postCommunity(newCommunity)
      .then((eventFromDB) => {
        setCommunities((prevState) =>
          [eventFromDB, ...prevState].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        );
      })
      .catch((error) => console.log(error));
    navigation.goBack();
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
        <Text style={styles.label}>Which day(s) do you play?</Text>
        <DropDownMulti
          selected={daysPlayed}
          setSelected={setDaysPlayed}
          data={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']}
          onSelect={() => {}}
        />
        <View style={styles.colourSelectionCont}>
          <View style={styles.colourSelectors}>
            <Text style={styles.label}>Colour 1?</Text>
            <DropDown
              selected={colourOne}
              setSelected={setColourOne}
              width={150}
              data={Object.values(theme)}
              onSelect={() => {}}
            />
            <Text style={styles.label}>Colour 2?</Text>
            <DropDown
              selected={colourTwo}
              setSelected={setColourTwo}
              width={150}
              data={Object.values(theme)}
              onSelect={() => {}}
            />
          </View>
          <View style={[styles.colourSelectors, styles.colourPreview]}>
            <TeamCircleSplit color1={colourOne} color2={colourTwo} size={150} />
          </View>
        </View>
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
    width: '100%',
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.blackish,
  },
  container: {
    padding: 20,
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
    width: '100%',
    color: theme.white,
  },
  colourSelectionCont: {
    height: '30%',
    minWidth: '100%',
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
  },
  colourSelectors: {
    height: '100%',
    width: '50%',
    minWidth: '50%',
    maxWidth: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  colourPreview: {
    paddingTop: 35,
    paddingLeft: 5,
    justifySelf: 'flex-end',
  },
});
