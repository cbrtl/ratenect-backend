const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

function galleryLimit(gallery) {
	return gallery.length <= 3;
}

const ngoSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
		},
		schemaType: {
			type: String,
			default: 'NGO',
		},
		googleId: {
			type: String,
		},
		dateOfFoundation: {
			type: Date,
		},
		category: {
			type: String,
			// required: true,
			// trim: true,
		},
		contactNum: {
			landline: {
				type: Number,
				// required: true,
			},
			mobile: {
				type: Number,
			},
		},
		address: {
			addressLine1: {
				type: String,
				// required: true,
			},
			addressLine2: {
				type: String,
			},
			city: {
				type: String,
				// required: true,
			},
			pincode: {
				type: Number,
				// required: true,
			},
			state: {
				type: String,
				// required: true,
			},
			country: {
				type: String
				// required: true,
			},
		},
		founder: {
			firstName: {
				type: String
				// required: true,
			},
			lastName: {
				type: String,
				// required: true,
			},
			mobNum: {
				primary: {
					type: Number,
					// required: true,
				},
				secondary: {
					type: Number,
				},
			},
		},
		secretary: {
			firstName: {
				type: String,
				// required: true,
			},
			lastName: {
				type: String,
				// required: true,
			},
			contactNum: {
				type: Number,
				// required: true,
			},
		},
		financeTrustee: {
			firstName: {
				type: String,
				// required: true,
			},
			lastName: {
				type: String,
				// required: true,
			},
			contactNum: {
				type: Number,
				// required: true,
			},
		},
		gallery: {
			type: [{ img: { type: String } }],
			validate: [galleryLimit, 'You can add a maximum of 3 photos.'],
		},
		documents: {
			taxExemptionCert: {
				type: String,
				// required: true
			},
			registrationCert: {
				type: String,
				// required: true
			},
			annualReport: {
				type: String,
				// required: true
			},
			trustDeeds: {
				type: String,
				// required: true
			},
		},
		websiteLink: {
			type: String,
		},
		aboutUs: {
			type: String,
			// required: true
		},
		profilePic: {
			type: String,
			// required: true
		},
		campaigns: {
			type: [
				{ campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' } },
			],
		},
	},
	{ timestamps: true }
);

ngoSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
ngoSchema.plugin(findOrCreate);

const Ngo = mongoose.model('Ngo', ngoSchema);

passport.use('ngo-local', Ngo.createStrategy());

module.exports = Ngo;
