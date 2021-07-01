const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
});

const Ngo = mongoose.model("Ngo", ngoSchema);
module.exports = Ngo;
