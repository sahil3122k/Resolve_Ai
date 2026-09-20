const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
};

const errorHandler = (error, req, res, next) => {
    console.error(
        `[ERROR] ${req.method} ${req.originalUrl} - ${error.message}`
    );

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(error.errors).map(
                (item) => item.message
            )
        });
    }

    return res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Internal server error"
                : error.message
    });
};

export {
    notFoundHandler,
    errorHandler
};