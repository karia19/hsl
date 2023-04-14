const jorneyData = require('../models/journeyData');
const math = require('mathjs')

exports.getAll = async (req, res, next) => {
    try {
        
        const jorneyDataFromDatabase = await jorneyData.find()
        console.log(jorneyDataFromDatabase)
        
        res.json({
            results: jorneyDataFromDatabase.length,
            data: jorneyDataFromDatabase
        })
        


    } catch(e){
        res.sendStatus(400).json({ messgae: "err..."})
    }
}
/// get fifty jorney using query parametters ( pagnation ) ///
exports.getFifty = async (req, res, next) => {
    try{
        const page = req.query.page
        console.log(page)
        const resultLen = 50
        const jorneyFifty = await jorneyData.find()
                .skip(resultLen * page)
                .limit(resultLen)

        //console.log(jorneyFifty)

        res.json({
            results: jorneyFifty.length,
            data: jorneyFifty
        })

    } catch(e){
        res.sendStatus(400).json({ message: "err in get...."})
    }
}
/// find departure stations data by station and calculate some stats ///
exports.getByDepartureStation = async ( req, res, next ) => {
    try {
        const stationToFind = req.body.station
        console.log(stationToFind)
        const fromDbByStation = await jorneyData.find({ DepartureStationName: stationToFind })
        
        const meanDistance = math.mean(fromDbByStation.map(x => x['CoveredDistance']))
        const maxDistance = Math.max(...fromDbByStation.map(x => x['CoveredDistance']))

        const meanDuration = math.mean(fromDbByStation.map(x => x['Duration']))
        const maxDuration = Math.max(...fromDbByStation.map(x => x['Duration']))

        
        res.json({
            results: fromDbByStation.length,
            meanDistance: meanDistance / 1000,
            maxDistance: maxDistance / 1000,
            meanDuration: meanDuration / 60,
            maxDuration: maxDuration / 60,
            meanSpeed: (meanDistance / 1000) / (meanDuration / 3600),
            data: fromDbByStation
        })


    } catch(e){
        res.sendStatus(400).json({ message: "error..."})
    }

}
/// get 50 longest distance ///
exports.getLongestDistance = async (req, res, next) => {
    try {
        const longest = await jorneyData.find()
            .sort({ CoveredDistance: -1 })
            .limit(50)

        res.json({
            data: longest
        })

    } catch(e){
        res.sendStatus(400).json({ message: "error..."})
    }
}
/// get fifty longest duration ///
exports.getLongestDuration = async (req, res, next) => {
    try {
        const longest = await jorneyData.find()
            .sort({ Duration: -1 })
            .limit(50)

        res.json({
            data: longest
        })

    } catch(e) {
        res.sendStatus(400).jsone({ message: "error..."})
    }
}




