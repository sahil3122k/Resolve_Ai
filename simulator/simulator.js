import services from "./services/services.js";
import startStatusServer
    from "./statusServer.js";
import {
    getCurrentScenario,
    startScenarioScheduler
} from "./scenarios/scenarioScheduler.js";

import {
    generateMetric
} from "./generators/metricGenerator.js";

import {
    generateLog
} from "./generators/logGenerator.js";

const API_URL =
    process.env.RESOLVE_API_URL ||
    "http://localhost:5000/api/events";

    

const sendEvent = async (event) => {
    try {
        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(event)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Event rejected:",
                data
            );

            return;
        }

        console.log(
            `[SIMULATOR] ${event.service} → ${event.type}`
        );
    } catch (error) {
        console.error(
            `[SIMULATOR] Failed to send event: ${error.message}`
        );
    }
};

const generateEvents = async () => {
    const currentScenario =
        getCurrentScenario();

    console.log(
        `[SIMULATOR] Generating events | Scenario: ${currentScenario}`
    );

    for (const service of services) {
        const metric = generateMetric(
            service,
            currentScenario
        );

        await sendEvent(metric);

        const log = generateLog(
            service,
            currentScenario
        );

        await sendEvent(log);
    }
};
const startSimulator = async () => {
    console.log(
        "ResolveAI simulator started"
    );

    startStatusServer();

    startScenarioScheduler(
        (scenario) => {
            console.log(
                `[SIMULATOR] Active scenario: ${scenario}`
            );
        }
    );

    await generateEvents();

    setInterval(
        generateEvents,
        5000
    );
};
startSimulator();