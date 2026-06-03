const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const controller =
require("./dashboard.controller");

router.get(
    "/",
    authMiddleware,
    controller.getDashboard
);

module.exports =
router;