import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { theme } from '../theme';
import { Feather } from '@expo/vector-icons';

import ChatComponent from './Messaging.screen';

export const Messages = () => {
  //👇🏻 Dummy list of rooms
  const rooms = [
    {
      id: '1',
      name: 'Novu Hangouts',
      messages: [
        {
          id: '1a',
          text: 'Hello guys, welcome!',
          time: '07:50',
          user: 'Tomer',
        },
        {
          id: '1b',
          text: 'Hi Tomer, thank you! 😇',
          time: '08:50',
          user: 'David',
        },
      ],
    },
    {
      id: '2',
      name: 'Hacksquad Team 1',
      messages: [
        {
          id: '2a',
          text: "Guys, who's awake? 🙏🏽",
          time: '12:50',
          user: 'Team Leader',
        },
        {
          id: '2b',
          text: "What's up? 🧑🏻‍💻",
          time: '03:50',
          user: 'Victoria',
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => console.log('Button Pressed!')}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View>
            <Text>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <ScrollView contentContainerStyle={styles.convoListBox}>
//         <View style={styles.convoBox}>
//           <View style={styles.convoName}>
//             <Text style={[styles.text, styles.large]}>Convo name</Text>
//           </View>
//           <View style={styles.reply}>
//             <Text style={styles.text}>Reply</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </ScrollView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.blackish,
  },
  convoListBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  convoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convoName: {
    width: '75%',
  },
  reply: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.onyx,
    paddingVertical: 15,
    borderRadius: 20,
  },
  text: {
    marginHorizontal: 20,
    fontFamily: 'GemunuLibreLight',
    textAlign: 'left',
    letterSpacing: 2,
    color: theme.gainsboro,
  },
  large: {
    fontSize: 22,
  },
});
