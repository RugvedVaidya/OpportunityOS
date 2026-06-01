
const resumeService =
require("./resume.service");

const uploadResume =
async (
    req,
    res
) => {

    try {

        const result =
        await resumeService
        .processResume(
            req.file.path,
            req.user.userId
        );

        return res.json({
            success:true,
            extractedSkills:
            result.skills
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