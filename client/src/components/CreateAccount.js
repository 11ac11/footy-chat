import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

import { playerService } from '../services/playerService';
import { theme } from '../theme';

export const CreateAccount = ({
  navigation,
  setIsAuthenticated,
  setUserEmail,
}) => {
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

  const handlePress = async (e) => {
    const newPlayer = {
      email: email,
      password: pw,
      name: name,
      position: selectedPosition,
      side: selectedSide,
      foot: selectedFoot,
      nationality: 'British',
      team: 'PSG',
    };
    const res = await playerService.postPlayer(newPlayer);
    if (res.status === 'exists') {
      alert('Email already exists, please use another email');
    } else {
      // This sets isAuthenticated = true and redirects to profile
      setIsAuthenticated(true);
      setUserEmail(email);
      auth.login(() => navigation.navigate('Matches'));
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closebtn} onPress={() => navigation.goBack()}>
        <Text>X</Text>
      </Pressable>
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
        <Text>Create Account</Text>
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
    justifyContent: 'center',
  },
  closebtn: {
    alignSelf: 'flex-end',
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
    color: theme.onyx,
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
