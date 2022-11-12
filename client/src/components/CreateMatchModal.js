import React, { useState, useContext } from 'react';
import {
  Text,
  Modal,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserContext } from '../../App';

import { gameService } from '../services/gameService';
import { theme } from '../theme';

export const CreateMatchModal = ({ navigation }) => {
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
  const today = gameService.getTodayAsDate();

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

    gameService.postGame(newGame);
    // need to add push to matchlist here
    navigation.goBack();
  }

  // android and iOS issues with setShow false and !false
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(!false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>click me ↓</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                minuteInterval={15}
              />
            )}
            <Pressable
              onPress={showDatepicker}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'white' : 'lightgrey',
                },
                styles.button,
              ]}
            >
              <View style={styles.button}>
                <Text>Select date</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={showTimepicker}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'white' : 'lightgrey',
                },
                styles.button,
              ]}
            >
              <View style={styles.button}>
                <Text>Select time</Text>
              </View>
            </Pressable>

            <Text style={{ fontSize: 20, marginTop: 20 }}>
              selected:{' '}
              {Platform.OS === 'android'
                ? date.toLocaleString().slice(0, -8)
                : date.toLocaleString().slice(0, -3)}
            </Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgrey' : '#50C162',
                },
                styles.button,
              ]}
            >
              <View style={styles.button}>
                <Text style={{ alignItems: 'flex-end' }}>Confirm</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        label="description"
        onChangeText={setDescription}
        placeholder="e.g.'Sunday Kick-about'"
        maxLength={50}
      />
      <Text style={styles.label}>Date</Text>
      <Pressable style={styles.dateTime} onPress={() => setModalVisible(true)}>
        <Text>
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
      />
      <Text style={styles.label}>Max. players per team</Text>
      <TextInput
        style={styles.input}
        value={maxPlayers}
        label="location"
        onChangeText={setMaxPlayers}
        placeholder="e.g. 14 - (remember to add subs here)"
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
          borderColor: theme.onyx,
        }}
        inputStyles={{ color: theme.onyx }}
        dropdownTextStyles={{ color: theme.onyx }}
      />
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'white' : '#50C162',
          },
          styles.button,
        ]}
      >
        <Text>Save</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h2: {
    fontSize: 20,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreBold',
    fontSize: 16,
    alignSelf: 'flex-start',
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    width: 300,
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
    borderColor: '#666',
    padding: 10,
    borderRadius: 20,
    height: 50,
    width: 300,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 300,
    color: 'white',
    marginVertical: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
