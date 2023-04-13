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
router.route("/:station")
    .post(jorneyController.getByDepartureStation)

router.route("/longestDistance")
    .get(jorneyController.getLongestDistance)

router.route("/longestDuration")
    .get(jorneyController.getLongestDuration)


module.exports = router;