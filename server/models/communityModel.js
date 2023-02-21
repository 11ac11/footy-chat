'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  admins: {
    type: Array,
  },
  members: {
    type: Array,
    required: true,
  },
  games: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
  },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
