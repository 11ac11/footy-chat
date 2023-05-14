import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from './theme';

export const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = () => {
    setChecked(!checked);
  };

  return (
    <TouchableOpacity onPress={handleCheckboxPress} style={styles.checkboxWrap}>
      {checked ? (
        <MaterialIcons name="check-box" size={24} color={theme.emerald} />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={24}
          color={theme.mediumGreen}
        />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxWrap: {
    marginTop: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    color: theme.gainsboro,
    paddingLeft: 10,
  },
});
