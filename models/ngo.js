const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const ngoSchema = new mongoose.Schema({
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
		default: "NGO",
	},
	googleId: {
		type: String,
	},
});

ngoSchema.plugin(passportLocalMongoose, { usernameField: "email" });
ngoSchema.plugin(findOrCreate);

const Ngo = mongoose.model("Ngo", ngoSchema);

passport.use("ngo-local", Ngo.createStrategy());

module.exports = Ngo;
