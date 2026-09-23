const normalMessages = [
    "Request processed successfully",
    "Database query completed",
    "User authenticated",
    "Order created successfully",
    "Payment processed successfully"
];

const warningMessages = [
    "Response time increased",
    "Database connection pool is getting busy",
    "High memory usage detected"
];

const errorMessages = [
    "Database connection timeout",
    "Payment processing failed",
    "Internal service unavailable",
    "Request processing failed"
];

const randomItem = (items) => {
    const index = Math.floor(
        Math.random() * items.length
    );

    return items[index];
};

const generateLog = (
    service,
    scenario = "normal"
) => {

    if (
        scenario === "databaseFailure" &&
        (
            service === "payment-service" ||
            service === "order-service"
        )
    ) {
        return {
            service,
            type: "log",
            level: "ERROR",
            message: randomItem([
                "Database connection timeout",
                "Database connection refused",
                "Database query timeout",
                "Database unavailable"
            ])
        };
    }

    if (
        scenario === "paymentFailure" &&
        service === "payment-service"
    ) {
        return {
            service,
            type: "log",
            level: "ERROR",
            message: randomItem([
                "Payment gateway unavailable",
                "Payment processing failed",
                "Transaction timeout",
                "Payment service error"
            ])
        };
    }

    if (
        scenario === "highCpu" &&
        service === "payment-service"
    ) {
        return {
            service,
            type: "log",
            level: "WARN",
            message: "CPU utilization is critically high"
        };
    }

    if (
        scenario === "networkLatency"
    ) {
        return {
            service,
            type: "log",
            level: "WARN",
            message: "Network latency is unusually high"
        };
    }

    const randomValue = Math.random();

    if (randomValue < 0.7) {
        return {
            service,
            type: "log",
            level: "INFO",
            message: randomItem(normalMessages)
        };
    }

    if (randomValue < 0.95) {
        return {
            service,
            type: "log",
            level: "WARN",
            message: randomItem(warningMessages)
        };
    }

    return {
        service,
        type: "log",
        level: "ERROR",
        message: randomItem(errorMessages)
    };
};

export {
    generateLog
};