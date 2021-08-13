const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/usersignup", function (req, res) {
	User.register(
		{ name: req.body.name, email: req.body.email },
		req.body.password,
		function (err, user) {
			if (err) return res.status(401).json({ message: err.message });
			else {
				if (user)
					return res.status(201).json({ message: "Account created successfully", newUser: user });
				else return res.status(400).json({ message: "Sorry. Your account couldn't be created" });
			}
		}
	);
});

router.post("/userlogin", (req, res) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password,
	});
	req.login(user, error => {
		if (error) res.json({ message: error.message });
		else {
			passport.authenticate("user-local")(req, res, function () {
				res.json({ message: "You have successfully logged in" });
			});
		}
	});
});

module.exports = router;
