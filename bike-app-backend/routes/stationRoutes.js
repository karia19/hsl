const express = require('express');
const stationController = require('../controllers/stationController');
const router = express.Router()

/// Show all stations from mongo ///
router.route("/")
    .get(stationController.getStations)

module.exports = router;