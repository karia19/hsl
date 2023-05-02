const jorneyData = require('../models/journeyData');
const statiosData = require('../models/stationsData');


/// Endpoints to store new journeys and delte ...  ///
exports.addJorney = async (req, res, next) => {  
    try {
        const result = await jorneyData.create(req.body);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
} 
exports.getJorney = async (req, res, next) => {
    try {
        const result = await jorneyData.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.json({ message: "nod data"});
    }
}
exports.deleteJorney = async (req, res, next) => {
    try {
        const result = await jorneyData.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.json({ message: "nod data"});
    }
}

/// Endpoints to store new stations and delte ...  ///
exports.addStation = async (req, res, next) => {
    try {
        const result = await statiosData.create(req.body);
        res.send(result);
    } catch (error) {
        res.send(error);

    }   
}
exports.getStation = async (req, res, next) => {
    try {
        const result = await statiosData.findById(req.params.id);
        res.send(result);
    
    }  catch (error) {  
        res.json({ message: "nod data"});
    }
}
exports.deleteStation = async (req, res, next) => { 
    try {
        const result = await statiosData.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.json({ message: "nod data"});
    }
}
