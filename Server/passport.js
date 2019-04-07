require('dotenv').config();
var LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const pool = require('./queries').pool;
const bcrypt = require('bcrypt');
const opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET
};

module.exports = function(passport) {
	passport.use(
		new JWTstrategy(opts, function(payload, done) {
			const email = payload.user;
			pool.query('SELECT "id" FROM "user_Info" WHERE "email"= $1', [ email ], (err, results, fields) => {
				if (err) {
					return done(err);
				} else {
					return done(null, results);
				}
			});
		})
	);

	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password'
			},
			(email, password, done) => {
				pool.query('select * from "user_Info" where "email" = $1', [ email ], (err, data) => {
					if (err) {
						return done(null, false, { message: 'Email not Found', error: err });
					}
					bcrypt.compare(password, data.rows[0].password, (err, isMatch) => {
						if (err) {
							return done(null, false, { message: 'Password or Email incorrect', error: err });
						} else {
							return done(null, true, { message: 'Logged in Successfully' });
						}
					});
				});
			}
		)
	);
};
