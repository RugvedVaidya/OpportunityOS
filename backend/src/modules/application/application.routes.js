const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const controller =
require("./application.controller");

router.post(
    "/save/:opportunityId",
    authMiddleware,
    controller.saveJob
);

router.patch(
    "/:applicationId/status",
    authMiddleware,
    controller.updateStatus
);

router.get(
    "/me",
    authMiddleware,
    controller.getMyApplications
);

module.exports = router;