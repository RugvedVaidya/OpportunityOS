const feedService =
require("./feed.service");

const getFeed =
async (req,res) => {

    try {

        const feed =
            await feedService
            .getFeed(
                req.user.userId
            );

        return res.json(feed);

    } catch(err){

        console.error(err);

        return res.status(500).json({

            success:false,

            message:
                err.message
        });
    }
};

const getLearningPath =
async (req,res) => {

    try {

        const result =
            await feedService
            .getLearningPath(
                req.user.userId
            );

        return res.json({

            topMissingSkills:
                result
        });

    } catch(err){

        console.error(err);

        return res.status(500).json({

            success:false,

            message:
                err.message
        });
    }
};

module.exports = {
    getFeed,
    getLearningPath
};