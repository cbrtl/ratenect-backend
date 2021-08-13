const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
	},
	schemaType: {
		type: String,
		default: 'USER',
	},
	googleId: {
		type: String,
	},
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

passport.use('user-local', User.createStrategy());

module.exports = User;
