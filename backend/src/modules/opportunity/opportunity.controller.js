const opportunityService =
require("./opportunity.service");

const createOpportunity = async (req, res) => {

    console.log("REQUEST BODY:", req.body);

    const opportunity =
        await opportunityService.createOpportunity(
            req.body
        );

    return res.status(201).json({
        success: true,
        opportunity
    });
};

module.exports = {
    createOpportunity
};