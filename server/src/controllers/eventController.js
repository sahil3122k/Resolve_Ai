import Event from "../models/Event.js";

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });
    } catch (error) {
        console.error("Create event error:", error.message);

        res.status(400).json({
            success: false,
            message: "Failed to create event",
            error: error.message
        });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        console.error("Get events error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch events",
            error: error.message
        });
    }
};
export  {
    createEvent,
    getEvents
};