const messages = require('../models/messageModel');
const messageGroups = require('../models/messageGroupsModel');

const getMessages = async (ctx) => {
  try {
    ctx.body = await messages.find({});
    ctx.status = 200;
    console.log('GET messages: successful.');
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ messages controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const getMessageGroups = async (ctx) => {
  try {
    ctx.body = await messageGroups.find({});
    ctx.status = 200;
    console.log('GET message Groups: successful.');
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ messages controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const getMessageGroupById = async (ctx) => {
  try {
    const id = ctx.params.id;
    console.log('IN CONTROLLER ', id);
    ctx.body = await messageGroups.findById(id);
    ctx.status = 200;
    console.log('GET game: successful.', ctx.params.id);
    return ctx.body;
  } catch (error) {
    console.log('ERROR in get @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const postMessage = async (ctx) => {
  try {
    const postedMessage = await messages.create(ctx.request.body); //change func names
    ctx.status = 201;
    console.log(`${postedMessage.text} has been posted`);
    return (ctx.body = postedMessage);
  } catch (error) {
    console.log('ERROR in post @ messages controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const postMessageGroup = async (ctx) => {
  try {
    console.log(ctx.request.body);
    const postedGroup = await messageGroups.create(ctx.request.body); //change func names
    ctx.status = 201;
    console.log(`${postedGroup.name} has been posted`);
    return (ctx.body = postedGroup);
  } catch (error) {
    console.log('ERROR in post @ messages controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

const addMessageToGroup = async (ctx) => {
  try {
    const id = ctx.params.id;
    const message = ctx.request.body;

    const group = await messageGroups.findOne({ _id: id });

    await group.update({ $push: { messages: message } });
    console.log(`Messaged added`);

    ctx.status = 201;
    return (ctx.body = message);
  } catch (error) {
    console.log('ERROR in addplayertogame @ games controller', error);
    ctx.body = error;
    ctx.status = 500;
  }
};

module.exports = {
  getMessages,
  getMessageGroups,
  postMessage,
  postMessageGroup,
  getMessageGroupById,
  addMessageToGroup,
};
