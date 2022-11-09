const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(
    `mongodb+srv://${process.env.URL}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log(`Mongoose is connected to ${process.env.DBNAME}`)
  );
} catch (e) {
  console.log('could not connect');
}

module.exports = mongoose;
