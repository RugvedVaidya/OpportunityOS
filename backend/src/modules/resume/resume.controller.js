const resumeQueue =
require(
    "../../queues/resume.queue"
);

const uploadResume =
async (
    req,
    res
) => {

    try {

        if(!req.file){

            return res
                .status(400)
                .json({

                    success:false,

                    message:
                    "Resume file is required"
                });
        }

        await resumeQueue.add(

            "process-resume",

            {

                filePath:
                    req.file.path,

                userId:
                    req.user.userId
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

        return res
            .status(200)
            .json({

                success:true,

                message:
                "Resume queued for processing"
            });

    } catch(err){

        console.error(err);

        return res
            .status(500)
            .json({

                success:false,

                message:
                err.message
            });
    }
};

module.exports = {
    uploadResume
};