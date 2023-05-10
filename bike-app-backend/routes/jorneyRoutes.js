const express = require('express');
const jorneyController = require('../controllers/jorneyController');
const router = express.Router()

/// Show all  data from mongo, very slow not in use ///
router.route("/all")
    .get(jorneyController.getAll)

/// Show only fifty jorneys and pagnation in pages ///
router.route("/fifty")
    .get(jorneyController.getFifty)
/// Find by station name ///
router.route("/station")
    .get(jorneyController.getByDepartureStation)
/// Find longest distance shows 50  ///
router.route("/longestDistance")
    .get(jorneyController.getLongestDistance)
/// Find longest dusration shows 50 ////
router.route("/longestDuration")
    .get(jorneyController.getLongestDuration)
/// Find five popular departure stations ///
router.route("/fivePopularStations/")
    .post(jorneyController.fivePopularStation)


module.exports = router;
