const mongoose = require('mongoose');
require('dotenv').config()


const pass = process.env.MONGO_PASSWORD
const user = process.env.MONGO_USER
const mongoUri = `mongodb://${user}:${pass}@0.0.0.0:27017?authSource=admin`

// Connect mongo docker //

async function MongoConnect(){
      
    if (mongoose.connection.readyState >= 1){
        console.log("Connection is on")
        return
    }

    return mongoose.connect(mongoUri, {useNewUrlParser: true })
       .then(() => {
          console.log('connection is working')
       })
       .catch((error) => {
          console.log('error hapened', error )
       })
    }

async function MongoClose(){
    mongoose.connection.close()
    console.log("connection is closed")
}
    
module.exports = {MongoClose, MongoConnect};