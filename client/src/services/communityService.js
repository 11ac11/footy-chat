import connection_url from '../../connectionString';
const url = connection_url;

export const communityService = {
  postCommunity: async (game) => {
    try {
      const posted = await fetch(`${url}/community/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(game),
      });
      return await posted.json();
    } catch (error) {
      console.log('ERROR: communityService: _POST_: ', error);
    }
  },
  getCommunities: async function () {
    try {
      const response = await fetch(`${url}/community/all`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: communityService: _GET_: ', error);
    }
  },
  getThisCommunity: async function (id) {
    try {
      const response = await fetch(`${url}/community/${id}`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: communityService: _GET_ONE_: ', error);
    }
  },
  deleteThisCommunity: async function (id) {
    try {
      const response = await fetch(`${url}/community/${id}/delete`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });
      return response;
    } catch (error) {
      console.log('ERROR: communityService: _DELETE_ONE_: ', error);
    }
  },
  addPlayerToCommunity: async function (data) {
    try {
      const response = await fetch(`${url}/community/${data._id}/addPlayer`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data.player),
      });
      return await response.json();
    } catch (error) {
      console.log('ERROR: communityService: PUT addPlayerToGame: ', error);
    }
  },
  removePlayerFromCommunity: async function (data) {
    try {
      const response = await fetch(
        `${url}/community/${data._id}/removePlayer`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data.player),
        }
      );
      return await response.json();
    } catch (error) {
      console.log('ERROR: communityService: PUT addPlayerToGame: ', error);
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
