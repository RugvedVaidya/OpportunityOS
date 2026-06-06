const { Queue } =
require("bullmq");

const bullmqConfig =
require("../config/bullmq");

const recommendationQueue =
new Queue(
    "recommendation-processing",
    bullmqConfig
);

module.exports =
recommendationQueue;