const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const controller =
require("./feed.controller");

router.get(
    "/learning-path",
    authMiddleware,
    controller.getLearningPath
);

router.get(
    "/",
    authMiddleware,
    controller.getFeed
);

module.exports =
router;