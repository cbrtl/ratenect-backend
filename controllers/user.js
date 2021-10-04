const passport = require('passport');
const User = require('../models/user');

// SIGNUP
exports.usersignup = (req, res) => {
	const { name, email, password } = req.body;
	User.register({ name, email }, password, (err, user) => {
		if (err) return res.status(401).json({ message: err.message });
		if (user)
			return res
				.status(201)
				.json({ message: 'Account created successfully', newUser: user });
		return res
			.status(400)
			.json({ message: "Sorry. Your account couldn't be created" });
	});
};

// LOGIN
exports.userlogin = (req, res) => {
	const { email, password } = req.body;
	const user = new User({
		email,
		password,
	});
	req.login(user, (error) => {
		if (error) res.json({ message: error.message });
		else {
			passport.authenticate('user-local')(req, res, (err) => {
				if (err) res.json({ message: err.message });
				else res.json({ message: 'You have successfully logged in' });
			});
		}
	});
};
