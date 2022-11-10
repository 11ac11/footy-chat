const url = 'http://192.168.1.185:3000/players';

export const playerService = {
  postPlayer: async (player) => {
    try {
      const posted = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(player),
      });
      return await posted.json();
    } catch (error) {
      console.log('ERROR: playerService: _POST_: ', error);
    }
  },
  getPlayers: async function () {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log('ERROR: playerService: _GET_: ', error);
    }
  },
};
