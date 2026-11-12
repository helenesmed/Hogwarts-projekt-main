export default (err, req, res, next) => {
    const statusCode = err.statusCode ?? err.status ?? 500;
    let error = "Internal Server Error";

    if (statusCode === 404) {
        error = "Not Found";
    } else if (statusCode === 400) {
        error = "Bad Request";
    }

    res.status(statusCode).json({
        message: err.message || "Something went wrong",
        error,
        statusCode
    });
};