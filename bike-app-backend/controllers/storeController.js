const jorneyData = require('../models/journeyData');
const statiosData = require('../models/stationsData');


/* Endpoints to store new journeys and delte ...  */

/// Add new jorney ///
exports.addJorney = async (req, res, next) => {  
    try {
        const result = await jorneyData.create(req.body);
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
} 
/// Get jorney by id  ///
exports.getJorney = async (req, res, next) => {
    try {
        const result = await jorneyData.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: "no data find"});
    }
}
/// Delete jorney by id  ///
exports.deleteJorney = async (req, res, next) => {
    try {
        const result = await jorneyData.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: "no  journey to delete. Check again ...."});
    }
}

/* Endpoints to store new stations and delte ...  */

/// Add new station ///
exports.addStation = async (req, res, next) => {
    try {
        const result = await statiosData.create(req.body);
        res.send(result);
    } catch (error) {
        res.status(400).send(error);

    }   
}
/// Get station by id  ///
exports.getStation = async (req, res, next) => {
    try {
        const result = await statiosData.findById(req.params.id);
        res.send(result);
    
    }  catch (error) {  
        res.status(400).json({ message: "no data find"});
    }
}
/// Delete station by id  ///     
exports.deleteStation = async (req, res, next) => { 
    try {
        const result = await statiosData.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: "no station to delete. Check again ...."});
    }
}
