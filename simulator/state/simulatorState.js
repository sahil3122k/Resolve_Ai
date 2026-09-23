let currentScenario = "normal";

let scenarioStartedAt = new Date();

const setScenario = (scenario) => {
    currentScenario = scenario;
    scenarioStartedAt = new Date();
};

const getSimulatorState = () => {
    return {
        scenario: currentScenario,
        startedAt: scenarioStartedAt
    };
};

export {
    setScenario,
    getSimulatorState
};