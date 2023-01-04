import { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { theme } from '../theme';

export const ProfileDetailComponent = ({ label, value }) => {
  return (
    <View style={styles.oneLine}>
      <View style={styles.labelsBox}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
