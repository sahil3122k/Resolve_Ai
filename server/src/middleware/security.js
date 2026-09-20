import helmet from "helmet";
import rateLimit from "express-rate-limit";

const securityMiddleware = (app) => {
    app.use(
        helmet()
    );

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: "draft-8",
            legacyHeaders: false,
            message: {
                success: false,
                message: "Too many requests. Please try again later."
            }
        })
    );
};

export default securityMiddleware;