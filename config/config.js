const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.DBURI;
mongoose.connect(
	dbURI,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(err, success) => {
		if (err) throw err;
	}
);
