const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	mobile_num: {
		type: Number,
		required: true,
	},
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
module.exports = Volunteer;
