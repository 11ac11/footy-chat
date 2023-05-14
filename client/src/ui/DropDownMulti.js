import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import DownChevron from '../../assets/svgs/DownChevron';
import { theme } from './theme';

export const DropDownMulti = ({
  selected,
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
    <MultipleSelectList
      setSelected={(val) => setSelected([...selected, val])}
      data={data}
      onSelect={onSelectDropDown}
      save="value"
      boxStyles={[styles.picker, { width: width ? width : 300 }]}
      search={false}
      dropdownStyles={styles.dropdownStyles}
      inputStyles={textStyle}
      dropdownTextStyles={{ color: theme.gainsboro }}
      placeholder={placeholder}
      arrowicon={<DownChevron color={theme.gainsboro} />}
      checkBoxStyles={styles.checkBoxStyles}
      badgeStyles={styles.badgeStyles}
      badgeTextStyles={styles.badgeTextStyles}
      labelStyles={styles.labelStyles}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: theme.darkGrey,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  dropdownStyles: {
    maxHeight: 300,
    width: 300,
    maxWidth: 300,
    borderRadius: 20,
    flexGrow: 1,
    padding: 0,
    borderColor: theme.darkGrey,
    color: theme.gainsboro,
  },
  inputStylePlaceholder: {
    color: theme.darkGrey,
  },
  inputStyleSelected: {
    color: theme.gainsboro,
  },
  checkBoxStyles: {
    backgroundColor: theme.mediumGreen,
    borderColor: theme.mediumGreen,
  },
  badgeStyles: {
    backgroundColor: theme.mediumGreen,
    margin: 0,
    width: 65,
    height: 25,
    alignItems: 'center',
  },
  badgeTextStyles: {
    color: theme.blackish,
    fontFamily: 'GemunuLibreBold',
  },
  labelStyles: {
    display: 'none',
  },
});
