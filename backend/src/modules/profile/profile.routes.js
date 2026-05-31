console.log("PROFILE ROUTES LOADED");

express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");

const profileController = require("./profile.controller");

router.get(
    "/me",
    authMiddleware,
    profileController.getMyProfile
);

router.put(
    "/",
    authMiddleware,
    profileController.updateMyProfile
);

module.exports = router;