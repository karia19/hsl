const express = require('express');
const cors = require('cors');
const jorneyRoutes = require('./routes/jorneyRoutes');
const stationsRoutes = require('./routes/stationRoutes');
const storeRoures = require('./routes/storeNewRoutes');
const mongoose = require('mongoose');
const mongoApp = require('./utils/mongoApp');

const mongoUri = `mongodb://karppa:karppa2023@0.0.0.0:27017?authSource=admin`

//console.log(mongoUri)

/// CONNECT TO MONGO DOCKER ///
/*
mongoose.connect(mongoUri,  {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection is working')
    })
    .catch((error) => {
        console.log('error hapened', error )
})
*/
mongoApp.MongoConnect()


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({ message: "working node app"})
})

/// ROUTES TO REST API ///
app.use("/api/v1/jorneys/", jorneyRoutes);
app.use("/api/v1/stations/", stationsRoutes);
app.use("/api/v1/store/", storeRoures);


const port = process.env.PORT || 3003
app.listen(port, () => console.log(`server is running ${port}`))
