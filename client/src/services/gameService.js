const url = 'http://192.168.0.12:3000/games';

// home: 192.168.0.12
// codeworks: 192.168.1.185

export const gameService = {
  postGame: async (game) => {
    try {
      const posted = await fetch(`${url}/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(game),
      });
      return await posted.json();
    } catch (error) {
      console.log('ERROR: gameService: _POST_: ', error);
    }
  },
  getGames: async function () {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: _GET_: ', error);
    }
  },
  getThisGame: async function (id) {
    console.log('IN SERVICE: ', id);
    try {
      const response = await fetch(`${url}/${id}`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: _GET_ONE_: ', error);
    }
  },
  deleteThisGame: async function (id) {
    try {
      const response = await fetch(`${url}/${id}/delete`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });
      return response;
    } catch (error) {
      console.log('ERROR: gameService: _DELETE_ONE_: ', error);
    }
  },
  addPlayerToGame: async function (data) {
    try {
      const response = await fetch(`${url}/${data._id}/addPlayer`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data.player),
      });
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: PUT addPlayerToGame: ', error);
    }
  },
  removePlayerFromGame: async function (data) {
    try {
      const response = await fetch(`${url}/${data._id}/removePlayer`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data.player),
      });
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: PUT addPlayerToGame: ', error);
    }
  },
  getTodayAsDate: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [year, month, day].join('-');
  },
};
