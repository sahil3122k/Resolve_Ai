import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        service: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        type: {
            type: String,
            required: true,
            enum: [
                "metric",
                "log",
                "deployment",
                "health"
            ]
        },

        level: {
            type: String,
            enum: [
                "INFO",
                "WARN",
                "ERROR",
                "CRITICAL"
            ],
            default: "INFO"
        },

        message: {
            type: String,
            default: "",
            maxlength: 5000
        },

        cpu: {
            type: Number,
            min: 0,
            max: 100
        },

        memory: {
            type: Number,
            min: 0,
            max: 100
        },

        latency: {
            type: Number,
            min: 0
        },

        errorRate: {
            type: Number,
            min: 0,
            max: 1
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

// Indexes for common ResolveAI queries
eventSchema.index({
    service: 1,
    createdAt: -1
});

eventSchema.index({
    type: 1,
    createdAt: -1
});

eventSchema.index({
    level: 1,
    createdAt: -1
});

const Event = mongoose.model(
    "Event",
    eventSchema
);

export default Event;