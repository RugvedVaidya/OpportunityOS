console.log("APP FILE LOADED");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const profileRoutes = require("./modules/profile/profile.routes");

const app = express();

// const opportunityRoutes =
// require("./modules/opportunity/opportunity.routes");

// app.use(
//     "/api/opportunities",
//     opportunityRoutes
// );

app.use(cors());
app.use(express.json());

const opportunityRoutes =
require("./modules/opportunity/opportunity.routes");

app.use(
    "/api/opportunities",
    opportunityRoutes
);

const matchingRoutes =
require("./modules/matching/matching.routes");

app.use(
    "/api/matching",
    matchingRoutes
);

const resumeRoutes =
require(
"./modules/resume/resume.routes"
);

app.use(
    "/api/resume",
    resumeRoutes
);

const jobSyncRoutes =
require(
"./modules/jobSync/jobSync.routes"
);

app.use(
    "/api/jobs/sync",
    jobSyncRoutes
);

const feedRoutes =
require("./modules/feed/feed.routes");

app.use(
    "/api/feed",
    feedRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const errorHandler =
require("./middleware/error.middleware");

app.use(errorHandler);

module.exports = app;