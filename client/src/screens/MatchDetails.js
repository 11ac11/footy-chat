import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import Moment from 'moment';

export default function MatchDetails({ navigation, route }) {
  const { _id, location, description, date } = route.params;
  return (
    <View style={styles.container}>
      <Text>
        {description} {'\n'}
        {location} {Moment(date).format('ddd Do MMM - HH:mm')}
      </Text>
    </View>
  );
}
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
