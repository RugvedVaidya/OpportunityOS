const recommendationService =
require("./recommendation.service");

const generateRecommendations =
async (req,res) => {

    const result =
        await recommendationService
        .generateRecommendations(
            req.user.userId
        );

    return res.json({
        success:true,
        ...result
    });
};

const getRecommendations =
async (req,res) => {

    const result =
        await recommendationService
        .getRecommendations(
            req.user.userId
        );

    return res.json(result);
};

module.exports = {
    generateRecommendations,
    getRecommendations
};