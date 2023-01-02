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
import { theme } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

export const CreateMatchModal = ({ navigation, setGames }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [selectedNumberTeams, setNumberTeams] = useState('');
  const numberOfTeams = [{ value: 1 }, { value: 2 }];

  const profile = useContext(UserContext);

  function handlePress() {
    const newGame = {
      description: description,
      date: date,
      location: location,
      max_players: maxPlayers,
      teams: selectedNumberTeams,
      admin: profile._id,
      admin_name: profile.name,
      players: [profile],
    };

    gameService
      .postGame(newGame)
      .then((eventFromDB) => {
        setGames((prevState) =>
          [eventFromDB, ...prevState].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        );
      })
      .catch((error) => console.log(error));
    navigation.goBack();
  }

  // android and iOS issues with setShow false and !false
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(!false);
    }
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const roundToNextHour = (date) => {
    date.setMinutes(date.getMinutes() + 60);
    date.setMinutes(0, 0, 0);

    return date;
  };
  roundToNextHour(date);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.container, styles.modal]}>
          <View style={styles.container}>
            <Text style={{ color: theme.white }}>click me ↓</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                minuteInterval={15}
                textColor="white"
                accentColor={theme.emerald}
                themeVariant="dark"
              />
            )}
            <PrimaryButton
              onPress={showDatepicker}
              text={'Select date'}
              mainColor={theme.darkGrey}
            />
            <PrimaryButton
              onPress={showTimepicker}
              text={'Select time'}
              mainColor={theme.darkGrey}
            />

            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                color: theme.white,
                fontFamily: 'GemunuLibreMedium',
                textAlign: 'center',
              }}
            >
              selected:{'\n'}
              {Platform.OS === 'android'
                ? date.toLocaleString().slice(0, -8)
                : date.toLocaleString().slice(0, -3)}
            </Text>
            <PrimaryButton
              onPress={() => setModalVisible(!modalVisible)}
              text={'Confirm'}
            />
          </View>
        </View>
      </Modal>
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
      <Text style={styles.label}>Date</Text>
      <Pressable style={styles.dateTime} onPress={() => setModalVisible(true)}>
        <Text style={{ color: theme.white }}>
          {Platform.OS === 'android'
            ? date.toLocaleString().slice(0, -8)
            : date.toLocaleString().slice(0, -3)}
        </Text>
      </Pressable>
      <Text style={styles.label}>Location</Text>
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
