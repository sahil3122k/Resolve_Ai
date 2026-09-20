import { body, validationResult } from "express-validator";

const validateEvent = [
    body("service")
        .trim()
        .notEmpty()
        .withMessage("service is required")
        .isLength({ max: 100 })
        .withMessage("service must not exceed 100 characters"),

    body("type")
        .trim()
        .isIn([
            "metric",
            "log",
            "deployment",
            "health"
        ])
        .withMessage(
            "type must be metric, log, deployment, or health"
        ),

    body("level")
        .optional()
        .trim()
        .isIn([
            "INFO",
            "WARN",
            "ERROR",
            "CRITICAL"
        ])
        .withMessage(
            "level must be INFO, WARN, ERROR, or CRITICAL"
        ),

    body("message")
        .optional()
        .isString()
        .withMessage("message must be a string")
        .isLength({ max: 5000 })
        .withMessage(
            "message must not exceed 5000 characters"
        ),

    body("cpu")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("cpu must be between 0 and 100"),

    body("memory")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage(
            "memory must be between 0 and 100"
        ),

    body("latency")
        .optional()
        .isFloat({ min: 0 })
        .withMessage(
            "latency must be greater than or equal to 0"
        ),

    body("errorRate")
        .optional()
        .isFloat({ min: 0, max: 1 })
        .withMessage(
            "errorRate must be between 0 and 1"
        ),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Invalid event data",
                errors: errors.array().map((error) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }

        next();
    }
];

export default validateEvent;