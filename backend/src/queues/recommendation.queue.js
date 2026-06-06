const { Queue } =
require("bullmq");

const recommendationQueue =
new Queue(

    "recommendation-processing",

    {

        connection: {

            host: "localhost",

            port: 6379
        }
    }
);

module.exports =
recommendationQueue;