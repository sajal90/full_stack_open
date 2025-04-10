const logger = require("./logger.js");

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

	if (error.name === "ValidationError") {
		response.status(400).send({ error: "Content missing" });
	}

	next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
