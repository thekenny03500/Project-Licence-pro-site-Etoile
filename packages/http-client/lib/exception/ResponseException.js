module.exports = class ResponseException{
	constructor(statusCode, message) {
	this.statusCode = statusCode;
		this.message = message;
	}
}