const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const User = require("../models/user.js");

const api = supertest(app);

const initialUser = {
	"username": "abcdef",
	"name": "john doe",
	"id": "67fd179fb3ef526179dede76",
};

describe("user api tests", () => {
	test("username length < 3", async () => {
		const newUser = {
			username: "ab",
			name: "john doe",
			password: "something",
		};

		await api.post("/api/users")
			.send(newUser)
			.expect(400);
	});

	test("username length > 3", async () => {
		const newUser = {
			username: "abcde",
			name: "john doe",
			password: "something",
		};

		await api.post("/api/users")
			.send(newUser)
			.expect(201);
	});

	test("username should be unique", async () => {
		const newUser = {
			username: "abcdef",
			name: "john doe",
			password: "something",
		};

		await api.post("/api/users")
			.send(newUser)
			.expect(400);
	});

	test("password length < 3", async () => {
		const newUser = {
			username: "abcde",
			name: "john doe",
			password: "so",
		};

		await api.post("/api/users")
			.send(newUser)
			.expect(400);
	});

	test("password length > 3", async () => {
		const newUser = {
			username: "abcde",
			name: "john doe",
			password: "smthg",
		};

		await api.post("/api/users")
			.send(newUser)
			.expect(201);
	});
});

beforeEach(async () => {
	await User.deleteMany({});
	const newUser = new User(initialUser);
	await newUser.save();
});

after(async () => {
	await mongoose.connection.close();
});
