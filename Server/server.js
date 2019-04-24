require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const queries = require('./queries');
const auth = require('./auth');
const pool = require('./queries').pool;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
const uuid = require('uuid');
// enable all CORS requests
app.use(cors());
//
require('./passport')(passport);
// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Client/build')));

server = app.listen(process.env.PORT || 5000, () => console.log('Listening on port 5000'));
const io = require('socket.io')(server);
io.on('connection', (socket) => {
	var address;
	console.log('New Connection');
	socket.on('joinRoom', function(newRoom) {
		address = newRoom;
		socket.join(address);
		socket.broadcast.to(address).emit('justJoined', socket.id);
	});
	socket.on('justJoinedData', function(data) {
		socket.to(data.id).emit('justJoinedPlayerData', data);
	});
	socket.on('seekPlayTime', function(playTime) {
		socket.broadcast.to(address).emit('NewCurrentTime', playTime);
	});
	socket.on('pauseplayemit', function(pauseplay) {
		socket.broadcast.to(address).emit('pauseplay', pauseplay);
	});
	socket.on('newVideo', function(newVideo) {
		socket.broadcast.to(address).emit('addedNewVideo', 'newVideo');
	});
	socket.on('VideoSuccessFullyDeleted', function() {
		socket.broadcast.to(address).emit('videoDeleted', 'stuff');
	});
	socket.on('newRecentlyPlayed', function(data) {
		socket.broadcast.to(address).emit('updatedRecentlyPlayed', data.recentlyPlayed);
	});

	socket.on('sendOutSync', function(data) {
		socket.broadcast.to(address).emit('serverSync', data);
	});
});

app.use('/auth', auth);
app.post(
	'/registerUser',
	[
		check('name').not().isEmpty().withMessage('Must enter a name'),
		check('email').not().isEmpty().withMessage('Must enter an email'),
		check('email').isEmail().withMessage('Must enter a valid email'),
		check('password').not().isEmpty().withMessage('Must enter a password'),
		check('password').isLength({ min: 8, max: 100 }).withMessage('Password must be between 8-100 characters long'),
		check('password')
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^$!%*?&])[A-Za-z\d@#^$!%*?&]{8,}$/, 'i')
			.withMessage('Password include one lowercase character, one uppercase, a number, and a special character'),
		check('password2').not().isEmpty().withMessage('Must re-enter password'),
		check('password')
			.custom((value, { req, loc, path }) => {
				if (value !== req.body.password2) {
					throw new Error("Passwords don't match");
				} else {
					return value;
				}
			})
			.withMessage('Password Must Match')
	],
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, email, password, matchPassword } = req.body;

		queries.registerUser(req, name, email, password, matchPassword, res);
	}
);

app.post('/videoQueue/add', (req, res, next) => {
	let url = req.body.url;
	let roomID = req.body.room;
	let videoID;
	if (req.body.videoID) {
		videoID = req.body.videoID;
	} else {
		videoID = uuid.v1();
	}

	let position = req.body.position;
	pool.query(
		'INSERT INTO "videoList" ("url","videoID", "roomID", "queueOrder") VALUES ($1, $2, $3,$4) ON CONFLICT ("videoID") DO UPDATE SET "queueOrder"=EXCLUDED."queueOrder" ',
		[ url, videoID, roomID, position ],
		(error, results) => {
			if (error) {
				return res.status(400).send(error);
			} else {
				pool.query(
					'SELECT * FROM "videoList" WHERE "roomID"=$1 ORDER BY "queueOrder"',
					[ roomID ],
					(error2, results2) => {
						if (error) {
							return res.status(400).send(error2);
						} else {
							return res.status(200).json(results2.rows);
						}
					}
				);
			}
		}
	);
});

app.post('/videoQueue/getData', (req, res, next) => {
	let roomID = req.body.room;
	pool.query('SELECT * FROM "videoList" WHERE "roomID"=$1 ORDER BY "queueOrder"', [ roomID ], (error, results) => {
		if (error) {
			return res.status(400).send(error);
		} else {
			return res.status(200).json(results.rows);
		}
	});
});

app.post('/videoQueue/delete', (req, res, next) => {
	let videoID = req.body.videoID;
	let roomID = req.body.room;
	pool.query('DELETE FROM "videoList" WHERE "videoID"=$1 ', [ videoID ], (error, results) => {
		if (error) {
			return res.status(400).send(error);
		} else {
			pool.query(
				'SELECT * FROM "videoList" WHERE "roomID"=$1 ORDER BY "queueOrder"',
				[ roomID ],
				(error2, results2) => {
					if (error) {
						return res.status(400).send(error2);
					} else {
						return res.status(200).json(results2.rows);
					}
				}
			);
		}
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../Client/build/index.html'));
});
