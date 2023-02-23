import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export const Community = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Community</Text>
      <Text>This is community</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
