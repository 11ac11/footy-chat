import connection_url from '../../connectionString';
const url = connection_url;

export const gameService = {
  postGame: async (game) => {
    try {
      const posted = await fetch(`${url}/games/new`, {
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
      const response = await fetch(`${url}/games`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: _GET_: ', error);
    }
  },
  getThisGame: async function (id) {
    try {
      const response = await fetch(`${url}/games/${id}`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: _GET_ONE_: ', error);
    }
  },
  deleteThisGame: async function (id) {
    try {
      const response = await fetch(`${url}/games/${id}/delete`, {
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
      const response = await fetch(`${url}/games/${data._id}/addPlayer`, {
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
      const response = await fetch(`${url}/games/${data._id}/removePlayer`, {
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
