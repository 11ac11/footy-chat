'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  max_players: {
    type: Number,
    required: true,
  },
  teams: {
    type: Number,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  players: {
    type: Array,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
