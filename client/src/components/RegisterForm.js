import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

import { playerService } from '../services/playerService';
import { theme } from '../theme';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [selectedPosition, setPosition] = useState('');
  const [selectedFoot, setFoot] = useState('');
  const [selectedSide, setSide] = useState('');

  const position = [
    { value: 'defender' },
    { value: 'midfielder' },
    { value: 'striker' },
    { value: 'GK' },
    { value: 'outfield - no preference' },
  ];

  const foot = [{ value: 'right' }, { value: 'left' }, { value: 'both' }];

  const side = [{ value: 'right' }, { value: 'left' }, { value: 'both' }];

  function handlePress() {
    const newPlayer = {
      name: name,
      position: selectedPosition,
      side: selectedSide,
      foot: selectedFoot,
      nationality: 'British',
      team: 'PSG',
    };
    playerService.postPlayer(newPlayer);
    // .then((eventFromDB) => {
    //   setEvents((prevState) =>
    //     [eventFromDB, ...prevState].sort(
    //       (a, b) => new Date(a.date) - new Date(b.date)
    //     )
    //   );
    // })
    // .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        label="email"
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor={theme.onyx}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={pw}
        label="password"
        onChangeText={setPw}
        placeholder="Password"
        keyboardType="default"
        placeholderTextColor={theme.onyx}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        label="name"
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor={theme.onyx}
        keyboardType="default"
      />
      <Text style={styles.label}>Position</Text>
      <SelectList
        setSelected={setPosition}
        data={position}
        onSelect={() => setPosition(selectedPosition)}
        boxStyles={styles.picker}
        search={false}
        dropdownStyles={{ borderRadius: 30 }}
      />
      <Text style={styles.label}>Preferred Foot</Text>
      <SelectList
        setSelected={setFoot}
        data={foot}
        onSelect={() => setFoot(selectedFoot)}
        boxStyles={styles.picker}
        search={false}
        dropdownStyles={{ borderRadius: 30, height: 30 }}
      />
      <Text style={styles.label}>Preferred Side</Text>
      <SelectList
        setSelected={setSide}
        data={side}
        onSelect={() => setSide(selectedSide)}
        boxStyles={styles.picker}
        search={false}
        dropdownStyles={{ borderRadius: 30, height: 30 }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreBold',
    fontSize: 18,
    alignSelf: 'flex-start',
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    width: 300,
    color: theme.onyx,
    placeholderTextColor: 'red',
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
