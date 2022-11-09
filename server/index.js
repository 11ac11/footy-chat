'use strict';

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
require('dotenv').config();

const app = new Koa();
app.use(cors());

app.use(bodyParser());
app.use(router.routes());
const PORT = process.env.DEV_PORT | 3000;

app.listen(PORT, (err) => {
  if (err) console.log('Problem on index with app.listen');
  else console.log(`Server running at http://localhost:${PORT}`);
});
