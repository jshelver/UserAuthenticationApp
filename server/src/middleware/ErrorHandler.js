function errorHandler(err, req, res, next) {
    req.status(500).json(err.message)
}

module.exports = errorHandler;