// import { StyleSheet } from 'react-native';
// import { HomeIcon } from './Icons';

// export default function Loading() {
//   const spinAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

//   useEffect(() => {
//     Animated.timing(
//       spinAnim,
//       {
//         toValue: 1,
//         duration: 10000,
//       }
//     ).start();
//   }, [spinAnim])
//   return <HomeIcon color={color}/>;
// }

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableHighlight,
  Text,
} from 'react-native';
import { HomeIcon } from './Icons';

export const Loading = () => {
  let rotateValueHolder = new Animated.Value(0);

  rotateValueHolder.setValue(0);
  Animated.loop(
    Animated.timing(rotateValueHolder, {
      toValue: 360,
      duration: 200000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  ).start();

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Animated.Image
          style={{
            width: 20,
            height: 20,
            transform: [{ rotate: RotateData }],
          }}
          source={{ uri: 'https://i.postimg.cc/j5dwLFqk/loading-icon.png' }}
        />
      </View>
    </SafeAreaView>
  );
};
