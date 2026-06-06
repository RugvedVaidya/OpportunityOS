const { Worker } =
require("bullmq");

const recommendationService =
require(
    "../modules/recommendation/recommendation.service"
);

const bullmqConfig =
require("../config/bullmq");

const worker =
new Worker(

    "recommendation-processing",

    async job => {

        const {

            userId

        } = job.data;

        console.log(

            "Generating Recommendations:",

            userId
        );

        await recommendationService
            .generateRecommendations(
                userId
            );
    },

    bullmqConfig
);

worker.on(

    "completed",

    job => {

        console.log(

            `Recommendation Job ${job.id} completed`
        );
    }
);

worker.on(

    "failed",

    (
        job,
        err
    ) => {

        console.error(

            `Recommendation Job ${job.id} failed:`,

            err.message
        );
    }
);

module.exports =
worker;