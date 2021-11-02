const express = require('express');
require('dotenv').config();

const router = express.Router();
const {
	ngosignup,
	ngologin,
	createCampaign,
	searchNgos,
	saveNgoProfile,
	getNgoData,
} = require('../controllers/ngo');
// const {getUserData} = require('../common-middleware/getUserData');

router.post('/ngosignup', ngosignup);
router.post('/ngologin', ngologin);
router.post('/createCampaign', createCampaign);
router.post('/saveNgoProfile/:ngoId', saveNgoProfile);
router.get('/searchngos', searchNgos);
router.get('/getNgoData', getNgoData);

module.exports = router;
