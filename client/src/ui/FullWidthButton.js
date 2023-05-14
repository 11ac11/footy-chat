import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from './theme';

export default function FullWidthButton({
  navigation,
  children,
  setItems,
  text,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        text == 'Leave'
          ? [
              {
                backgroundColor: pressed ? theme.gainsboro : theme.red,
              },
              styles.button,
            ]
          : [
              {
                backgroundColor: pressed ? theme.gainsboro : theme.emerald,
              },
              styles.button,
            ]
      }
      setItems={setItems}
    >
      <Text
        style={text == 'Leave' ? [styles.text, styles.blackish] : styles.text}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'GemunuLibreMedium',
    fontSize: 20,
  },
  onyx: {
    color: theme.blackish,
  },
});
