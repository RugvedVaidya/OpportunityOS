const cron =
require("node-cron");

const prisma =
require("../config/prisma");

const jobSyncService =
require("../modules/jobSync/jobSync.service");

const recommendationService =
require("../modules/recommendation/recommendation.service");

const startJobSync =
() => {

    cron.schedule(
        "0 */6 * * *",

        async () => {

            console.log(
                "Running job sync..."
            );

            try {

                const result =
                    await jobSyncService
                    .syncJobs();

                const users =
                    await prisma.user
                    .findMany();

                for(
                    const user
                    of users
                ){

                    await recommendationService
                    .generateRecommendations(
                        user.id
                    );
                }

                console.log(
                    "Sync complete:",
                    result
                );

            } catch(err){

                console.error(
                    "Sync failed:",
                    err.message
                );
            }
        }
    );
};

module.exports = {
    startJobSync
};