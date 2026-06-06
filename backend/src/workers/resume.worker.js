const { Worker } =
require("bullmq");

const resumeService =
require(
    "../modules/resume/resume.service"
);

const bullmqConfig =
require("../config/bullmq");

const worker =
new Worker(

    "resume-processing",

    async job => {

        console.log(
            "Processing Resume Job:",
            job.id
        );

        const {

            filePath,

            userId

        } = job.data;

        await resumeService
            .processResume(

                filePath,

                userId
            );

        console.log(
            "Resume Processed:",
            userId
        );
    },

    bullmqConfig
);

worker.on(
    "completed",
    job => {
        console.log(
            `Job ${job.id} completed`
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
            `Job ${job.id} failed:`,
            err.message
        );
    }
);

module.exports =
worker;