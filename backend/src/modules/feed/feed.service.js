const matchingService =
require("../matching/matching.service");

const getFeed = async (
    userId
) => {

    const matches =
        await matchingService
        .getMatchesForUser(
            userId
        );

    return matches.slice(
        0,
        20
    );
};

const getLearningPath =
async (
    userId
) => {

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
            (a,b) =>
                b[1] - a[1]
        )
        .slice(0, 10)
        .map(
            ([skill,count]) => ({
                skill,
                count
            })
        );
};

module.exports = {
    getFeed,
    getLearningPath
};