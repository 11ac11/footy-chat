import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from './theme';

export default function PrimaryButton({
  navigation,
  children,
  setGames,
  text,
  onPress,
  mainColor,
  pressedColor,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        text == 'Create Account'
          ? [
              {
                backgroundColor: pressed
                  ? pressedColor || theme.gainsboro
                  : mainColor || theme.white,
              },
              styles.button,
              { marginTop: 200 },
            ]
          : [
              {
                backgroundColor: pressed
                  ? pressedColor || theme.gainsboro
                  : mainColor || theme.emerald,
              },
              styles.button,
            ]
      }
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 300,
    marginVertical: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'GemunuLibreMedium',
    fontSize: 20,
  },
});
