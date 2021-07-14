const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const Ngo = require("../models/ngo");
const Campaign = require("../models/campaign.js");

// Ngo Signup
router.post("/ngosignup", (req, res) => {
	Ngo.findOne({ email: req.body.email }).exec((error, ngo) => {
		if (ngo)
			return res.status(400).json({
				message: "Account already exists.",
			});
		else {
			const name = req.body.name;
			const email = req.body.email;
			const password = req.body.password;
			const cnfPassword = req.body.cnfPassword;
			if (password === cnfPassword) {
				const newNGO = new Ngo({ name, email, password });

				newNGO.save((error, data) => {
					if (error) return res.status(400).json({ message: error.message });
					if (data) return res.status(201).json({ newNGO: data });
				});
			} else {
				res.status(400).json({ message: "Passwords don't match" });
			}
		}
	});
});

// Ngo Login
router.post("/ngologin", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	Ngo.findOne({ email: email }).exec((error, ngo) => {
		if (error) return res.status(400).json({ error });
		if (ngo) {
			if (ngo.authenticate(password)) {
				const token = jwt.sign({ _id: ngo._id }, process.env.secret_key, { expiresIn: "1h" });
				return res.status(201).json({ message: "Successfully Logged in.", token, ngo });
			} else return res.status(400).json({ message: "User couldn't be authenticated." });
		} else return res.status(400).json({ message: "NGO not found." });
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
module.exports = router;
