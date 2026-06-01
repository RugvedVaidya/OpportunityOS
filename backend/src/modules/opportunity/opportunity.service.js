const prisma = require("../../config/prisma");

const createOpportunity = async (data) => {

    console.log("SERVICE DATA:", data);

    return prisma.opportunity.create({
        data
    });
};

module.exports = {
    createOpportunity
};