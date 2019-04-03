const Pool = require('pg').Pool;
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');

require('dotenv').config();

const pool = new Pool({
	user: process.env.DB_User,
	host: process.env.DB_host,
	database: process.env.DB,
	password: process.env.DB_password,
	port: process.env.DB_Port
});

const hashPassword = (password) => {
	return bcrypt.hash(password, 10);
};

const registerUser = (req, res) => {
	const { name, email, password, matchPassword } = response.body;
	//TODO:
	//Add Form Validation
	const hash = hashPassword(password);
	const id = uuid.v1();
	pool.query(
		'INSERT INTO user_info (id,name, email, password) VALUES (?,?,?,?)',
		[ id, name, email, hash ],
		(error, results) => {
			if (error) {
				res.status(401).send({ message: 'User already exists', error: error });
			}
			res.status(200).send({ message: 'Registration Complete' });
		}
	);
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	strategy,
	pool
};
