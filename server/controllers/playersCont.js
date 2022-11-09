const players = require('../models/playersModel');

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

const postPlayer = async (ctx) => {
  try {
    const postedPlayer = await players.create(ctx.request.body); //change func names
    ctx.status = 201;
    console.log(`${postedPlayer.name} has been posted`);
    ctx.body = postedPlayer;
  } catch (error) {
    console.log('ERROR in post @ controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

module.exports = { getPlayers, postPlayer };
