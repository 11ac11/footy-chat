import React, { useState, useContext } from 'react';
import {
  Text,
  Modal,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserContext } from '../../../App';
import { gameService } from '../../services/gameService';
import { theme } from '../../ui/theme';
import PrimaryButton from '../../ui/PrimaryButton';

export const CreateCommunityModal = ({ navigation, setGames }) => {
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [selectedNumberTeams, setNumberTeams] = useState('');
  const numberOfTeams = [{ value: 1 }, { value: 2 }];

  const profile = useContext(UserContext);

  function handlePress() {
    const newCommunity = {
      description: description,
      location: location,
      max_players: maxPlayers,
      teams: selectedNumberTeams,
      admin: profile._id,
      admin_name: profile.name,
      players: [profile],
    };

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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        label="description"
        onChangeText={setDescription}
        placeholder="e.g. 'Sunday Kick-about'"
        maxLength={50}
        placeholderTextColor={theme.darkGrey}
      />
      <Text style={styles.label}>Home pitch</Text>
      <TextInput
        style={styles.input}
        value={location}
        label="location"
        onChangeText={setLocation}
        placeholder="Where's the game?"
        keyboardType="default"
        maxLength={50}
        placeholderTextColor={theme.darkGrey}
      />
      <Text style={styles.label}>Max. players per team</Text>
      <TextInput
        style={styles.input}
        value={maxPlayers}
        label="location"
        onChangeText={setMaxPlayers}
        placeholder="e.g. 14 - (remember to add subs here)"
        placeholderTextColor={theme.darkGrey}
        keyboardType="numeric"
        maxLength={2}
      />

      <Text style={styles.label}>Number of teams</Text>
      <SelectList
        setSelected={setNumberTeams}
        data={numberOfTeams}
        onSelect={() => setNumberTeams(selectedNumberTeams)}
        boxStyles={styles.picker}
        search={false}
        dropdownStyles={{
          borderRadius: 30,
          flexGrow: 0,
          borderColor: theme.darkGrey,
        }}
        inputStyles={{ color: theme.white }}
        dropdownTextStyles={{ color: theme.darkGrey }}
      />
      <PrimaryButton onPress={handlePress} text={'Save'} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    left: -20,
    width: '100%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.blackish,
  },
  modal: {
    left: 0,
  },
  h2: {
    fontSize: 20,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 40,
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
  dateTime: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: theme.darkGrey,
    padding: 10,
    borderRadius: 20,
    height: 50,
    width: 300,
    alignItems: 'center',
  },
});
