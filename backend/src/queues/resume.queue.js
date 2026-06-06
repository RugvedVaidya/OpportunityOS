const { Queue } =
require("bullmq");

const bullmqConfig =
require("../config/bullmq");

const resumeQueue =
new Queue(

    "resume-processing",

    bullmqConfig
);

module.exports =
resumeQueue;