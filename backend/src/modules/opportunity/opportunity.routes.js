const express = require("express");

const router = express.Router();

const authMiddleware =
require("../../middleware/auth.middleware");

const adminMiddleware =
require("../../middleware/admin.middleware");

const opportunityController =
require("./opportunity.controller");

const validate =
require("../../middleware/validate.middleware");

const {
    createOpportunitySchema
} = require("./opportunity.validation");

router.get(
    "/",
    opportunityController.getAllOpportunities
);

router.get(
    "/:id",
    opportunityController.getOpportunityById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createOpportunitySchema),
    opportunityController.createOpportunity
);

module.exports = router;