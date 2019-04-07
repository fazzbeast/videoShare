const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pool = require('./queries').pool;

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
			const token = jwt.sign({ user: req.body.email }, process.env.SECRET, { expiresIn: '1h' });
			return res.json({ token: token });
		});
	})(req, res);
});

router.get('/user', function(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(500).json({
				message: 'Something is not swag',
				user: user,
				error: err,
				info: info
			});
		}
		return res.status(200).json({
			message: 'Signed In'
		});
	})(req, res);
});

router.get('/confirmation/:id', function(req, res, next) {
	const token = req.params.id;
	pool.query(
		'UPDATE  "user_info" SET "isEmailConfirmed"=true  WHERE "emailConfirmationToken"=$1 AND "isEmailedConfirmed"=false RETURNING "email"',
		[ token ],
		(error, results) => {
			const user = results;
			if (error) {
				return res.status(401).send({ message: 'User already exists', error: error });
			}
			return res.status(200).send({ message: 'Registration Complete' });
		}
	);
});

module.exports = router;
