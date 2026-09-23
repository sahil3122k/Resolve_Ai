import express from "express";

const router = express.Router();

router.get(
    "/status",
    (req, res) => {
        res.status(200).json({
            success: true,
            simulator: "running"
        });
    }
);

export default router;