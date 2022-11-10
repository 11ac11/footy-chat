import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export const Teams = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Teams</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
