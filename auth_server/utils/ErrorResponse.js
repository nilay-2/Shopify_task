class ErrorResponse extends Error {
    statusCode;

    constructor(message, statusCode, options = {}) {
        super(message, options)
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse