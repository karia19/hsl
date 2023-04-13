const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    FID: {type: String },
    ID:    {type: String},
    Nimi:   {type: String},
    Namn:   {type: String},
    Name:  {type: String},
    Osoite:  {type: String},
    Adress:       {type: String}, 
    Kaupunki:    {type: String}, 
    Stad:    {type: String},
    Operaattor:    {type: String},
    Kapasiteet:    {type: String}, 
    x:    {type: Number},
    y:    {type: Number},
})

const stations = mongoose.model('sations', stationSchema)
module.exports = stations;