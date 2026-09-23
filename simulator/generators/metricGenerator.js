const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};

const randomInteger = (min, max) => {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
};

const generateMetric = (
    service,
    scenario = "normal"
) => {
    let cpu = randomNumber(20, 80);
    let memory = randomNumber(30, 75);
    let latency = randomInteger(50, 500);
    let errorRate = randomNumber(0, 0.05);

    if (
        scenario === "highCpu" &&
        service === "payment-service"
    ) {
        cpu = randomNumber(85, 100);
        memory = randomNumber(70, 95);
        latency = randomInteger(500, 1500);
        errorRate = randomNumber(0.05, 0.2);
    }

    if (
        scenario === "databaseFailure" &&
        (
            service === "payment-service" ||
            service === "order-service"
        )
    ) {
        cpu = randomNumber(60, 90);
        memory = randomNumber(60, 90);
        latency = randomInteger(1500, 5000);
        errorRate = randomNumber(0.2, 0.7);
    }

    if (
        scenario === "paymentFailure" &&
        service === "payment-service"
    ) {
        cpu = randomNumber(70, 95);
        memory = randomNumber(70, 90);
        latency = randomInteger(1000, 4000);
        errorRate = randomNumber(0.3, 0.8);
    }

    if (
        scenario === "networkLatency"
    ) {
        latency = randomInteger(1500, 5000);
        errorRate = randomNumber(0.05, 0.25);
    }

    return {
        service,
        type: "metric",

        cpu: Number(cpu.toFixed(2)),

        memory: Number(memory.toFixed(2)),

        latency,

        errorRate: Number(
            errorRate.toFixed(4)
        )
    };
};

export {
    generateMetric
};