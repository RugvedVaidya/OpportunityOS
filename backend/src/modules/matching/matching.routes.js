const express = require("express");

const router = express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const matchingController =
require("./matching.controller");

router.get(
    "/me",
    authMiddleware,
    matchingController.getMyMatches
);

module.exports = router;