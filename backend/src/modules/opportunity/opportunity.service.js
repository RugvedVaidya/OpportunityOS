const prisma = require("../../config/prisma");

const createOpportunity = async (data) => {

    return prisma.opportunity.create({
        data
    });
};

const getAllOpportunities = async (
    page = 1,
    limit = 10,
    filters = {}
) => {

    const skip = (page - 1) * limit;

    const where = {};

    if (filters.search) {

        where.OR = [
            {
                title: {
                    contains: filters.search,
                    mode: "insensitive"
                }
            },
            {
                company: {
                    contains: filters.search,
                    mode: "insensitive"
                }
            }
        ];
    }

    if (filters.company) {

        where.company = {
            contains: filters.company,
            mode: "insensitive"
        };
    }

    if (filters.type) {
        where.type = filters.type;
    }

    const [opportunities, total] =
        await Promise.all([
            prisma.opportunity.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                }
            }),
            prisma.opportunity.count({
                where
            })
        ]);

    return {
        opportunities,
        total,
        page,
        limit,
        totalPages:
            Math.ceil(total / limit)
    };
};

const getOpportunityById =
async (id) => {

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