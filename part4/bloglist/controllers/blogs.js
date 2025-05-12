const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	if (!blog) {
		response.status(404).end();
	}

	response.json(blog);
});

blogRouter.post("/", async (request, response) => {
	const body = request.body;
	const user = request.user;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: new mongoose.Types.ObjectId(`${user._id}`),
	});
	blog.populate("user", { username: 1, name: 1 });

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog);
	await user.save();
	response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
	const userid = request.user.id;
	const blog = await Blog.findById(request.params.id);

	if (userid.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: "token mismatch" });
	}
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		user: body.user.id,
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	}).populate("user", { username: 1, name: 1 });
	response.json(updatedBlog);
});

module.exports = blogRouter;
