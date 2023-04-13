const express = require('express');
const cors = require('cors');
const jorneyRoutes = require('./routes/jorneyRoutes');
const mongoose = require('mongoose');
const mongoUri = `mongodb://karppa:karppa2023@0.0.0.0:27017?authSource=admin`

//console.log(mongoUri)

mongoose.connect(mongoUri,  {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection is working')
    })
    .catch((error) => {
        console.log('error hapened', error )
})


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({ message: "working node app"})
})

app.use("/api/v1/", jorneyRoutes)


const port = process.env.PORT || 3003
app.listen(port, () => console.log(`server is running ${port}`))
