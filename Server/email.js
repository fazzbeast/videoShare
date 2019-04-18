const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = function sendEmail(req, email, name, token, callback) {
	var transporter = nodemailer.createTransport({
		host: 'smtp.zoho.com',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}
	});

	var mailOptions = {
		from: 'admin@tabletopmtg.com',
		to: email,
		subject: 'Confirm your account for VideoShare',
		text: `Thank you ${name} for signing up for VideoShare!

        Please verify your account by clicking the link: https://youtube-date-night.herokuapp.com/user/confirmed/${token}
        `
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			callback(error);
		} else {
			callback(null, { succes: 'Email sent: ' + info.response });
		}
	});
};
