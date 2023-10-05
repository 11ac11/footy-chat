'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  home_pitch: {
    type: String,
  },
  days: {
    type: String,
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
  },
  image: {
    type: String,
  },
  colours: {
    type: Array,
  },
  is_team: {
    type: Boolean,
  },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
