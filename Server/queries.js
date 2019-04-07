const Pool = require('pg').Pool;
const uuid = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();
const emailSender = require('./email');
const pool = new Pool({
	user: process.env.DB_User,
	host: process.env.DB_host,
	database: process.env.DB,
	password: process.env.DB_password,
	port: process.env.DB_Port,
	ssl: true
});

const hashPassword = (password) => {
	return bcrypt.hash(password, 10);
};

const registerUser = async (req, name, email, password, matchPassword, res) => {
	const hash = await hashPassword(password);
	const id = uuid.v1();
	const emailToken = uuid.v1();
	pool.query(
		'INSERT INTO "user_info" ("id","name", "email", "password","joined","updatedAt","emailConfirmationToken","passwordResetExpires") VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING "id"',
		[ id, name, email, hash, new Date(Date.now()), new Date(Date.now()), emailToken, Date.now() + 86400 * 1000 ],
		(error, results) => {
			if (error) {
				return res.status(401).send({ message: 'User already exists', error: error });
			}
			emailSender(req, email, name, emailToken, (err, data) => {
				if (err) {
					console.log(err);
					return res.status(401).send({ message: 'Error sending email', error: err });
				}
				return res.status(200).send({ message: 'Registration Complete' });
			});
		}
	);
};

module.exports = {
	registerUser,
	pool
};
