const Pool = require('pg').Pool;
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const registerUser = async (name, email, password, matchPassword, res) => {
	const hash = await hashPassword(password);
	const id = uuid.v1();
	pool.query(
		'INSERT INTO "User_Info" ("Name", "Email", "Password") VALUES ($1, $2, $3) RETURNING "Id"',
		[ name, email, hash ],
		(error, results) => {
			const user = results.rows[0].Id;
			if (error) {
				console.log(error);
				return res.status(401).send({ message: 'User already exists', error: error });
			}
			const token = jwt.sign({ user: user }, process.env.SECRET, { expiresIn: '24h' });
			return res.status(200).send({ message: 'Registration Complete', token: token });
		}
	);
};

module.exports = {
	registerUser,
	pool
};
