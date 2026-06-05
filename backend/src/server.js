require("dotenv").config();

const app =
require("./app");

require(
    "./workers/resume.worker"
);

const {
    connectRedis
} = require(
    "./config/redis"
);

const {
    startJobSync
} = require(
    "./jobs/jobSync.cron"
);

const PORT =
process.env.PORT || 5000;

const startServer =
async () => {

    try {

        await connectRedis();

        startJobSync();

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on ${PORT}`
                );
            }
        );

    } catch(err){

        console.error(
            err
        );
    }
};

startServer();