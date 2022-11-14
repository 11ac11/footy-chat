'use strict';

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
require('dotenv').config();

const app = new Koa();
const http = require('http').Server(app);

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '<http://localhost:3000>',
  },
});

app.use(cors());

app.use(bodyParser());
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});
app.use(router.routes());
const PORT = process.env.DEV_PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log('Problem on index with app.listen');
  else console.log(`Server running at http://localhost:${PORT}`);
});
