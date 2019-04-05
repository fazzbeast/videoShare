const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function(req, res, next) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(500).json({
				message: 'Something is not swag',
				user: user,
				error: err,
				info: info
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				return res.send(err, 'err');
			}
			const token = jwt.sign({ user: user }, process.env.SECRET, { expiresIn: '1h' });
			return res.json({ token: token });
		});
	})(req, res);
});

module.exports = router;
