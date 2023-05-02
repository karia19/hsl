const express = require('express'); 
const storeNewData = require('../controllers/storeController');

const router = express.Router();

router.route('/jorney')
    .post(storeNewData.addJorney);
    
router.route('/jorney/:id')
    .get(storeNewData.getJorney)
    //.patch(storeNewData.updateJorney)
    .delete(storeNewData.deleteJorney);

router.route('/station')
    .post(storeNewData.addStation);

router.route('/station/:id')
    .get(storeNewData.getStation)
    //.patch(storeNewData.updateStation)
    .delete(storeNewData.deleteStation);


module.exports = router;