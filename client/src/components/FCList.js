import { View, StyleSheet, FlatList } from 'react-native';

export const FCList = ({ data, renderItem }) => {
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
});
