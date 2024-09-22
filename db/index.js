// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose')
require("dotenv").config();

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGO_URI;

const withDB = async serverListener => {
  try {
    const x = await mongoose.connect(MONGO_URI)
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    if (typeof serverListener === 'function') {
      serverListener()
    }
  } catch (error) {
    console.error('Error connecting to mongo: ', error)
  }
}

/* First we need to go to our DB, in my case MongoDB and open the shell:

// Then let's go to the folder of your database:
use name-of-your-db

// Erase your actual index, in case you have one already, otherwise skip this step
db.your_model_name.dropIndex({ property_name: 1 });

// You need to create a composed index to take into consideration both properties at the same time:
db.your_model_name.createIndex({ property_name: 1, property_name: 1 }, { unique: true });*/

module.exports = withDB