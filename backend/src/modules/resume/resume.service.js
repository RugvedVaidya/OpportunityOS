const fs = require("fs");
const pdfParse = require("pdf-parse");

const prisma =
require("../../config/prisma");

const recommendationQueue =
require("../../queues/recommendation.queue");

const KNOWN_SKILLS = [

    "Java",
    "Spring",
    "Spring Boot",
    "Redis",
    "Kafka",
    "Docker",
    "Kubernetes",
    "AWS",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Node.js",
    "Express",
    "React",
    "TypeScript",
    "Python",
    "Go",
    "GraphQL",
    "Microservices"
];

const extractSkills =
(text) => {

    const foundSkills = [];

    const lowerText =
    text.toLowerCase();

    for (
        const skill
        of KNOWN_SKILLS
    ) {

        if (
            lowerText.includes(
                skill.toLowerCase()
            )
        ) {

            foundSkills.push(
                skill
            );
        }
    }

    return foundSkills;
};

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

    // Queue recommendation generation
    await recommendationQueue.add(

        "generate-recommendations",

        {
            userId
        },

        {
            attempts: 3,

            backoff: {

                type:
                "exponential",

                delay:
                2000
            }
        }
    );

    return {

        skills,

        profile
    };
};

module.exports = {
    processResume
};