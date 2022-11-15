'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
