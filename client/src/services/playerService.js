const url = 'http://192.168.0.12:3000';
const headers = { 'content-type': 'application/json' };
import AsyncStorage from '@react-native-async-storage/async-storage';

// home: 192.168.0.12
// codeworks: 192.168.1.185

export const playerService = {
  postPlayer: async (player) => {
    try {
      const posted = await fetch(`${url}/players`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(player),
      });
      return await posted.json();
    } catch (error) {
      console.log('ERROR: playerService: _POST_: ', error);
    }
  },
  getPlayers: async function () {
    try {
      const response = await fetch(`${url}/players`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: playerService: _GET_: ', error);
    }
  },
  // getThisPlayer: async function (id) {
  //   try {
  //     const response = await fetch(`${url}/players/${id}`);
  //     return await response.json();
  //   } catch (error) {
  //     console.log('ERROR: gameService: _GET_ONE_: ', error);
  //   }
  // },
  getPlayerByEmail: async function (email) {
    try {
      const response = await fetch(`${url}/players/${email}`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: _GET_ONE_: ', error);
    }
  },
  login: async function (user) {
    console.log('User in login service : ', user);
    try {
      const res = await fetch(`${url}/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user),
        credentials: 'include',
      });
      const json = await res.json();

      AsyncStorage.setItem('accessToken', json.token);

      return json;
    } catch (error) {
      console.log('ERROR: playerService: _POST_ Login: ', error);
    }
  },
  profile: async function (accessToken) {
    const res = await fetch(`${url}/profile`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
  },

  logout: () => {
    AsyncStorage.removeItem('accessToken');
  },
};
