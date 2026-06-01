const prisma = require("../../config/prisma");

const calculateMatchScore = (
    userSkills,
    requiredSkills
) => {

    if(requiredSkills.length === 0){
        return 0;
    }

    const matchedSkills =
    requiredSkills.filter(
        skill =>
        userSkills.includes(skill)
    );

    return Math.round(
        (matchedSkills.length /
        requiredSkills.length) * 100
    );
};

const getMatchesForUser =
async(userId) => {

    const profile =
    await prisma.profile.findUnique({
        where:{
            userId
        }
    });

    if(!profile){
        throw new Error(
            "Profile not found"
        );
    }

    const opportunities =
    await prisma.opportunity.findMany();

    return opportunities.map(
        opportunity => ({

            ...opportunity,

            matchScore:
            calculateMatchScore(
                profile.skills || [],
                opportunity.requiredSkills
            )
        })
    );
};

module.exports = {
    getMatchesForUser
};