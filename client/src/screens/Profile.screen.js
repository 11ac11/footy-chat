import { useState, useEffect, useContext } from 'react';
import { Text, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { playerService } from '../services/playerService';
import { UserContext } from '../../App';
import auth from '../../utils/auth';
//import { UserContext } from '../../userContext';

export const Profile = ({ setIsAuthenticated }) => {
  const profile = useContext(UserContext);

  const handlePress = async (e) => {
    const res = await playerService.logout();
    // if (res.isLoggedIn) {
    //   alert(res.status);
    // } else {
    // This sets isAuthenticated = true and redirects to profile
    setIsAuthenticated(false);
    //setUserEmail('');
    //auth.logout();
    // }
  };
  return profile.name ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile.email}</Text>
        <Text style={styles.label}>Position:</Text>
        <Text style={styles.value}>{profile.position}</Text>
        <Text style={styles.label}>Preferred Foot:</Text>
        <Text style={styles.value}>{profile.foot}</Text>
        <Text style={styles.label}>Preferred Side:</Text>
        <Text style={styles.value}>{profile.side}</Text>
        <Text style={styles.label}>Nationality:</Text>
        <Text style={styles.value}>{profile.nationality}</Text>
        <Text style={styles.label}>Team:</Text>
        <Text style={styles.value}>{profile.team}</Text>
      </View>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'white' : '#50C162',
          },
          styles.button,
        ]}
      >
        <Text>Logout</Text>
      </Pressable>
    </ScrollView>
  ) : (
    <>
      <View>
        <Text>loading</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    paddingTop: 30,
    paddingBottom: 10,
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreBold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 2,
  },
  value: {
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreLight',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
  },
  button: {
    height: 50,
    width: 300,
    marginVertical: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
