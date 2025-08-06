const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
require("express-async-errors");
const logger = require("./utils/logger.js");
const middleware = require("./utils/middleware.js");
const blogRouter = require("./controllers/blogs.js");
const userRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");

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
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing.js");
	app.use("/api/testing", testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
