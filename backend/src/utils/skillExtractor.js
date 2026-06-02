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

const extractSkills = (text) => {

    const lowerText =
        text.toLowerCase();

    return KNOWN_SKILLS.filter(
        skill =>
            lowerText.includes(
                skill.toLowerCase()
            )
    );
};

module.exports = {
    extractSkills
};