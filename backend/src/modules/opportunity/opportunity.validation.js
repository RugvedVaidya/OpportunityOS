const { z } = require("zod");

const createOpportunitySchema = z.object({
    title: z.string().min(3),
    company: z.string().min(2),
    description: z.string().min(5),

    type: z.enum([
        "JOB",
        "INTERNSHIP",
        "HACKATHON",
        "SCHOLARSHIP"
    ]),

    requiredSkills: z.array(
        z.string()
    ).min(1)
});

module.exports = {
    createOpportunitySchema
};