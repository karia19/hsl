//const fs = require('fs');
const csv = require('csvtojson');
const jorney = require('./models/journeyData');
const mongoApp = require('./utils/mongoApp');
const stations = require('./models/stationsData');
/*

Read jorney csv files and drop some journeys that last less than ten seconds
and covered distances shorter than 10 meters. Then save results to mongo db, wich is in docker file 

*/

const readJorneyData = async (fileName) => {
    // Read data from csv's and validate data //
    try {
        const jsonArray= await csv({ headers: ['Departure','Return','DepartureStationId',
                'DepartureStationName', 'ReturnStationId', 'ReturnStationName', 'CoveredDistance', 'Duration'
                ]}).fromFile(fileName);
        
        const filteredData = jsonArray.filter(( x => Number(x['Duration']) >= 10 && Number(x['CoveredDistance']) > 10))
        //console.log(filteredData);
        const resFromSaveToMongo = await makeDatatoMongo(filteredData)
        
        if (resFromSaveToMongo == "ok"){
            console.log("jorney data is saved ....")
            mongoApp.MongoClose()
        }
    
    } catch(e){
        console.log(e)
    }
  
}

const readStationData = async (fileName) => {
    try {
        const jsonStation = await csv({ headers: ['FID','ID','Nimi','Namn','Name','Osoite','Adress','Kaupunki','Stad','Operaattor','Kapasiteet','x','y']
                }).fromFile(fileName)
        
        console.log(jsonStation)
        const saveStations = await stationsToMongo(jsonStation)
        if (saveStations == "ok"){
            console.log("station data is saved ....")
            mongoApp.MongoClose()
        }

    } catch(e){
        console.log("Error in read stattion data", e)
    }
}

/// Stations to mongo docker ///
const stationsToMongo = async (dataToMongo) => {
    mongoApp.MongoConnect()
    console.log("Stations size is", dataToMongo.length)
    try {
        for (let i = 0; i <= dataToMongo.length; i++){
            const resFromMongo = await stations.create(dataToMongo[i])
        }
        return "ok"
    } catch(e){
        console.log("error to station data....")
        mongoApp.MongoClose()
    }
}

//// Jorneys to mongo docker ///
const makeDatatoMongo = async (dataToMongo) => {   
    mongoApp.MongoConnect()
    console.log("Jorney size is", dataToMongo.length)
    try {
        for (let i = 0; i <= dataToMongo.length; i++){
            const resFromMongo = await jorney.create(dataToMongo[i])
            //console.log(resFromMongo)
        }
        mongoApp.MongoClose()
        return "ok"

    } catch (e) {
        console.log("error in saving data to mongodb", e)
    }

}

//readStationData('./csvFiles/stations.csv')
//readJorneyData('./csvFiles/2021-05.csv')
readJorneyData('./csvFiles/2021-06.csv')
//readJorneyData('./csvFiles/2021-07.csv')