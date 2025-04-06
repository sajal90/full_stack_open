const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");
const middleware = require("./utils/middleware.js");
const blogRouter = require("./controllers/blogs.js");

const app = express();

mongoose
	.connect(config.MONGODB_URI)
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
