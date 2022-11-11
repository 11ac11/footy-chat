'use strict';

const Router = require('koa-router');
const router = new Router();
//const messageCont = require('./controllers/messageCont');
const gamesCont = require('./controllers/gamesCont');
const playersCont = require('./controllers/playersCont');

router.get('/players', playersCont.getPlayers);
//router.get('/players/:id', playersCont.getThisPlayer);
router.get('/players/:email', playersCont.getPlayerByEmail);
router.post('/players', playersCont.postPlayer);
router.post('/login', playersCont.login);
router.get('/games', gamesCont.getGames);
router.get('/games/:id', gamesCont.getThisGame);
router.post('/games/new', gamesCont.postGame);

module.exports = router;
