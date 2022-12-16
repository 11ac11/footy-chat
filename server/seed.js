const mongoose = require('mongoose');
const Player = require('./models/playersModel');
const Games = require('./models/gamesModel');

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
  });

// 22 players
const seedPlayers = [
  {
    _id: '507f191e810c19729de860ea',
    email: 'demo@footychat.com',
    password: '$2b$10$GqdGL0LOh3/sWSxeFRuT1O7MGmTEldKM7ybfCcKjOn8yo.bHbHNcC',
    name: 'Demo User',
    position: 'striker',
    side: 'centre',
    foot: 'right',
    team: 'West Bromwich Albion',
    nationality: 'English',
  },
  {
    _id: '639c7c2c5e95505e76d0c487',
    email: 'est.mauris@aol.edu',
    password: 'GWH37NGT8AS',
    name: 'Paolo Maldini',
    position: 'defender',
    side: 'centre',
    foot: 'left',
    team: 'AC Milan',
    nationality: 'Italy',
  },
  {
    _id: '639c7c2c5e95505e76d0c488',
    email: 'nulla.magna.malesuada@aol.ca',
    password: 'JTC48QCN3GW',
    name: 'Zinedine Zidane',
    position: 'midfielder',
    side: 'centre',
    foot: 'left',
    team: 'Real Madrid',
    nationality: 'France',
  },
  {
    _id: '639c7c2c5e95505e76d0c489',
    email: 'lectus@protonmail.com',
    password: 'HBU92EBO2MU',
    name: 'Peter Schmeichel',
    position: 'GK',
    side: 'centre',
    foot: 'right',
    team: 'Manchester United',
    nationality: 'Denmark',
  },
  {
    _id: '639c7c2c5e95505e76d0c48a',
    email: 'curabitur.egestas.nunc@protonmail.edu',
    password: 'MPR10PAW8RU',
    name: 'Alessandro Nesta',
    position: 'defender',
    side: 'centre',
    foot: 'right',
    team: 'AC Milan',
    nationality: 'Italy',
  },
  {
    _id: '639c7c2c5e95505e76d0c48b',
    email: 'nisi.a@aol.net',
    password: 'KRQ53LWD2XN',
    name: 'Xavi',
    position: 'midfielder',
    side: 'centre',
    foot: 'both',
    team: 'Barcelona',
    nationality: 'Spain',
  },
  {
    _id: '639c7c2c5e95505e76d0c48c',
    email: 'aliquam@yahoo.com',
    password: 'ESX00SPR2KQ',
    name: 'Gianluigi Buffon',
    position: 'GK',
    side: 'right',
    foot: 'both',
    team: 'Juventus',
    nationality: 'Italy',
  },
  {
    _id: '639c7c2c5e95505e76d0c48d',
    email: 'nam.ligula.elit@icloud.org',
    password: 'IMZ84JKY6BW',
    name: 'Cafu',
    position: 'defender',
    side: 'both',
    foot: 'right',
    team: 'AC Milan',
    nationality: 'Brazil',
  },
  {
    _id: '639c7c2c5e95505e76d0c48e',
    email: 'nunc.id@hotmail.org',
    password: 'TYD08DOB4RU',
    name: 'Andres Iniesta',
    position: 'midfielder',
    side: 'centre',
    foot: 'left',
    team: 'Barcelona',
    nationality: 'Spain',
  },
  {
    _id: '639c7c2c5e95505e76d0c48f',
    email: 'vulputate.dui.nec@aol.org',
    password: 'SUY02VDQ2HR',
    name: 'Thierry Henry',
    position: 'striker',
    side: 'any',
    foot: 'right',
    team: 'Arsenal',
    nationality: 'France',
  },
  {
    _id: '639c7c2c5e95505e76d0c490',
    email: 'in.at@outlook.ca',
    password: 'CTJ90TFD3UL',
    name: 'Didier Drogba',
    position: 'striker',
    side: 'centre',
    foot: 'right',
    team: 'Chelsea',
    nationality: 'Ivory Coast',
  },
  {
    _id: '639c7c2c5e95505e76d0c491',
    email: 'sed.pharetra@outlook.edu',
    password: 'YXZ56FOY4ND',
    name: 'Andrea Pirlo',
    position: 'midfielder',
    side: 'left',
    foot: 'both',
    team: 'Juventus',
    nationality: 'Italy',
  },
  {
    _id: '639c7c2c5e95505e76d0c492',
    email: 'dictum.placerat@google.couk',
    password: 'JSP16WUG4WS',
    name: 'Ronaldo',
    position: 'striker',
    side: 'left',
    foot: 'both',
    team: 'Real Madrid',
    nationality: 'Brazil',
  },
  {
    _id: '639c7c2c5e95505e76d0c493',
    email: 'nunc.pulvinar@yahoo.couk',
    password: 'HPR13ITU9JP',
    name: 'Carles Puyol',
    position: 'defender',
    side: 'centre',
    foot: 'left',
    team: 'Barcelona',
    nationality: 'Spain',
  },
  {
    _id: '639c7c2c5e95505e76d0c494',
    email: 'morbi@hotmail.com',
    password: 'OVU85HBH2ZV',
    name: 'Luis Figo',
    position: 'midfielder',
    side: 'left',
    foot: 'left',
    team: 'Real Madrid',
    nationality: 'Portugal',
  },
  {
    _id: '639c7c2c5e95505e76d0c496',
    email: 'vel.pede.blandit@yahoo.org',
    password: 'DRP17AAQ2VB',
    name: 'Roberto Carlos',
    position: 'defender',
    side: 'left',
    foot: 'left',
    team: 'Real Madrid',
    nationality: 'Brazil',
  },
  {
    _id: '639c7c2c5e95505e76d0c497',
    email: 'quisque.libero@aol.ca',
    password: 'FOW65IYW2PU',
    name: 'David Beckham',
    position: 'midfielder',
    side: 'right',
    foot: 'right',
    team: 'Manchester United',
    nationality: 'England',
  },
  {
    _id: '639c7c2c5e95505e76d0c499',
    email: 'habitant@yahoo.ca',
    password: 'OCJ27INY6PZ',
    name: 'Nemanja Vidic',
    position: 'defender',
    side: 'centre',
    foot: 'left',
    team: 'Manchester United',
    nationality: 'Serbia',
  },
  {
    _id: '639c7c2c5e95505e76d0c49a',
    email: 'posuere.cubilia@icloud.net',
    password: 'BGV72HOX2VF',
    name: 'Ronaldinho',
    position: 'midfielder',
    side: 'any',
    foot: 'left',
    team: 'Barcelona',
    nationality: 'Brazil',
  },
  {
    _id: '639c7c2c5e95505e76d0c49c',
    email: 'pede@hotmail.net',
    password: 'VDI58NTF2HE',
    name: 'Rio Ferdinand',
    position: 'defender',
    side: 'centre',
    foot: 'right',
    team: 'Manchester United',
    nationality: 'England',
  },
  {
    _id: '639c7c2c5e95505e76d0c49d',
    email: 'suspendisse.non.leo@protonmail.net',
    password: 'FSQ15BOC3ZZ',
    name: 'Leo Messi',
    position: 'midfielder',
    side: 'any',
    foot: 'both',
    team: 'Barcelona',
    nationality: 'Argentina',
  },
  {
    _id: '639c7c2c5e95505e76d0c49e',
    email: 'nonummy.ultricies.ornare@yahoo.ca',
    password: 'PQS48UAA9VM',
    name: 'Cristiano Ronaldo',
    position: 'midfielder',
    side: 'any',
    foot: 'both',
    team: 'Real Madrid',
    nationality: 'Portugal',
  },
];

const date = new Date();
date.setDate(date.getDate() + 1);

const seedGame = [
  {
    description: 'Legends Game',
    date: date,
    location: 'Park Stadium',
    max_players: 11,
    teams: 2,
    admin: '507f191e810c19729de860ea',
    admin_name: 'Demo User',
    players: seedPlayers,
  },
];

const seedDB = async () => {
  await Player.deleteMany({});
  await Player.insertMany(seedPlayers);
  console.log('22 players have been added to DB!');
  await Games.deleteMany({});
  await Games.create(seedGame);
  console.log('Legends game has been seeded.');
};

seedDB().then(() => {
  mongoose.connection.close();
});
