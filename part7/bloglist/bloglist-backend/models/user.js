const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		required: true,
		unique: true,
	},
	name: String,
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog",
	}],
	passwordHash: String,
});

userSchema.set("toJSON", {
	transform: (document, returnedDocument) => {
		returnedDocument.id = returnedDocument._id;
		delete returnedDocument._id;
		delete returnedDocument.__v;

		delete returnedDocument.passwordHash;
	},
});

module.exports = mongoose.model("User", userSchema);
