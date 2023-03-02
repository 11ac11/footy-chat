import { Item } from './ListItem';
import { View, StyleSheet, FlatList } from 'react-native';

export const List = ({ listData, listItemProps, leftBoxDate }) => {
  console.log('this is listdata', ...listData);
  console.log(leftBoxDate);

  const itemProps = {
    leftBoxDate: true,
    hasSmallImg: true,
    hasTime: true,
    topText: 'this is top text',
    bottomText: 'this is bottom text',
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={(item) => <Item {...itemProps} leftBoxDate />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
});
