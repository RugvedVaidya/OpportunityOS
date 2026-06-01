const express = require("express");

const router = express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const adminMiddleware =
require("../../middleware/admin.middleware");

const opportunityController =
require("./opportunity.controller");

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    opportunityController.createOpportunity
);

module.exports = router;