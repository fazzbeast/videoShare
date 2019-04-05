const Pool = require('pg').Pool;
const uuid = require('uuid');
const bcrypt = require('bcrypt');

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
	console.log(hash);
	const id = uuid.v1();
	pool.query(
		'INSERT INTO "User_Info" ("Name", "Email", "Password") VALUES ($1, $2, $3)',
		[ name, email, hash ],
		(error, results) => {
			if (error) {
				return res.status(401).send({ message: 'User already exists', error: error });
			}
			return res.status(200).send({ message: 'Registration Complete' });
		}
	);
};

module.exports = {
	registerUser,
	pool
};
