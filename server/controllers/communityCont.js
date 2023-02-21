const community = require('../models/communityModel');

const getCommunities = async (ctx) => {
  try {
    ctx.body = await community.find({});
    ctx.status = 200;
    console.log('GET community: successful.');
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ community controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const getThisCommunity = async (ctx) => {
  try {
    const id = ctx.params.id;
    ctx.body = await community.findById(id);
    ctx.status = 200;
    console.log('GET community: successful.', id);
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ community controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const postCommunity = async (ctx) => {
  try {
    const postedCommunity = await community.create(ctx.request.body); //change func names
    ctx.status = 201;
    console.log(`${postedCommunity.description} has been posted`);
    return (ctx.body = postedCommunity);
  } catch (error) {
    console.log('ERROR in post @ community controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const deleteCommunity = async (ctx) => {
  try {
    const id = ctx.params.id;
    const postedCommunity = await community.deleteOne({ _id: id }); //change func names
    ctx.status = 201;
    console.log(`${ctx.params.id} has been deleted`);
    return (ctx.body = postedCommunity);
  } catch (error) {
    console.log('ERROR in deleteOne @ community controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const addPlayerToCommunity = async (ctx) => {
  try {
    const id = ctx.params.id;
    const newPlayer = ctx.request.body;

    const community = await community.findOne({ _id: id });
    await community.update({ $push: { players: newPlayer } });
    console.log(`${newPlayer.name} has been added to community`);

    ctx.status = 201;
    return (ctx.body = newPlayer);
  } catch (error) {
    console.log('ERROR in addplayertocommunity @ community controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};
const removePlayerFromCommunity = async (ctx) => {
  try {
    const id = ctx.params.id;
    const playerToRemove = ctx.request.body;

    const community = await community.findOne({ _id: id });
    await community.update({ $pull: { players: playerToRemove } });
    console.log(`${playerToRemove.name} has been remove from community`);

    ctx.status = 201;
    return (ctx.body = playerToRemove);
  } catch (error) {
    console.log('ERROR in addplayertocommunity @ community controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

module.exports = {
  getCommunities,
  getThisCommunity,
  postCommunity,
  deleteCommunity,
  addPlayerToCommunity,
  removePlayerFromCommunity,
};
