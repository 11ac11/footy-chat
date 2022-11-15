'use strict';

const mongoose = require('.');

const Schema = mongoose.Schema;

const messageGroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
});

const MessageGroups = mongoose.model('MessageGroups', messageGroupSchema);

module.exports = MessageGroups;
