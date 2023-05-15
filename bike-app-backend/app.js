const express = require('express');
const cors = require('cors');
const jorneyRoutes = require('./routes/jorneyRoutes');
const stationsRoutes = require('./routes/stationRoutes');
const storeRoures = require('./routes/storeNewRoutes');
const mongoApp = require('./utils/mongoApp');

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


module.exports = app;