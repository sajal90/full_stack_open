const logger = require("./logger.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const requestLogger = (request, response, next) => {
	logger.info("Method: ", request.method);
	logger.info("Path: ", request.path);
	logger.info("Body: ", request.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).end();
};

const errorHandler = (error, request, response, next) => {
	logger.error(error);

	if (error.name === "ValidationError" || error.name === "TypeError") {
		response.status(400).send({ error: "Content missing" });
	} else if (
		error.name === "MongoServerError" &&
		error.message.includes("E11000 duplicate key error")
	) {
		return response.status(400).json({
			error: "expected `username` to be unique",
		});
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({ error: "invalid token" });
	}

	next(error);
};

const tokenExtractor = (request, response, next) => {
	const auth = request.get("authorization");
	if (auth && auth.startsWith("Bearer ")) {
		request.token = auth.replace("Bearer ", "");
	}
	next();
};

const userExtractor = async (request, response, next) => {
	if (request.token) {
		const decodedToken = jwt.verify(request.token, process.env.SECRET);
		if (decodedToken.id) {
			request.user = await User.findById(decodedToken.id);
		}
	} else if (request.method === "POST" || request.method === "DELETE") {
		throw jwt.JsonWebTokenError;
	}
	next();
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	tokenExtractor,
	userExtractor,
	errorHandler,
};
