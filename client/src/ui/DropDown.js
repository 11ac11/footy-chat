import { StyleSheet } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { theme } from './theme';

export const DropDown = ({ setSelected, data, onSelect, width }) => {
  return (
    <SelectList
      setSelected={setSelected}
      data={data}
      onSelect={onSelect}
      boxStyles={[styles.picker, { width: width ? width : 300 }]}
      search={false}
      dropdownStyles={styles.dropdownStyles}
      inputStyles={{ color: theme.onyx }}
      dropdownTextStyles={{ color: theme.onyx }}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
    borderRadius: 20,
    height: 50,
    // width: 300,
    alignItems: 'center',
  },
  dropdownStyles: {
    borderRadius: 30,
    flexGrow: 0,
    borderColor: theme.onyx,
  },
});
