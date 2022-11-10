import { ScrollView, StyleSheet } from 'react-native';
import { RegisterForm } from '../components/RegisterForm';

export const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RegisterForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
