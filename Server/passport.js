require('dotenv').config();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const pool = require('./queries').pool;

const opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET
};

passport.use(
	new JWTstrategy(opts, function(payload, done) {
		const email = payload.email;
		pool.query('SELECT password FROM user_info WHERE email= ?', [ email ], (err, results, fields) => {
			if (err) {
				done(err);
			}
			done(null, results);
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
			pool
				.query('SELECT email,password FROM user_info where email = ?', [ email ], (err, data) => {
					if (err) {
						done(null, false, { message: 'Email not Found', error: err });
					}
					bcrypt.compare(password, data.password, (err, isMatch) => {
						if (err) {
							done(null, false, { message: 'Password or Email incorrect', error: err });
						}
						done(null, true, { message: 'Logged in Successfully' });
					});
				})
				.catch((err) => done(err));
		}
	)
);
