const jobSyncService =
require("./jobSync.service");

const syncJobs =
async(req,res) => {

    try{

        const result =
        await jobSyncService
        .syncJobs();

        return res.json({
            success:true,
            ...result
        });

    }catch(err){

        return res
        .status(500)
        .json({
            success:false,
            message:
            err.message
        });
    }
};

const refreshSkills =
async (req,res) => {

    const result =
        await jobSyncService
        .refreshSkills();

    return res.json({
        success:true,
        ...result
    });
};

const getLearningPath =
async (
    req,
    res
) => {

    const result =
        await feedService
        .getLearningPath(
            req.user.userId
        );

    return res.json({
        topMissingSkills:
            result
    });
};

module.exports = {
    syncJobs,
    refreshSkills,
    getLearningPath
};