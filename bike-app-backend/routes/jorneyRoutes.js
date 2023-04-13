const express = require('express');
const jorneyController = require('../controllers/jorneyController');
const router = express.Router()

/// Show all  data from mongo, very slow not in use ///
router.route("/all")
    .get(jorneyController.getAll)
    
/// Show only fifty jorneys ///
router.route("/fifty")
    .get(jorneyController.getFifty)

/// Find by station name ///
router.route("/:station")
    .post(jorneyController.getByDepartureStation)

module.exports = router;