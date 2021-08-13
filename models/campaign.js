const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
	cname: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	startDate: {
		type: String, // Date
		required: true,
	},
	endDate: {
		type: String, // Date
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'ngoSchema',
	},
});

const createCampaign = mongoose.model('Campaign', campaignSchema);
module.exports = createCampaign;
