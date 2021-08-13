const express = require("express");
require("dotenv").config();
const router = express.Router();
const passport = require("passport");
const Ngo = require("../models/ngo");
const Campaign = require("../models/campaign.js");

// Ngo Signup
router.post("/ngosignup", (req, res) => {
	Ngo.register(
		{ name: req.body.name, email: req.body.email },
		req.body.password,
		function (err, ngo) {
			if (err) return res.status(401).json({ message: err.message });
			else {
				if (ngo)
					return res.status(201).json({ message: "Account created successfully", newNGO: ngo });
				else return res.status(400).json({ message: "Sorry. Your account couldn't be created" });
			}
		}
	);
});

router.post("/ngologin", (req, res) => {
	const ngo = new Ngo({
		email: req.body.email,
		password: req.body.password,
	});
	req.login(ngo, error => {
		if (error) res.json({ message: error.message });
		else {
			passport.authenticate("ngo-local")(req, res, function () {
				res.json({ message: "You have successfully logged in" });
			});
		}
	});
});

//Create Campaign
router.post("/createCampaign", (req, res) => {
	const cname = req.body.cname;
	const description = req.body.description;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	const category = req.body.category;
	const createdBy = req.body.createdBy;

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

//SEARCH FUNCTIONALITY
router.get("/searchngos", function (req, res) {
	const data = req.query;
	Ngo.find({
		name: { $regex: data.name, $options: "$i" },
		//type: {$regex: data.type, $options: '$i'}, //should have some default value
		//location: {$regex: data.location, $options: '$i'}, //should have some default value
		//rating: {$regex: data.rating, $options: '$i'}, //should have some default value
	}).exec((error, foundNgos) => {
		if (error) res.status(400).json(error);
		else {
			if (foundNgos) res.status(200).json(foundNgos);
			else res.status(400).json({ message: "No results found." });
		}
	});
});

module.exports = router;
