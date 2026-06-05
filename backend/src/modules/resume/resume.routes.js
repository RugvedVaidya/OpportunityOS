const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const path =
require("path");

const authMiddleware =
require("../../middleware/auth.middleware");

const resumeController =
require("./resume.controller");

const storage =
multer.diskStorage({

    destination:
    (
        req,
        file,
        cb
    ) => {

        cb(
            null,
            "src/uploads"
        );
    },

    filename:
    (
        req,
        file,
        cb
    ) => {

        cb(

            null,

            Date.now() +

            path.extname(
                file.originalname
            )
        );
    }
});

const upload =
multer({
    storage
});

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