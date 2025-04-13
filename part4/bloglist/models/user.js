const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
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
