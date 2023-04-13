const jorneyData = require('../models/journeyData');


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
exports.getFifty = async (req, res, next) => {
    try{
        const page = req.query.page
        console.log(page)
        const resultLen = 50
        const jorneyFifty = await jorneyData.find()
                .sort()
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
exports.getByDepartureStation = async ( req, res, next ) => {
    try {
        const stationToFind = req.body.station
        console.log(stationToFind)
        const fromDbByStation = await jorneyData.find({ DepartureStationName: stationToFind })
        res.json({
            results: fromDbByStation.length,
            data: fromDbByStation
        })


    } catch(e){

    }

}

