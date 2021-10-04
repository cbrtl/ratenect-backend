const express = require('express');
const { usersignup, userlogin } = require('../controllers/user');

const router = express.Router();

router.post('/usersignup', usersignup);
router.post('/userlogin', userlogin);

module.exports = router;
