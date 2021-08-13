const express = require("express");
require("dotenv").config();

const router = express.Router();
const passport = require("passport");
const Ngo = require("../models/ngo");
const Campaign = require("../models/campaign");

// Ngo Signup
router.post("/ngosignup", (req, res) => {
	const { name, email, password } = req.body;
	Ngo.register({ name, email }, password, (err, ngo) => {
		if (err) return res.status(401).json({ message: err.message });
		if (ngo) return res.status(201).json({ message: "Account created successfully", newNGO: ngo });
		return res.status(400).json({ message: "Sorry. Your account couldn't be created" });
	});
});

router.post("/ngologin", (req, res) => {
	const { email, password } = req.body;
	const ngo = new Ngo({
		email,
		password,
	});
	req.login(ngo, error => {
		if (error) res.json({ message: error.message });
		else {
			passport.authenticate("ngo-local")(req, res, () => {
				res.json({ message: "You have successfully logged in" });
			});
		}
	});
});

// Create Campaign
router.post("/createCampaign", (req, res) => {
	const { cname, description, startDate, endDate, category, createdBy } = req.body;

	if (cname && description && startDate && endDate && category && createdBy) {
		// console.log(cname, description, startDate, endDate, category);

		const newCampaign = new Campaign({
			cname,
			description,
			startDate,
			endDate,
			category,
			createdBy,
		});

		newCampaign.save((err, data) => {
			if (err) return res.status(400).json({ Message: err });
			return res.status(200).json({ Message: "Successfully Listed", Data: data });
		});
	}
});

// SEARCH FUNCTIONALITY
router.get("/searchngos", (req, res) => {
	const data = req.query;
	Ngo.find({
		name: { $regex: data.name, $options: "$i" },
		// type: {$regex: data.type, $options: '$i'}, //should have some default value
		// location: {$regex: data.location, $options: '$i'}, //should have some default value
		// rating: {$regex: data.rating, $options: '$i'}, //should have some default value
	}).exec((error, foundNgos) => {
		if (error) res.status(400).json(error);
		else if (foundNgos) res.status(200).json(foundNgos);
		else res.status(400).json({ message: "No results found." });
	});
});

module.exports = router;
