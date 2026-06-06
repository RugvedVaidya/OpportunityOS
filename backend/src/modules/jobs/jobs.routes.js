const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const adminMiddleware =
require("../../middleware/admin.middleware");

const controller =
require("./jobs.controller");

router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    controller.getQueueStats
);

router.get(
    "/failed",
    authMiddleware,
    adminMiddleware,
    controller.getFailedJobs
);

module.exports =
router;