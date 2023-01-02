const url = 'http://192.168.0.12:3000'; // http://<yourIP>:<port>

export const messageService = {
  postMessage: async (message) => {
    try {
      const posted = await fetch(`${url}/messages/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(message),
      });
      return await posted.json();
    } catch (error) {
      console.log('ERROR: messageService: _POST_: ', error);
    }
  },
  getMessages: async function () {
    try {
      const response = await fetch(`${url}/messages`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: messageService: _GET_: ', error);
    }
  },
  postMessageGroup: async (group) => {
    try {
      const posted = await fetch(`${url}/messages/group/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(group),
      });
      return await posted.json();
    } catch (error) {
      console.log('ERROR: messageService: _POST_: ', error);
    }
  },
  getMessageGroups: async function () {
    try {
      const response = await fetch(`${url}/messages/groups`);
      return await response.json();
    } catch (error) {
      console.log('ERROR: messageService: _GET_: ', error);
    }
  },
  addMessageToGroup: async function (data) {
    try {
      const response = await fetch(`${url}/messages/groups/${data._id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.log('ERROR: gameService: PUT addMessageToGroup: ', error);
    }
  },
};
