const prisma =
require("../../config/prisma");

const feedService =
require("../feed/feed.service");

const {
    redisClient
} = require(
    "../../config/redis"
);

const getDashboardStats =
async (userId) => {

    const cacheKey =
    `dashboard:${userId}`;

    const cachedDashboard =
    await redisClient.get(
        cacheKey
    );

    if (cachedDashboard) {

        console.log(
            "DASHBOARD CACHE HIT"
        );

        return JSON.parse(
            cachedDashboard
        );
    }

    console.log(
        "DASHBOARD CACHE MISS"
    );

    const applications =
        await prisma.application.findMany({

            where: {
                userId
            }
        });

    const stats = {

        saved: 0,

        applied: 0,

        interview: 0,

        offer: 0,

        rejected: 0,

        totalApplications:
            applications.length
    };

    applications.forEach(
        application => {

            const status =
                application.status
                    .toLowerCase();

            if (
                stats[status] !==
                undefined
            ) {

                stats[status]++;
            }
        }
    );

    const learningPath =
        await feedService
        .getLearningPath(
            userId
        );

    const dashboard = {

        ...stats,

        topMissingSkills:
            learningPath
                .slice(0, 5)
                .map(
                    item =>
                    item.skill
                )
    };

    await redisClient.set(

        cacheKey,

        JSON.stringify(
            dashboard
        ),

        {
            EX: 300
        }
    );

    return dashboard;
};

module.exports = {
    getDashboardStats
};