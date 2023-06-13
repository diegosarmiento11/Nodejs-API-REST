function logError(err, req, res, next) {
    console.log('logError')
    console.error(err)
    next(err)
}

function errorHandler(err, req, res, next) {
    console.log('errorhandler')
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
}

module.exports = { logError, errorHandler }
