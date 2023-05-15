const mongoose = require('mongoose');
require('dotenv').config()


// Mongo uri in Docker //
const monog_url = "mongodb://karppa:karppa2023@mongo:27017?authSource=admin"
const mongoUri = process.env.MONGO_URL // Replace with your mongo uri    


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
