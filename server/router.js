'use strict';

const Router = require('koa-router');
const router = new Router();
//const messageCont = require('./controllers/messageCont');
const gamesCont = require('./controllers/gamesCont');
const playersCont = require('./controllers/playersCont');

router.get('/players', playersCont.getPlayers);
router.post('/players', playersCont.postPlayer);
router.get('/games', gamesCont.getGames);
router.get('/games/:id', gamesCont.getThisGame);
router.post('/games/new', gamesCont.postGame);

module.exports = router;
