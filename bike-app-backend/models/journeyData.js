const mongoose = require('mongoose');

const jorneySchema = new mongoose.Schema({
    Departure: {type: Date },
    Return:    {type: Date},
    DepartureStationId:   {type: Number},
    DepartureStationName:   {type: String},
    ReturnStationId:  {type: Number},
    ReturnStationName:  {type: String},
    CoveredDistance:       {type: Number}, 
    Duration:    {type: Number}, 
    
})

const jorney = mongoose.model('jorney', jorneySchema)
module.exports = jorney;
