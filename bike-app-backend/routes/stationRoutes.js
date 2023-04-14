const express = require('express');
const stationController = require('../controllers/stationController');
const router = express.Router()

/// Show all stations from mongo ///
router.route("/all")
    .get(stationController.getStations)

module.exports = router;