const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
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

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
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
