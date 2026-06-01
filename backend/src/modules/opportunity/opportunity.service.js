const prisma = require("../../config/prisma");

const createOpportunity = async (data) => {

    console.log("SERVICE DATA:", data);

    return prisma.opportunity.create({
        data
    });
};

const getAllOpportunities = async (
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    return prisma.opportunity.findMany({
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc"
        }
    });
};

const getOpportunityById = async(id) => {

    return prisma.opportunity.findUnique({
        where: {
            id
        }
    });
};

module.exports = {
    createOpportunity,
    getAllOpportunities,
    getOpportunityById
};