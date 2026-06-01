const matchingService =
require("./matching.service");

const getMyMatches =
async(req,res) => {

    const matches =
    await matchingService
    .getMatchesForUser(
        req.user.userId
    );

    return res.json(matches);
};

module.exports = {
    getMyMatches
};