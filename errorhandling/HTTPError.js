class HTTPError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default HTTPError;