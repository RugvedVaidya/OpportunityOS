const prisma =
require("../../config/prisma");

const saveJob =
async (
    userId,
    opportunityId
) => {

    return prisma.application.create({

        data: {

            userId,

            opportunityId,

            status: "SAVED"
        }
    });
};

const updateStatus =
async (
    applicationId,
    status
) => {

    return prisma.application.update({

        where: {
            id: applicationId
        },

        data: {
            status
        }
    });
};

const getMyApplications =
async (
    userId
) => {

    return prisma.application.findMany({

        where: {
            userId
        },

        include: {
            opportunity: true
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};

module.exports = {
    saveJob,
    updateStatus,
    getMyApplications
};