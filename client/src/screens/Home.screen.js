import React from 'react';
import { ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import MatchList from '../components/MatchList';
import { CreateMatchModal } from '../components/CreateMatchModal';
import { theme } from '../theme';

export const Home = ({ navigation }) => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable
          onPress={() => navigation.navigate('Create Match')}
          navigation={navigation}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? theme.mediumGreen : theme.emerald,
            },
            styles.button,
          ]}
        >
          <Text>Add Match</Text>
        </Pressable>
        <MatchList navigation={navigation} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
