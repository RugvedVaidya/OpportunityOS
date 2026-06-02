const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const adminMiddleware =
require("../../middleware/admin.middleware");

const controller =
require("./jobSync.controller");


router.get(
    "/learning-path",
    authMiddleware,
    controller
    .getLearningPath
);

router.post(
    "/refresh-skills",
    authMiddleware,
    adminMiddleware,
    controller.refreshSkills
);

module.exports = router;