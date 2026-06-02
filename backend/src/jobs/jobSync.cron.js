const cron =
require("node-cron");

const jobSyncService =
require(
"../modules/jobSync/jobSync.service"
);

const startJobSync =
() => {

    cron.schedule(
        "*/1 * * * *", // every one min - "*/1 * * * *", 6 hours - "0 */6 * * *"
        async () => {

            console.log(
                "Running job sync..."
            );

            try {

                const result =
                await jobSyncService
                .syncJobs();

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