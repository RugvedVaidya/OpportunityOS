const express =
require("express");

const router =
express.Router();

const upload =
require("../../config/multer");

const authMiddleware =
require("../../middleware/auth.middleware");

const resumeController =
require("./resume.controller");

router.post(
    "/upload",
    authMiddleware,
    upload.single(
        "resume"
    ),
    resumeController
    .uploadResume
);

module.exports =
router;