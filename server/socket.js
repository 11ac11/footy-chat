const io = require('./index.js');

io.on('connection', (socket) => {
  console.log('Someone connected', socket.id);

  socket.on('private message', (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit('private message', socket.id, msg);
  });

  socket.on('createRoom', async (roomName) => {
    socket.join(roomName);
    const response = await fetch('http://localhost:3000/messages/group/new', {
      body: JSON.stringify({ name: roomName, messages: [] }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    const parsedResponse = await response.json();
    socket.emit('roomsList', parsedResponse);
  });

  socket.on('findRoom', async (_id) => {
    console.log(_id);
    const response = await fetch('http://localhost:3000/messages/groups/');
    const result = await response.json();
    result.filter((room) => room._id == _id);
    socket.emit('foundRoom', result[0].messages);
  });

  socket.on('newMessage', async (data) => {
    //👇🏻 Destructures the property from the object
    const { room_id, message, user, timestamp } = data;
    console.log(user);

    //👇🏻 Finds the room where the message was sent
    const response = await fetch('http://localhost:3000/messages/groups/');
    let result = await response.json();
    result.filter((room) => room._id == room_id);

    //👇🏻 Create the data structure for the message
    const newMessage = {
      text: message,
      user: user,
      time: `${timestamp}`,
    };

    console.log(newMessage);
    //👇🏻 Updates the chatroom messages
    socket.to(result[0].name).emit('roomMessage', newMessage);
    result[0].messages.push(newMessage);

    //👇🏻 Trigger the events to reflect the new changes
    socket.emit('roomsList', result);
    socket.emit('foundRoom', result[0].messages);
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});

module.exports = socket;
