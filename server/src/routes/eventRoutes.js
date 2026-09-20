import express from "express";

import {
    createEvent,
    getEvents
} from "../controllers/eventController.js";

import validateEvent from "../middleware/eventValidation.js";

const router = express.Router();

router.post(
    "/",
    validateEvent,
    createEvent
);

router.get(
    "/",
    getEvents
);

export default router;