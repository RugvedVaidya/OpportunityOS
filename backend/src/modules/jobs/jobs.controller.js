const jobsService =
require("./jobs.service");

const getQueueStats =
async (req,res) => {

    const stats =
        await jobsService
            .getQueueStats();

    return res.json({

        success:true,

        data:stats
    });
};

const getFailedJobs =
async (req,res) => {

    const failedJobs =
        await jobsService
            .getFailedJobs();

    return res.json({

        success:true,

        data:failedJobs
    });
};

module.exports = {

    getQueueStats,

    getFailedJobs
};