require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const queries = require('./queries');
const auth = require('./auth');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// enable all CORS requests
app.use(cors());
//
require('./passport')(passport);
// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, () => console.log('Listening on port 5000'));
app.use('/auth', auth);
app.post(
	'/registerUser',
	[
		check('name').not().isEmpty().withMessage('Must enter a name'),
		check('email').not().isEmpty().withMessage('Must enter an email'),
		check('email').isEmail().withMessage('Must enter a valid email'),
		check('password').not().isEmpty().withMessage('Must enter a password'),
		check('password').isLength({ min: 8, max: 100 }).withMessage('Password must be between 8-100 characters long'),
		// check('password')
		// 	.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*)(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
		// 	.withMessage('Password include one lowercase character, one uppercase, a number, and a special character'),
		check('password2').not().isEmpty().withMessage('Must re-enter password')
		// check('matchPassword').equals('matchPassword').withMessage('Password Must Match')
	],
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, email, password, matchPassword } = req.body;

		queries.registerUser(name, email, password, matchPassword, res);
	}
);
