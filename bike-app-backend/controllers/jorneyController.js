const jorneyData = require('../models/journeyData');
const math = require('mathjs');
const statCalculator = require('../utils/statCalculator');

/// get jorney by id ///


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
        const station = req.query.station
        console.log(page, station)
        const resultLen = 50
        const jorneyFifty = await jorneyData.find({ DepartureStationName: station})
                .skip((resultLen * page) - resultLen)
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
/// find departure stations data by station and calculate some stats by month if moth is over 12 return all data by station ///
exports.getByDepartureStation = async ( req, res, next ) => {
    try {
        const stationToFind = req.query.name
        const month = Number(req.query.month)
        if (month <= 12){
                const fromDbByStation = await jorneyData.aggregate([
                    // Find stations  and month //
                    { $match: { DepartureStationName: stationToFind}},   
                    { $addFields: { month: { "$month": {$toDate: "$Departure"}}},},
                    { $match : { "month": month }},
                
                ])
                const returnByStation = await jorneyData.aggregate([
                    // Find stations and month //
                    { $match: { ReturnStationName: stationToFind}},
                    { $addFields: { month: { "$month": {$toDate: "$Departure"}}},},
                    { $match : { "month": month }},     
                ])
                const modData = statCalculator.convert(fromDbByStation, returnByStation)                
                res.json(modData)
        } else {
                const fromDbByStation = await jorneyData.aggregate([{ $match: { DepartureStationName: stationToFind}},])
                const returnByStation = await jorneyData.aggregate([{ $match: { ReturnStationName: stationToFind}},])
                const modData = statCalculator.convert(fromDbByStation, returnByStation)
                
                res.json(modData)

        }

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
/// Top 5 most popular return stations and departure statons for month if month number is 
/// over 12 return all data and stats 
exports.fivePopularStation = async ( req, res, next ) => {
    try {
        const stationToFind = req.body.name
        const monthToFind = Number(req.body.month)
        if (monthToFind <= 12){
            const topDepartureStations = await jorneyData.aggregate([        
                // Find stations  and month //
                { $match: { DepartureStationName: stationToFind}},
                { $addFields: { month: { "$month": {$toDate: "$Departure"}}},},
                { $match : { "month": monthToFind }},
                // Goup by staion name and all station travels //
                { $group : { _id : "$ReturnStationName", stations: { $push: "$$ROOT" } }},
                // Stations tarvels //
                { $addFields:{ totalDepartures : { $size: "$stations" } }},
                // Sort totalDepartures //
                { $sort: { totalDepartures: -1 }},
                { $limit : 5 }

            ])
            const topReturnStations = await jorneyData.aggregate([
                // Find stations and month //
                { $match: { ReturnStationName: stationToFind} },
                { $addFields: { month: { "$month": {$toDate: "$Departure"}}},},
                { $match : { "month": monthToFind }},     
                // Goup by staion name and all station travels //
                { $group : { _id : "$DepartureStationName", 
                        stations: { $push: "$$ROOT" }}},
                // Stations tarvels //
                { $addFields:
                     { totalDepartures : { $size: "$stations" }}},
                // Sort totalRetruns //
                { $sort: { totalDepartures: -1 }},
                { $limit: 5}
                ])
                
                res.json({
                    departureStation: topDepartureStations.map(x => (
                        {
                            station: x['_id'],
                            jorneyTotal: x['totalDepartures'],                   
                        }
                    )),
                    retrunSatation: topReturnStations.map(x => (
                        {
                            station: x['_id'],
                            jorneyTotal: x['totalDepartures'],
                        }
                    )),
                    
                })
        } else {
            const topDepartureStations = await jorneyData.aggregate([        
                // Find stations  and month //
                { $match: { DepartureStationName: stationToFind}},
                // Goup by staion name and all station travels //
                { $group : { _id : "$ReturnStationName", stations: { $push: "$$ROOT" } }},
                // Stations tarvels //
                { $addFields:{ totalDepartures : { $size: "$stations" } }},
                // Sort totalDepartures //
                { $sort: { totalDepartures: -1 }},
                { $limit : 5 }

            ])
            const topReturnStations = await jorneyData.aggregate([
                // Find stations and month //
                { $match: { ReturnStationName: stationToFind} },     
                // Goup by staion name and all station travels //
                { $group : { _id : "$DepartureStationName", 
                        stations: { $push: "$$ROOT" }}},
                // Stations tarvels //
                { $addFields:
                     { totalDepartures : { $size: "$stations" }}},
                // Sort totalRetruns //
                { $sort: { totalDepartures: -1 }},
                { $limit: 5}
                ])
                
                res.json({
                    departureStation: topDepartureStations.map(x => (
                        {
                            station: x['_id'],
                            jorneyTotal: x['totalDepartures'],
                        }
                    )),
                    retrunSatation: topReturnStations.map(x => (
                        {
                            station: x['_id'],
                            jorneyTotal: x['totalDepartures'],
                        }
                    )),  
                })
        }       
    } catch(e){
        res.sendStatus(400)
    }
}

