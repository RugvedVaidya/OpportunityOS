const feedService =
require("./feed.service");

const getFeed =
async (req, res) => {

    const feed =
        await feedService
        .getFeed(
            req.user.userId
        );

    return res.json(feed);
};

const getLearningPath =
async (req, res) => {

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
    getFeed,
    getLearningPath
};