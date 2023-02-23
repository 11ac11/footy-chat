import { Text, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../ui/theme';
import { DropDown } from '../ui/DropDown';

export const ProfileDetailComponent = ({
  label,
  value,
  selectList = false,
}) => {
  let editMode = false;
  return (
    <View style={styles.oneLine}>
      <View style={styles.labelsBox}>
        <Text style={styles.label}>{label}</Text>
      </View>
      {!editMode ? (
        <Text style={styles.value}>{value}</Text>
      ) : selectList ? (
        <DropDown
          setSelected={() => {}}
          data={['test1', 'test2']}
          onSelect={() => {}}
          width={150}
        />
      ) : (
        <TextInput
          style={[styles.value, styles.edit]}
          value={value}
          label={label}
          onChangeText={() => {}}
          placeholder={value}
          placeholderTextColor={theme.onyx}
          keyboardType="email-address"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  oneLine: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  labelsBox: {
    width: '50%',
  },
  label: {
    fontFamily: 'GemunuLibreBold',
    fontSize: 16,
    textAlign: 'left',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
  value: {
    fontFamily: 'GemunuLibreLight',
    fontSize: 18,
    textAlign: 'left',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
  edit: {
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 2,
  },
});
