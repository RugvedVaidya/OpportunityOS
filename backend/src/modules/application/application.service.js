const prisma =
require("../../config/prisma");

const {
    redisClient
} = require(
    "../../config/redis"
);

const saveJob =
async (
    userId,
    opportunityId
) => {

    const application =
        await prisma.application.create({

            data: {

                userId,

                opportunityId,

                status: "SAVED"
            }
        });

    await redisClient.del(
        `dashboard:${userId}`
    );

    return application;
};

const updateStatus =
async (
    applicationId,
    status
) => {

    const application =
        await prisma.application.update({

            where: {
                id: applicationId
            },

            data: {
                status
            }
        });

    await redisClient.del(
        `dashboard:${application.userId}`
    );

    return application;
};

const getMyApplications =
async (userId) => {

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