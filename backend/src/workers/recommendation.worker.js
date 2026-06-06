const { Worker } =
require("bullmq");

const recommendationService =
require(
    "../modules/recommendation/recommendation.service"
);

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

    {

        connection: {

            host:
            "localhost",

            port:
            6379
        }
    }
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