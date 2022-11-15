'use strict';

const Router = require('koa-router');
const router = new Router();
const messageCont = require('./controllers/messageCont');
const gamesCont = require('./controllers/gamesCont');
const playersCont = require('./controllers/playersCont');

router.post('/login', playersCont.login);
router.get('/players', playersCont.getPlayers);
//router.get('/players/:id', playersCont.getThisPlayer);
router.get('/players/:email', playersCont.getPlayerByEmail);
router.post('/players', playersCont.postPlayer);

router.get('/games', gamesCont.getGames);
router.get('/games/:id', gamesCont.getThisGame);
router.post('/games/new', gamesCont.postGame);
router.put('/games/:id/addPlayer', gamesCont.addPlayerToGame);
router.put('/games/:id/removePlayer', gamesCont.removePlayerFromGame);
router.delete('/games/:id/delete', gamesCont.deleteGame);

router.post('/messages/new', messageCont.postMessage);
router.get('/messages/', messageCont.getMessages);
router.get('/messages/groups', messageCont.getMessageGroups);
router.put('/messages/groups/:id', messageCont.addMessageToGroup);
router.get('/messages/groups/:id', messageCont.getMessageGroupById);
router.post('/messages/group/new', messageCont.postMessageGroup);

module.exports = router;
