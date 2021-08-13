const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');

const app = express();
const session = require('express-session');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ngoRoutes = require('../routes/ngo');
const userRoutes = require('../routes/user');
const Ngo = require('../models/ngo');
const User = require('../models/user');

env.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.use(
	session({
		secret: process.env.secret,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ID}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}
	)
	.then(() => {
		console.log('Database connected.');
	});

let userType = '';
passport.serializeUser((userObject, done) => {
	userType = userObject.schemaType;
	done(null, userObject.id);
});

passport.deserializeUser((id, done) => {
	if (userType === 'NGO') {
		Ngo.findById(id, (err, ngo) => {
			done(err, ngo);
		});
	} else if (userType === 'USER') {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	}
});

app.use('/api', ngoRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});

app.get('/', (_, res) => {
	res.send('<h1>Welcome to Ratenect!<h1>');
});

// TEST TO CHECK AUTHENTICATION
app.get('/testuser', (req, res) => {
	if (req.isAuthenticated() && userType === 'USER')
		res.json({ message: 'Welcome to Ratenect!' });
	else res.json({ message: 'Authentication unsuccessful' });
});

app.get('/testngo', (req, res) => {
	if (req.isAuthenticated() && userType === 'NGO')
		res.json({ message: 'Welcome to Ratenect!' });
	else res.json({ message: 'Authentication unsuccessful' });
});
