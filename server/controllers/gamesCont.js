const games = require('../models/gamesModel');

const getGames = async (ctx) => {
  try {
    ctx.body = await games.find({}); //change func names
    ctx.status = 200;
    console.log('GET games: successful.');
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const getThisGame = async (ctx) => {
  try {
    ctx.body = await games.findById(ctx.params.id);
    ctx.status = 200;
    console.log('GET game: successful.', ctx.params.id);
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const postGame = async (ctx) => {
  try {
    const postedGame = await games.create(ctx.request.body); //change func names
    ctx.status = 201;
    console.log(`${postedGame.description} has been posted`);
    return (ctx.body = postedGame);
  } catch (error) {
    console.log('ERROR in post @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

module.exports = { getGames, getThisGame, postGame };
