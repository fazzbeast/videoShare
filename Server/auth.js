const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pool = require('./queries').pool;
const uuid = require('uuid');

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
			const id = user.rows[0].id;
			const token = jwt.sign({ user: req.body.email }, process.env.SECRET, {
				expiresIn: '24h'
			});
			pool.query(`SELECT * FROM "joinedRooms" WHERE "id"=$1 `, [ id ], (error, result) => {
				if (error) {
					console.log(error);
					return res.status(500).json({
						message: 'Could not grab Rooms',
						error: err
					});
				} else {
					return res.json({ token: token, data: result.rows });
				}
			});
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
		const id = user.rows[0].id;
		pool.query(`SELECT * FROM "joinedRooms" WHERE "id"=$1 `, [ id ], (error, result) => {
			if (error) {
				return res.status(500).json({
					message: 'Could not grab Rooms',
					error: err
				});
			} else {
				return res.status(200).json({
					message: 'Signed In',
					user: user.rows[0].id,
					data: result.rows
				});
			}
		});
	})(req, res);
});

router.get('/confirmation/:id', function(req, res, next) {
	const token = req.params.id;
	console.log(token);
	pool.query(
		'UPDATE  "user_info" SET "isEmailConfirmed"=true  WHERE "emailConfirmationToken"=$1 AND "isEmailConfirmed"=false RETURNING "email"',
		[ token ],
		(error, results) => {
			const user = results.rows.length > 0;

			if (error) {
				return res.status(401).send({ message: 'User already exists', error: error });
			} else if (user) {
				return res.status(200).send({ message: 'Registration Complete' });
			} else {
				return res.status(401).send({ message: 'User already exists', error: error });
			}
		}
	);
});

router.post('/createRoom', function(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		const id = user.rows[0].id;
		if (err || !user) {
			return res.status(500).json({
				message: 'Something is not swag',
				user: user,
				error: err,
				info: info
			});
		}
		const roomName = req.body.name;
		roomID = uuid.v1();
		pool.query(
			`INSERT INTO "joinedRooms" ("id","roomID","roomName") VALUES ($1,$2,$3); `,
			[ id, roomID, roomName ],
			(error, results) => {
				if (error) {
					return res.status(500).json({
						message: 'Could not Create Room',
						error: err
					});
				} else {
					pool.query(`SELECT * FROM "joinedRooms" WHERE "id"=$1 `, [ id ], (error, result) => {
						if (error) {
							console.log(error);
							return res.status(500).json({
								message: 'Could not grab Rooms',
								error: err
							});
						} else {
							return res.status(200).json({
								message: 'Room Added and data returned',
								data: result.rows
							});
						}
					});
				}
			}
		);
	})(req, res);
});

router.post('/DeleteRoom', function(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		const id = user.rows[0].id;
		if (err || !user) {
			return res.status(500).json({
				message: 'Something is not swag',
				user: user,
				error: err,
				info: info
			});
		}
		const roomID = req.body.roomID;

		pool.query(`DELETE FROM "joinedRooms" WHERE "roomID"=$1 `, [ roomID ], (error, results) => {
			if (error) {
				return res.status(500).json({
					message: 'Could not delete Room',
					error: err
				});
			} else {
				pool.query(`SELECT * FROM "joinedRooms" WHERE "id"=$1 `, [ id ], (error, result) => {
					if (error) {
						console.log(error);
						return res.status(500).json({
							message: 'Could not grab Rooms',
							error: err
						});
					} else {
						return res.status(200).json({
							message: 'Room Added data returned',
							data: result.rows
						});
					}
				});
			}
		});
	})(req, res);
});

module.exports = router;
