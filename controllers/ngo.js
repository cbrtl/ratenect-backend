/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const passport = require('passport');
const Ngo = require('../models/ngo');
const Campaign = require('../models/campaign');
const { count } = require('../models/ngo');

// SIGNUP
exports.ngosignup = (req, res) => {
	const { name, email, password } = req.body;
	Ngo.register({ name, email, date: '' }, password, (err, ngo) => {
		if (err) return res.status(401).json({ message: err.message });
		if (ngo)
			return res
				.status(201)
				.json({ message: 'Account created successfully', newNGO: ngo });
		return res
			.status(400)
			.json({ message: "Sorry. Your account couldn't be created" });
	});
};

// LOGIN
exports.ngologin = (req, res) => {
	const { email, password } = req.body;
	const ngo = new Ngo({
		email,
		password,
	});
	req.login(ngo, (error) => {
		if (error) {
			res.json({ message: error.message });
		} else {
			passport.authenticate('ngo-local')(req, res, (err) => {
				if (err) res.json({ message: err.message });
				else
					res.json({
						message: 'You have successfully logged in',
						user: req.user,
					});
			});
		}
	});
};

// CREATE CAMPAIGN
exports.createCampaign = (req, res) => {
	if (req.isAuthenticated()) {
		const {
			name,
			shortDesc,
			startDate,
			regEndDate,
			eventDetails,
			incentives,
			volNum,
			tagsArray,
		} = req.body;

		const createdBy = req.user;

		if (
			name &&
			eventDetails &&
			startDate &&
			regEndDate &&
			shortDesc &&
			createdBy &&
			incentives &&
			volNum &&
			tagsArray
		) {
			// console.log(cname, description, startDate, endDate, category);

			const newCampaign = new Campaign({
				name,
				shortDesc,
				startDate,
				regEndDate,
				eventDetails,
				incentives,
				volNum,
				tags: tagsArray,
				createdBy,
			});

			newCampaign.save((err, data) => {
				if (err) return res.status(400).json({ Message: err });
				Ngo.updateOne(
					{ _id: req.user._id },
					{ $push: { campaigns: newCampaign._id } },
					() => {
						return res
							.status(200)
							.json({ Message: 'Successfully Listed', Data: data });
					}
				);
			});
		} else res.status(400).json({ Message: 'Please fill all the fields' });
	} else {
		res.status(400).json({ message: 'You are not logged in' });
	}
};

// SAVE NGO PROFILE
exports.saveNgoProfile = (req, res) => {
	const { ngoId } = req.params;
	console.log(ngoId);
	console.log(req.body);
	// res.status(200).json({message: 'Profile saved successfully'});
	const {
		landline,
		mobile,
		addressLine1,
		addressLine2,
		description,
		category,
		websiteLink,
		pincode,
		city,
		state,
		country,
		dateOfFoundation,
		founderFirstName,
		founderLastName,
		secretaryFirstName,
		secretaryLastName,
		financeFirstName,
		financeLastName,
	} = req.body;

	Ngo.updateOne(
		{ _id: ngoId },
		{
			$set: {
				dateOfFoundation,
				websiteLink,
				contactNum: {
					landline,
					mobile,
				},
				address: {
					addressLine1,
					addressLine2,
					pincode,
					city,
					state,
					country,
				},
				founder: {
					firstName: founderFirstName,
					lastName: founderLastName,
				},
				secretary: {
					firstName: secretaryFirstName,
					lastName: secretaryLastName,
				},
				financeTrustee: {
					firstName: financeFirstName,
					lastName: financeLastName,
				},
				aboutUs: description,
				category,
			},
		},
		(error, updatedNgo) => {
			if (error) res.status(400).json(error);
			else if (updatedNgo)
				res
					.status(200)
					.json({ message: 'Successfully updated', data: updatedNgo });
		}
	);
};

// SEARCH FUNCTIONALITY
exports.searchNgos = (req, res) => {
	const data = req.query;
	Ngo.find({
		name: { $regex: data.name, $options: '$i' },
		// type: {$regex: data.type, $options: '$i'}, //should have some default value
		// location: {$regex: data.location, $options: '$i'}, //should have some default value
		// rating: {$regex: data.rating, $options: '$i'}, //should have some default value
	}).exec((error, foundNgos) => {
		if (error) res.status(400).json(error);
		else if (foundNgos) res.status(200).json(foundNgos);
		else res.status(400).json({ message: 'No results found.' });
	});
};

exports.getNgoData = async (req, res) => {
	// if(req.isAuthenticated()){
	const ngo = await Ngo.findById({ _id: req.user._id });
	res.status(200).json({ user: ngo });
	// }else{
	// 	res.status(400).json({message: 'You are not logged in'});
	// }
};

exports.getNgoCampaignDetails = async (req, res) => {
	const { campaigns } = req.user;
	console.log(campaigns);
	const campaignDataArray = [];
	let loopCount = 0;
	campaigns.forEach(async (campaign) => {
		console.log(campaign);
		const campaignData = await Campaign.findById({ _id: campaign });
		campaignDataArray.push(campaignData);
		loopCount++;
		if (loopCount === campaigns.length) {
			console.log(campaignDataArray);
			res.status(200).json({ campaigns: campaignDataArray });
		}
	});
};
