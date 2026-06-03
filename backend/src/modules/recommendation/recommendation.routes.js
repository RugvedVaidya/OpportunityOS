const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const controller =
require("./recommendation.controller");

router.post(
    "/generate",
    authMiddleware,
    controller.generateRecommendations
);

router.get(
    "/",
    authMiddleware,
    controller.getRecommendations
);

module.exports =
router;