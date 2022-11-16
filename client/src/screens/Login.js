import React, { useState } from 'react';
import auth from '../../utils/auth';
import { playerService } from './../services/playerService';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { theme } from '../theme';
import PrimaryButton from '../components/PrimaryButton';

const Login = ({ setIsAuthenticated, navigation, setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    const { name, value } = e.target;

    const res = await playerService.login({ email, password });
    if (!res.isLoggedIn) {
      alert(res.status);
    } else {
      setIsAuthenticated(true);
      setUserEmail(email);
      auth.login(() => {});
    }
  };

  return (
    <View style={styles.login}>
      <ImageBackground
        source={require('../../assets/HomeWPBW500x3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          type="text"
          placeholder="name@mail.com"
          name="email"
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
