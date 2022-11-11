const players = require('../models/playersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = 'not very secure key';

const getPlayers = async (ctx) => {
  try {
    ctx.body = await players.find({}); //change func names
    ctx.status = 200;
    console.log('GET players: successful.');
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const getThisPlayer = async (ctx) => {
  try {
    ctx.body = await players.findById(ctx.params.id);
    ctx.status = 200;
    console.log('GET THIS player: successful.', ctx.params.id);
    return ctx.body;
  } catch (error) {
    console.log('ERROR in getTHIS1 @ players controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const getPlayerByEmail = async (ctx) => {
  try {
    ctx.body = await players.findOne({ email: ctx.params.email });
    ctx.status = 200;
    console.log('GET player by email: successful.', ctx.params.email);
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get1 @ players controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const postPlayer = async (ctx) => {
  try {
    const { email, password, name, position, side, foot, nationality, team } =
      ctx.request.body;
    const existingUser = await players.findOne({ email: email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newPlayer = await players.create({
        email: email,
        password: hashedPassword,
        name: name,
        position: position,
        side: side,
        foot: foot,
        nationality: nationality,
        team: team,
      });
      ctx.status = 201;
      console.log(`Account for ${newPlayer.name} has been created`);
      ctx.body = JSON.stringify({ status: `created` });
    } else {
      ctx.body = JSON.stringify({ status: `exists` });
    }
  } catch (error) {
    console.log('ERROR in post @ controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const login = async (ctx) => {
  try {
    console.log('hitting login?');
    const { email, password } = ctx.request.body;
    const existingUser = await players.findOne({ email: email });
    if (!existingUser) {
      ctx.body = JSON.stringify({
        status: "Email doesn't exist",
        isLoggedIn: false,
      });
      return;
    }
    if (await bcrypt.compare(password, existingUser.password)) {
      console.log('hitting password?');
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1);

      const newSession = {
        expiresAt: expiry.valueOf(),
        userId: existingUser._id,
      };

      const token = jwt.sign(newSession, key);

      ctx.body = JSON.stringify({
        status: 'User logged in',
        isLoggedIn: true,
        token: token,
      });
    } else {
      ctx.body = JSON.stringify({
        status: 'Incorrect password',
        isLoggedIn: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getPlayers,
  getThisPlayer,
  getPlayerByEmail,
  postPlayer,
  login,
};
