const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const ngoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	hash_password: {
		type: String,
		required: true
	}
});

ngoSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
});

ngoSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}

const Ngo = mongoose.model("Ngo", ngoSchema);
module.exports = Ngo;
