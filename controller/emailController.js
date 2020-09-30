var Email = require('../models/email');

module.exports.saveMail = (req, res) => {
    let user =req.body;

	var email = user.email;
	var prenom = user.prenom;
    var name = user.name;
    var message = user.message;

	newMail = new Email({ name: name, prenom: prenom ,email: email,message:message })

	newMail.save((err, success) => {
		if (err) throw err;
		if (success) {
			console.log('message enregister');
		}
	});
};
