const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
require("express-async-errors");
const logger = require("./utils/logger.js");
const middleware = require("./utils/middleware.js");
const blogRouter = require("./controllers/blogs.js");

const app = express();
const MONGODB_URI = process.env.NODE_ENV === "test"
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		logger.info("mongodb connected");
	})
	.catch((error) => {
		logger.error("error connecting to db", error.message);
	});

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
