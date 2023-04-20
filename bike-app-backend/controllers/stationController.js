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

    } catch(e){
        res.semd(500)
    }
}