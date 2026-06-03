const recommendationService =
require(
    "../recommendation/recommendation.service"
);

const matchingService =
require(
    "../matching/matching.service"
);

const {
    redisClient
} = require(
    "../../config/redis"
);

const getFeed =
async (userId) => {

    const cacheKey =
    `feed:${userId}`;

    const cachedFeed =
    await redisClient.get(
        cacheKey
    );

    if (cachedFeed) {

        console.log(
            "FEED CACHE HIT"
        );

        return JSON.parse(
            cachedFeed
        );
    }

    console.log(
        "FEED CACHE MISS"
    );

    const recommendations =
        await recommendationService
        .getRecommendations(
            userId
        );

    const feed =
        recommendations.map(
            recommendation => ({

                id:
                    recommendation
                    .opportunity.id,

                title:
                    recommendation
                    .opportunity.title,

                company:
                    recommendation
                    .opportunity.company,

                description:
                    recommendation
                    .opportunity.description,

                requiredSkills:
                    recommendation
                    .opportunity.requiredSkills,

                location:
                    recommendation
                    .opportunity.location,

                score:
                    recommendation.score
            })
        );

    await redisClient.set(

        cacheKey,

        JSON.stringify(
            feed
        ),

        {
            EX: 300
        }
    );

    return feed;
};

const getLearningPath =
async (userId) => {

    const matches =
        await matchingService
        .getMatchesForUser(
            userId
        );

    const skillFrequency =
        {};

    matches
        .slice(0, 50)
        .forEach(match => {

            match.missingSkills
                .forEach(skill => {

                    skillFrequency[
                        skill
                    ] =
                    (
                        skillFrequency[
                            skill
                        ] || 0
                    ) + 1;
                });
        });

    return Object
        .entries(
            skillFrequency
        )
        .sort(
            (a, b) =>
                b[1] - a[1]
        )
        .slice(0, 10)
        .map(
            ([skill, count]) => ({
                skill,
                count
            })
        );
};

module.exports = {
    getFeed,
    getLearningPath
};