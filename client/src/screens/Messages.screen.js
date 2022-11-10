import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export const Messages = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Messages</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
