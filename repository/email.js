const Email = require('../models/email');

function create(user){
	const {email,prenom,name,message,phone} = user;
	
	return Email.create({
			email,
			prenom,
			name,
			message,
			phone
		});
		
}


module.exports = { create };