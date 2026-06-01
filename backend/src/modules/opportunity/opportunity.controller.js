const opportunityService =
require("./opportunity.service");

const createOpportunity =
async (req, res) => {

    const opportunity =
        await opportunityService
            .createOpportunity(req.body);

    return res.status(201).json({
        success: true,
        opportunity
    });
};

const getAllOpportunities =
async (req, res) => {

    const page =
        Number(req.query.page) || 1;

    const limit =
        Number(req.query.limit) || 10;

    const filters = {
        search: req.query.search,
        company: req.query.company,
        type: req.query.type
    };

    const result =
        await opportunityService
            .getAllOpportunities(
                page,
                limit,
                filters
            );

    return res.json(result);
};

const getOpportunityById =
async (req, res) => {

    const opportunity =
        await opportunityService
            .getOpportunityById(
                req.params.id
            );

    return res.json(opportunity);
};

module.exports = {
    createOpportunity,
    getAllOpportunities,
    getOpportunityById
};