const scenarios = {
    normal: {
        name: "normal",
        description: "Normal system behavior"
    },

    highCpu: {
        name: "highCpu",
        description: "High CPU usage on payment service"
    },

    databaseFailure: {
        name: "databaseFailure",
        description: "Database failure affecting payment service"
    },

    paymentFailure: {
        name: "paymentFailure",
        description: "Payment service experiencing failures"
    },

    networkLatency: {
        name: "networkLatency",
        description: "High network latency affecting services"
    }
};

export default scenarios;