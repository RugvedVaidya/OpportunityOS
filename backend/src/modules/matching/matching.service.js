const prisma =
require("../../config/prisma");

const calculateSkillScore = (
    userSkills,
    requiredSkills
) => {

    if (!requiredSkills?.length) {
        return 0;
    }

    const userSkillSet =
        new Set(
            userSkills.map(skill =>
                skill.toLowerCase()
            )
        );

    const matched =
        requiredSkills.filter(skill =>
            userSkillSet.has(
                skill.toLowerCase()
            )
        );

    return (
        matched.length /
        requiredSkills.length
    ) * 100;
};

const calculateExperienceScore = (
    userExp,
    requiredExp
) => {

    if (!requiredExp) {
        return 100;
    }

    return Math.min(
        100,
        (
            (userExp || 0) /
            requiredExp
        ) * 100
    );
};

const calculateLocationScore = (
    userLocation,
    jobLocation
) => {

    if (!jobLocation) {
        return 100;
    }

    return (
        userLocation?.toLowerCase() ===
        jobLocation?.toLowerCase()
    )
        ? 100
        : 0;
};

const calculateSalaryScore = (
    targetSalary,
    salaryMax
) => {

    if (!salaryMax) {
        return 100;
    }

    return targetSalary <= salaryMax
        ? 100
        : 0;
};

const getSkillAnalysis = (
    userSkills,
    requiredSkills
) => {

    const userSkillSet =
        new Set(
            userSkills.map(skill =>
                skill.toLowerCase()
            )
        );

    const matchedSkills =
        requiredSkills.filter(skill =>
            userSkillSet.has(
                skill.toLowerCase()
            )
        );

    const missingSkills =
        requiredSkills.filter(skill =>
            !userSkillSet.has(
                skill.toLowerCase()
            )
        );

    return {
        matchedSkills,
        missingSkills
    };
};

const calculateFinalScore = (
    profile,
    opportunity
) => {

    const skillScore =
        calculateSkillScore(
            profile.skills || [],
            opportunity.requiredSkills || []
        );

    const experienceScore =
        calculateExperienceScore(
            profile.experienceYears,
            opportunity.experienceRequired
        );

    const locationScore =
        calculateLocationScore(
            profile.location,
            opportunity.location
        );

    const salaryScore =
        calculateSalaryScore(
            profile.targetSalary,
            opportunity.salaryMax
        );

    return (

        skillScore * 0.5 +

        experienceScore * 0.2 +

        locationScore * 0.15 +

        salaryScore * 0.15
    );
};

const getMatchesForUser =
async (userId) => {

    const profile =
        await prisma.profile.findUnique({
            where: {
                userId
            }
        });

    if (!profile) {
        throw new Error(
            "Profile not found"
        );
    }

    const opportunities =
        await prisma.opportunity.findMany();

    return opportunities

        .map(opportunity => {

            const score =
                calculateFinalScore(
                    profile,
                    opportunity
                );

            const analysis =
                getSkillAnalysis(
                    profile.skills || [],
                    opportunity.requiredSkills || []
                );

            return {

                ...opportunity,

                matchScore:
                    Math.round(score),

                matchedSkills:
                    analysis.matchedSkills,

                missingSkills:
                    analysis.missingSkills
            };
        })

        .sort(
            (a, b) =>
                b.matchScore -
                a.matchScore
        );
};

module.exports = {
    getMatchesForUser
};