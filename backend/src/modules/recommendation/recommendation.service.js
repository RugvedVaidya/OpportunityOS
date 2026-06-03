const prisma =
require("../../config/prisma");

const matchingService =
require("../matching/matching.service");

const {
    redisClient
} = require(
    "../../config/redis"
);

const generateRecommendations =
async (userId) => {

    const matches =
        await matchingService
        .getMatchesForUser(
            userId
        );

    await prisma.recommendation.deleteMany({

        where: {
            userId
        }
    });

    for (
        const match
        of matches
    ) {

        await prisma.recommendation.create({

            data: {

                userId,

                opportunityId:
                    match.id,

                score:
                    match.matchScore
            }
        });
    }

    await redisClient.del(
        `feed:${userId}`
    );

    await redisClient.del(
        `dashboard:${userId}`
    );

    await redisClient.del(
        `recommendations:${userId}`
    );

    return {

        generated:
            matches.length
    };
};

const getRecommendations =
async (userId) => {

    const cacheKey =
    `recommendations:${userId}`;

    const cached =
        await redisClient.get(
            cacheKey
        );

    if (cached) {

        console.log(
            "RECOMMENDATION CACHE HIT"
        );

        return JSON.parse(
            cached
        );
    }

    console.log(
        "RECOMMENDATION CACHE MISS"
    );

    const recommendations =
        await prisma.recommendation.findMany({

            where: {
                userId
            },

            include: {
                opportunity: true
            },

            orderBy: {
                score: "desc"
            }
        });

    await redisClient.set(

        cacheKey,

        JSON.stringify(
            recommendations
        ),

        {
            EX: 300
        }
    );

    return recommendations;
};

module.exports = {

    generateRecommendations,

    getRecommendations
};