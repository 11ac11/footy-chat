const mongoose = require('mongoose');
const Player = require('./models/playersModel');
const Games = require('./models/gamesModel');
const data = require('./seedData');

mongoose
  .connect(`mongodb+srv://${process.env.URL}2`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo connection open');
  })
  .catch((err) => {
    console.log(err);
    [];
  });

const seedDB = async () => {
  await Player.deleteMany({});
  await Player.insertMany(data.seedPlayers);
  console.log('22 players have been added to DB!');
  await Games.deleteMany({});
  await Games.create(data.seedGame);
  console.log('Legends game has been seeded.');
};

seedDB().then(() => {
  mongoose.connection.close();
});
