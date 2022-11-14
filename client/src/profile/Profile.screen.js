import { useState, useEffect, useContext } from 'react';
import { Text, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { playerService } from '../services/playerService';
import { UserContext } from '../../App';

import { theme } from '../theme';
import FullWidthButton from '../components/FullWidthButton';
//import { UserContext } from '../../userContext';

export const Profile = ({ setIsAuthenticated }) => {
  const profile = useContext(UserContext);

  const handlePress = async (e) => {
    const res = await playerService.logout();
    setIsAuthenticated(false);
  };
  return profile.name ? (
    <ScrollView contentContainerStyle={styles.container}>
      <FullWidthButton onPress={handlePress} text={'Logout'} />
      <View style={styles.infoContainer}>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Email:</Text>
          </View>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Name:</Text>
          </View>
          <Text style={styles.value}>{profile.name}</Text>
        </View>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Position:</Text>
          </View>
          <Text style={styles.value}>{profile.position}</Text>
        </View>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Preferred Foot:</Text>
          </View>
          <Text style={styles.value}>{profile.foot}</Text>
        </View>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Preferred Side:</Text>
          </View>
          <Text style={styles.value}>{profile.side}</Text>
        </View>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Nationality:</Text>
          </View>
          <Text style={styles.value}>{profile.nationality}</Text>
        </View>
        <View style={styles.oneLine}>
          <View style={styles.labelsBox}>
            <Text style={styles.label}>Team:</Text>
          </View>
          <Text style={styles.value}>{profile.team}</Text>
        </View>
      </View>
    </ScrollView>
  ) : (
    <>
      <View
        style={{
          backgroundColor: theme.blackish,
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: theme.darkGrey }}>loading...</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.blackish,
  },
  infoContainer: {
    marginTop: 10,
  },
  oneLine: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  labelsBox: {
    width: '55%',
  },
  label: {
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreBold',
    fontSize: 16,
    textAlign: 'left',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
  value: {
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreLight',
    fontSize: 18,
    textAlign: 'left',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
});
