import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import DownChevron from '../../assets/svgs/DownChevron';
import { theme } from './theme';

export const DropDown = ({
  setSelected,
  data,
  onSelect,
  placeholder = 'Please select',
  width,
}) => {
  const [hasSelected, setHasSelected] = useState(false);

  const textStyle = hasSelected
    ? styles.inputStyleSelected
    : styles.inputStylePlaceholder;

  const onSelectDropDown = () => {
    onSelect();
    setHasSelected(true);
  };

  return (
    <SelectList
      setSelected={setSelected}
      data={data}
      onSelect={onSelectDropDown}
      boxStyles={[styles.picker, { width: width ? width : 300 }]}
      search={false}
      dropdownStyles={styles.dropdownStyles}
      inputStyles={textStyle}
      dropdownTextStyles={{ color: theme.gainsboro }}
      placeholder={placeholder}
      arrowicon={<DownChevron color={theme.gainsboro} />}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: theme.darkGrey,
    padding: 10,
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
  },
  dropdownStyles: {
    borderRadius: 30,
    flexGrow: 0,
    borderColor: theme.darkGrey,
    color: theme.gainsboro,
  },
  inputStylePlaceholder: {
    color: theme.darkGrey,
  },
  inputStyleSelected: {
    color: theme.gainsboro,
  },
});
