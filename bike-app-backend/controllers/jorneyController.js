const jorneyData = require('../models/journeyData');
const math = require('mathjs');
const moment = require('moment');
const statsCal = require('../utils/statsCal');
const { toDependencies } = require('mathjs');




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
        res.sendStatus(500).json({ messgae: "err..."})
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
        res.sendStatus(500).json({ message: "err in get...."})
    }
}
/// find departure stations data by station and calculate some stats ///
exports.getByDepartureStation = async ( req, res, next ) => {
    try {
        const stationToFind = req.query.name
        console.log(stationToFind)
        const fromDbByStation = await jorneyData.find({ DepartureStationName: stationToFind })
        const returnByStation = await jorneyData.find({  ReturnStationName: stationToFind })
      
        try {
            /// stats from departure station ///
            const meanDistance = math.mean(fromDbByStation.map(x => x['CoveredDistance']))
            const maxDistance = Math.max(...fromDbByStation.map(x => x['CoveredDistance']))

            const meanDuration = math.mean(fromDbByStation.map(x => x['Duration']))
            const maxDuration = Math.max(...fromDbByStation.map(x => x['Duration']))
     
            /// stations from return station /// 
            const returnMeanDistance = math.mean(returnByStation.map(x => x['CoveredDistance']))
            const returnMaxDistance = Math.max(...returnByStation.map(x => x['CoveredDistance']))

            const returnMeanDuration = math.mean(returnByStation.map(x => x['Duration']))
            const returnMaxDuration = Math.max(...returnByStation.map(x => x['Duration']))

            res.json({
                departureResults: fromDbByStation.length,
                departureMeanDistance: meanDistance / 1000,
                departureMaxDistance: maxDistance / 1000,
                departureMeanDuration: meanDuration / 60,
                departureMaxDuration: maxDuration / 60,
                departureMeanSpeed: (meanDistance / 1000) / (meanDuration / 3600),
                
                retrunResults: returnByStation.length,
                returnMeanDistance: returnMeanDistance / 1000,
                returnMaxDistance: returnMaxDistance / 1000,
                returnMeanDuration: returnMeanDuration / 60,
                returnMaxDuration: returnMaxDuration / 60,
                returnMeanSpeed: (returnMeanDistance / 1000) / (returnMeanDuration / 3600),

                data: fromDbByStation.slice(0, 50)
            })
            
        } catch(e) {
            res.json({
                results: fromDbByStation.length,
                meanDistance: 0,
                maxDistance: 0,
                meanDuration: 0,
                maxDuration: 0,
                meanSpeed: 0,
                data: fromDbByStation.slice(0, 50)
            })

        }

    } catch(e){
        res.sendStatus(500).json({ message: "error..."})
    }

}

/// find departure stations data by station and month then calculate some stats ///
exports.getByDepartureStationByMonth = async ( req, res, next ) => {
    try {
        const stationToFind = req.query.name
        const monthToFind = req.query.month
        const departureMonth = await jorneyData.find({ DepartureStationName: stationToFind })
        const fromDbByStation = departureMonth.filter(x => moment(x.Departure).format("M") == monthToFind)
        const returnMonth = await jorneyData.find({ ReturnStationName: stationToFind })
        const returnByStation = returnMonth.filter(x => moment(x.Return).format("M") == monthToFind)

        try {
            /// stats from departure station ///
            const meanDistance = math.mean(fromDbByStation.map(x => x['CoveredDistance']))
            const maxDistance = Math.max(...fromDbByStation.map(x => x['CoveredDistance']))

            const meanDuration = math.mean(fromDbByStation.map(x => x['Duration']))
            const maxDuration = Math.max(...fromDbByStation.map(x => x['Duration']))
     
            /// stations from return station /// 
            const returnMeanDistance = math.mean(returnByStation.map(x => x['CoveredDistance']))
            const returnMaxDistance = Math.max(...returnByStation.map(x => x['CoveredDistance']))

            const returnMeanDuration = math.mean(returnByStation.map(x => x['Duration']))
            const returnMaxDuration = Math.max(...returnByStation.map(x => x['Duration']))

            res.json({
                departureResults: fromDbByStation.length,
                departureMeanDistance: meanDistance / 1000,
                departureMaxDistance: maxDistance / 1000,
                departureMeanDuration: meanDuration / 60,
                departureMaxDuration: maxDuration / 60,
                departureMeanSpeed: (meanDistance / 1000) / (meanDuration / 3600),
                
                retrunResults: returnByStation.length,
                returnMeanDistance: returnMeanDistance / 1000,
                returnMaxDistance: returnMaxDistance / 1000,
                returnMeanDuration: returnMeanDuration / 60,
                returnMaxDuration: returnMaxDuration / 60,
                returnMeanSpeed: (returnMeanDistance / 1000) / (returnMeanDuration / 3600),

                data: fromDbByStation.slice(0, 50)
            })
        } catch(e) {
            res.json({
                results: fromDbByStation.length,
                meanDistance: 0,
                maxDistance: 0,
                meanDuration: 0,
                maxDuration: 0,
                meanSpeed: 0,
                data: fromDbByStation.slice(0, 50)
            })

        }
        
    } catch(e){
        res.sendStatus(500).json({ message: "error..."})
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
        res.sendStatus(500).jsone({ message: "error..."})
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
                { $match : { "month": 6 }},
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
                { $match : { "month": 6 }},     
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
        res.sendStatus(500)
    }
}

