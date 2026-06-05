const fs =
require("fs");

const pdfParse =
require("pdf-parse");

const prisma =
require("../../config/prisma");

const recommendationService =
require(
    "../recommendation/recommendation.service"
);

const {
    extractSkills
} = require(
    "../../utils/skillExtractor"
);

const processResume =
async (
    filePath,
    userId
) => {

    const dataBuffer =
        fs.readFileSync(
            filePath
        );

    const pdfData =
        await pdfParse(
            dataBuffer
        );

    const skills =
        extractSkills(
            pdfData.text
        );

    const profile =
        await prisma.profile.update({

            where: {
                userId
            },

            data: {
                skills
            }
        });

    await recommendationService
        .generateRecommendations(
            userId
        );

    return {

        profile,

        skills
    };
};

module.exports = {
    processResume
};