var mongoose = require('mongoose');
var crypto = require("crypto");
mongoose.connect('mongodb://localhost/authworkshop');
mongoose.connection.on('error', console.error.bind(console, 'database connection error'));

var userSchema = new mongoose.Schema({
	username: String,
	hashedPassword: String,
	salt: String
});

userSchema.methods.authenticate = function (password){
	var testPassword = crypto.pbkdf2Sync(password, this.salt, 0, 64).toString('base64');

	return (this.hashedPassword === testPassword);
};

userSchema.virtual("password").set(function (plaintext){
	var saltBuffer = crypto.randomBytes(16);
    this.salt = saltBuffer.toString('base64');

	this.hashedPassword = crypto.pbkdf2Sync(plaintext, this.salt, 0, 64).toString('base64');
});

module.exports = mongoose.model('User', userSchema);