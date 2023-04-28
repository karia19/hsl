const stationData = require('../models/stationsData')



exports.getStations = async (req, res, next) => {
    try {
        
        const stationsFromDatabase = await stationData.find()
        console.log(stationsFromDatabase)
        
        res.json({
            results: stationsFromDatabase.length,
            data: stationsFromDatabase
        })
        


    } catch(e){
        res.sendStatus(500).json({ messgae: "err..."})
    }
}

exports.stationByName = async (req, res, next) => {
    try {
        const station = req.body.name
        const stationFromDatabase = await stationData.find({
            Name: station
        })
        res.json({
            data: stationFromDatabase
        })

    } catch(e){
        res.semd(500)
    }
}