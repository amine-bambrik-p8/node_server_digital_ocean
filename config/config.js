const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;
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
