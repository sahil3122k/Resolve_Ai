
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDB, disconnectDB } from "./config/db.js";
import validateEnvironment from "./config/env.js";

import eventRoutes from "./routes/eventRoutes.js";

import securityMiddleware from "./middleware/security.js";
import requestLogger from "./middleware/logger.js";

import {
    notFoundHandler,
    errorHandler
} from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
    try {
        // Validate environment
        validateEnvironment();

        // Connect database
        await connectDB();

        // Security
        securityMiddleware(app);

        // CORS
        app.use(
            cors({
                origin: process.env.CORS_ORIGIN,
                credentials: true
            })
        );

        // Request body
        app.use(
            express.json({
                limit: "1mb"
            })
        );

        // Logging
        app.use(requestLogger);

        // Root
        app.get("/", (req, res) => {
            res.status(200).json({
                success: true,
                message: "ResolveAI backend is running"
            });
        });

        // Liveness
        app.get("/api/health", (req, res) => {
            res.status(200).json({
                success: true,
                status: "healthy",
                service: "ResolveAI API"
            });
        });

        // Readiness
        app.get("/api/ready", (req, res) => {
            const databaseReady =
                mongoose.connection.readyState === 1;

            if (!databaseReady) {
                return res.status(503).json({
                    success: false,
                    status: "not_ready",
                    database: "disconnected"
                });
            }

            return res.status(200).json({
                success: true,
                status: "ready",
                database: "connected"
            });
        });

        // API routes
        app.use(
            "/api/events",
            eventRoutes
        );

        // 404
        app.use(notFoundHandler);

        // Error handler
        app.use(errorHandler);

        const server = app.listen(
            PORT,
            () => {
                console.log(
                    `ResolveAI server running on port ${PORT}`
                );
            }
        );

        // Graceful shutdown
        const shutdown = async (signal) => {
            console.log(
                `${signal} received. Shutting down gracefully...`
            );

            server.close(async () => {
                await disconnectDB();

                console.log(
                    "ResolveAI server stopped"
                );

                process.exit(0);
            });
        };

        process.on(
            "SIGTERM",
            () => shutdown("SIGTERM")
        );

        process.on(
            "SIGINT",
            () => shutdown("SIGINT")
        );
    } catch (error) {
        console.error(
            `Server startup failed: ${error.message}`
        );

        process.exit(1);
    }
};

startServer();