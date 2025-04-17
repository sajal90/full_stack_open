const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

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

	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "invalid token" });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog);
	await user.save();
	response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "invalid token" });
	}
	const userid = decodedToken.id;
	const blog = await Blog.findById(request.params.id);

	if (userid.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: "token mismatch" });
	}
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
	let blog = await Blog.findById(request.params.id);
	if (!blog) {
		response.status(404).end();
	}

	blog.title = request.body.title;
	blog.author = request.body.author;
	blog.url = request.body.url;
	blog.likes = request.body.likes;

	const savedBlog = await blog.save();
	response.json(savedBlog);
});

module.exports = blogRouter;
