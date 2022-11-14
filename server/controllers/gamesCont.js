const games = require('../models/gamesModel');

const getGames = async (ctx) => {
  try {
    const today = new Date();

    const filters = {
      date: { $gt: today },
    };

    ctx.body = await games.find({}).where(filters);
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
    const id = ctx.params.id;
    console.log('IN CONTROLLER ', id);
    ctx.body = await games.findById(id);
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

const deleteGame = async (ctx) => {
  try {
    const id = ctx.params.id;
    const postedGame = await games.deleteOne({ _id: id }); //change func names
    ctx.status = 201;
    console.log(`${ctx.params.id} has been deleted`);
    return (ctx.body = postedGame);
  } catch (error) {
    console.log('ERROR in deleteOne @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const addPlayerToGame = async (ctx) => {
  try {
    const id = ctx.params.id;
    const newPlayer = ctx.request.body;

    const game = await games.findOne({ _id: id });
    await game.update({ $push: { players: newPlayer } });
    console.log(`${newPlayer.name} has been added to game`);

    ctx.status = 201;
    return (ctx.body = newPlayer);
  } catch (error) {
    console.log('ERROR in addplayertogame @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};
const removePlayerFromGame = async (ctx) => {
  try {
    const id = ctx.params.id;
    const playerToRemove = ctx.request.body;

    const game = await games.findOne({ _id: id });
    await game.update({ $pull: { players: playerToRemove } });
    console.log(`${playerToRemove.name} has been remove from game`);

    ctx.status = 201;
    return (ctx.body = playerToRemove);
  } catch (error) {
    console.log('ERROR in addplayertogame @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

module.exports = {
  getGames,
  getThisGame,
  postGame,
  deleteGame,
  addPlayerToGame,
  removePlayerFromGame,
};
