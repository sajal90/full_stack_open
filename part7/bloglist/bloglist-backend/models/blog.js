const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: String,
	url: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	likes: {
		type: Number,
		default: 0,
	},
	comments: {
		type: [String],
		default: [],
	},
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = document._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
