const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app.js");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const api = supertest(app);

const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
];

describe("blog api tests", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash("password", 10);
		const user = new User({
			username: "sajal",
			name: "sajal",
			passwordHash,
		});
		const savedUser = await user.save();

		await Blog.deleteMany({});
		for (let blog of initialBlogs) {
			let blogObject = new Blog(blog);
			blogObject.user = savedUser._id;
			await blogObject.save();
		}
	});

	test("Amount of blogs", async () => {
		const response = await api.get("/api/blogs")
			.expect(200)
			.expect("content-type", /application\/json/);

		assert.strictEqual(response.body.length, initialBlogs.length);
	});

	test("unique identifer is named id", async () => {
		const response = await api.get("/api/blogs");

		assert(response.body[0].hasOwnProperty("id"));
	});

	test("post req", async () => {
		const loginResponse = await api.post("/api/login")
			.send({ username: "sajal", password: "password" });

		const token = loginResponse.body.token;

		const newBlog = {
			title: "New Blog",
			author: "Sajal gupta",
			url: "https://google.com",
			likes: 90,
		};

		await api.post("/api/blogs")
			.set("Authorization", `Beaver ${token}`)
			.send(newBlog);

		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, initialBlogs.length + 1);
	});

	test("default to zero likes", async () => {
		const loginResponse = await api.post("/api/login")
			.send({ username: "sajal", password: "password" });

		const token = loginResponse.body.token;

		const newBlog = {
			title: "New Blog",
			author: "Sajal Gupta",
			url: "https://mooc.fi/",
		};

		const response = await api.post("/api/blogs")
			.set("Authorization", `Beaver ${token}`)
			.send(newBlog);

		assert.strictEqual(response.body.likes, 0);
	});

	test("missing title or url", async () => {
		const loginResponse = await api.post("/api/login")
			.send({ username: "sajal", password: "password" });

		const token = loginResponse.body.token;

		const missingUrl = {
			title: "New",
			author: "Me",
		};

		await api.post("/api/blogs")
			.set("Authorization", `Beaver ${token}`)
			.send(missingUrl)
			.expect(400);

		const missingTitle = {
			author: "me",
			url: "example.com",
		};

		await api.post("/api/blogs")
			.set("Authorization", `Beaver ${token}`)
			.send(missingTitle)
			.expect(400);
	});

	test("blog is deleted", async () => {
		const loginResponse = await api.post("/api/login")
			.send({ username: "sajal", password: "password" });

		const token = loginResponse.body.token;

		const id = initialBlogs[0]._id;
		await api.delete(`/api/blogs/${id}`)
			.set("Authorization", `Beaver ${token}`)
			.expect(204);

		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, initialBlogs.length - 1);
	});

	test("fail without token", async () => {
		const newBlog = {
			title: "New Blog",
			author: "Sajal gupta",
			url: "https://google.com",
			likes: 90,
		};

		await api.post("/api/blogs")
			.send(newBlog)
			.expect(401);
	});

	test("blog is updated", async () => {
		const id = initialBlogs[0]._id;
		let updatedBlog = initialBlogs[0];
		updatedBlog.likes += 1;

		await api.put(`/api/blogs/${id}`)
			.send(updatedBlog);

		const response = await api.get(`/api/blogs/${id}`);

		assert.strictEqual(updatedBlog.likes, response.body.likes);
	});
});

after(async () => {
	await mongoose.connection.close();
});
