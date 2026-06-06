const resumeQueue =
require("../../queues/resume.queue");

const recommendationQueue =
require("../../queues/recommendation.queue");

const getQueueStats =
async () => {

    const resumeStats = {

        waiting:
            await resumeQueue.getWaitingCount(),

        active:
            await resumeQueue.getActiveCount(),

        completed:
            await resumeQueue.getCompletedCount(),

        failed:
            await resumeQueue.getFailedCount()
    };

    const recommendationStats = {

        waiting:
            await recommendationQueue
                .getWaitingCount(),

        active:
            await recommendationQueue
                .getActiveCount(),

        completed:
            await recommendationQueue
                .getCompletedCount(),

        failed:
            await recommendationQueue
                .getFailedCount()
    };

    return {

        resumeQueue:
            resumeStats,

        recommendationQueue:
            recommendationStats
    };
};

const getFailedJobs =
async () => {

    const failedResumeJobs =
        await resumeQueue.getFailed();

    const failedRecommendationJobs =
        await recommendationQueue
            .getFailed();

    return {

        failedResumeJobs,

        failedRecommendationJobs
    };
};

module.exports = {

    getQueueStats,

    getFailedJobs
};