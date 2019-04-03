const express = require('express');
const router = express.Router();
const pool = require('./queries');
/* GET users listing. */
router.get('/Rooms', function(req, res, next) {
	res.send('respond with a resource');
});

/* GET user profile. */
router.get('/profile', function(req, res, next) {
	res.send(req.results);
});

module.exports = router;
