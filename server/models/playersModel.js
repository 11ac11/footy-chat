'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  foot: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  games_played: {
    type: Number,
    default: 0,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
