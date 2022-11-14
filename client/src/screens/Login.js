import React, { useState } from 'react';
import auth from '../../utils/auth';
import { playerService } from './../services/playerService';
import { TextInput } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {
  StyleSheet,
  View,
  useEffect,
  Text,
  ImageBackground,
} from 'react-native';
import { theme } from '../theme';
import PrimaryButton from '../components/PrimaryButton';

// const initialState = {
//   email: '',
//   password: '',
// };

const Login = ({
  setIsAuthenticated,
  isAuthenticated,
  navigation,
  setUserEmail,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    // Add logic to send a request to API service /login
    const { name, value } = e.target;

    const res = await playerService.login({ email, password });
    if (!res.isLoggedIn) {
      alert(res.status);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      setIsAuthenticated(true);
      setUserEmail(email);
      auth.login(() => {});
    }
  };

  // const validateForm = () => {
  //   return !state.email || !state.password;
  // };

  const image = {
    uri: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1338&q=80',
  };

  return (
    <View style={styles.login}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          type="text"
          placeholder="name@mail.com"
          name="email"
          //value={state.email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCorrect={false}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          type="password"
          placeholder="password"
          name="password"
          //value={state.password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCorrect={false}
        />
        <PrimaryButton onPress={handleSubmit} text={'Login'} />
        <PrimaryButton
          onPress={() => navigation.navigate('Create Account')}
          text={'Create Account'}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: theme.emerald,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    width: 300,
    color: theme.onyx,
    backgroundColor: theme.white,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 40,
    fontFamily: 'GemunuLibreBold',
    color: theme.white,
    fontSize: 18,
    alignSelf: 'flex-start',
    letterSpacing: 2,
  },
  login: {
    flex: 1,
    backgroundColor: theme.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
