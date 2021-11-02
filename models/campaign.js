const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	shortDesc: {
		type: String,
		required: true,
	},
	eventDetails: {
		type: String,
		required: true,
	},
	incentives: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date, // Date
		required: true,
	},
	regEndDate: {
		type: Date, // Date
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ngo',
		required: true,
	},
	tags: [String],
	status: {
		type: String,
		required: true,
		default: 'active',
	},
	volNum: {
		type: Number,
	},
});

const createCampaign = mongoose.model('Campaign', campaignSchema);
module.exports = createCampaign;
