const mongoose = require('mongoose');
var mailSchema = mongoose.Schema({
	name: String,
    prenom: String,
    email: String,
	message:String , 
});
var Email = (module.exports = mongoose.model('email', mailSchema));
