const url = 'http://192.168.1.185:3000/games';

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
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: _GET_ONE_: ', error);
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
