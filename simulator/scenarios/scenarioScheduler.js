import {
    setScenario
} from "../state/simulatorState.js";

const scenarioSequence = [
    {
        name: "normal",
        duration: 20000
    },

    {
        name: "highCpu",
        duration: 20000
    },

    {
        name: "normal",
        duration: 20000
    },

    {
        name: "databaseFailure",
        duration: 20000
    },

    {
        name: "normal",
        duration: 20000
    },

    {
        name: "paymentFailure",
        duration: 20000
    },

    {
        name: "normal",
        duration: 20000
    },

    {
        name: "networkLatency",
        duration: 20000
    }
];

let currentIndex = 0;

const getCurrentScenario = () => {
    return scenarioSequence[
        currentIndex
    ].name;
};

const startScenarioScheduler = (
    onScenarioChange
) => {
    const switchScenario = () => {
        currentIndex =
            (currentIndex + 1) %
            scenarioSequence.length;

        const nextScenario =
            scenarioSequence[currentIndex];

        setScenario(
            nextScenario.name
        );

        console.log(
            `[SCENARIO] ${nextScenario.name}`
        );

        if (onScenarioChange) {
            onScenarioChange(
                nextScenario.name
            );
        }

        setTimeout(
            switchScenario,
            nextScenario.duration
        );
    };

    setScenario(
        scenarioSequence[0].name
    );

    console.log(
        `[SCENARIO] ${scenarioSequence[0].name}`
    );

    setTimeout(
        switchScenario,
        scenarioSequence[0].duration
    );
};

export {
    getCurrentScenario,
    startScenarioScheduler
};