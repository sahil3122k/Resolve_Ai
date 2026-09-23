import http from "node:http";

import {
    getSimulatorState
} from "./state/simulatorState.js";

const PORT = 6000;

const server = http.createServer(
    (req, res) => {
        if (
            req.method === "GET" &&
            req.url === "/status"
        ) {
            const state =
                getSimulatorState();

            res.writeHead(
                200,
                {
                    "Content-Type":
                        "application/json"
                }
            );

            res.end(
                JSON.stringify({
                    success: true,
                    simulator: "running",
                    scenario:
                        state.scenario,
                    scenarioStartedAt:
                        state.startedAt
                })
            );

            return;
        }

        res.writeHead(
            404,
            {
                "Content-Type":
                    "application/json"
            }
        );

        res.end(
            JSON.stringify({
                success: false,
                message: "Route not found"
            })
        );
    }
);

const startStatusServer = () => {
    server.listen(
        PORT,
        () => {
            console.log(
                `Simulator status server running on port ${PORT}`
            );
        }
    );
};

export default startStatusServer;