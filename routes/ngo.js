const express = require('express');
require('dotenv').config();

const router = express.Router();
const {
	ngosignup,
	ngologin,
	createCampaign,
	searchNgos,
} = require('../controllers/ngo');

router.post('/ngosignup', ngosignup);
router.post('/ngologin', ngologin);
router.post('/createCampaign', createCampaign);
router.get('/searchngos', searchNgos);

module.exports = router;
