const prisma =
require("../../config/prisma");

const {
    extractSkills
} = require("../../utils/skillExtractor");

const fetchJobs =
async () => {

    const response =
    await fetch(
        "https://remotive.com/api/remote-jobs"
    );

    const data =
    await response.json();

    return data.jobs;
};

const syncJobs =
async () => {

    const jobs =
    await fetchJobs();

    let created = 0;

    for(
        const job
        of jobs.slice(0, 100)
    ){

        const exists =
        await prisma.opportunity.findFirst({
            where:{
                title: job.title,
                company:
                job.company_name
            }
        });

        if(exists){
            continue;
        }

        await prisma.opportunity.create({

            data:{

                title:
                job.title,

                company:
                job.company_name,

                description:
                job.description,

                type:"JOB",

                location:
                job.candidate_required_location,

                sourceUrl:
                job.url,

                requiredSkills:[]
            }
        });

        created++;
    }

    return {
        totalFetched:
        jobs.length,

        created
    };
};

const refreshSkills = async () => {

    const opportunities =
        await prisma.opportunity.findMany();

    let updated = 0;

    for (
        const opportunity
        of opportunities
    ) {

        const skills =
            extractSkills(
                opportunity.description
            );

        await prisma.opportunity.update({

            where: {
                id: opportunity.id
            },

            data: {
                requiredSkills:
                    skills
            }
        });

        updated++;
    }

    return {
        updated
    };
};

module.exports = {
    syncJobs,
    refreshSkills
};