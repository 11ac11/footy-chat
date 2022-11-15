'use strict';
require('dotenv').config();
const fetch = require('node-fetch');

const Koa = require('koa');
const { createServer } = require('http');
const { Server } = require('socket.io');

const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  /* options */
});

app.use(cors());
app.use(bodyParser());

const generateID = () => Math.random().toString(36).substring(2, 10);

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
    const response = await fetch(
      `http://localhost:3000/messages/groups/${_id}`
    );
    const result = await response.json();

    socket.emit('foundRoom', result.messages);
  });

  socket.on('newMessage', async (data) => {
    const { room_id, message, user } = data;

    const groupsRes = await fetch('http://localhost:3000/messages/groups/');
    let result = await groupsRes.json();

    const filterRes = result.filter((room) => room._id == room_id);

    const newMessage = {
      _id: generateID(),
      text: message,
      user: user,
      time: new Date(),
    };

    const response = await fetch(
      `http://localhost:3000/messages/groups/${room_id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newMessage),
      }
    );
    const parsedResponse = await response.json();
    socket.to(filterRes[0].name).emit('roomMessage', parsedResponse);
    filterRes[0].messages.push(parsedResponse);

    // MIGHT NEED TO CHEC THE RESULT VAR BELOW
    socket.emit('roomsListUpdate', result);
    socket.emit('foundRoom', filterRes[0].messages);
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});

app.use(router.routes());
const PORT = process.env.DEV_PORT || 3000;

httpServer.listen(PORT, (err) => {
  if (err) console.log('Problem on index with app.listen');
  else console.log(`Server running at http://localhost:${PORT}`);
});
