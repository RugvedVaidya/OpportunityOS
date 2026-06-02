const applicationService =
require("./application.service");

const saveJob =
async (req,res) => {

    const result =
    await applicationService
    .saveJob(
        req.user.userId,
        req.params.opportunityId
    );

    return res.json(result);
};

const updateStatus =
async (req,res) => {

    const result =
    await applicationService
    .updateStatus(
        req.params.applicationId,
        req.body.status
    );

    return res.json(result);
};

const getMyApplications =
async (req,res) => {

    const result =
    await applicationService
    .getMyApplications(
        req.user.userId
    );

    return res.json(result);
};

module.exports = {
    saveJob,
    updateStatus,
    getMyApplications
};