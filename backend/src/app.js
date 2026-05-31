console.log("APP FILE LOADED");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const profileRoutes = require("./modules/profile/profile.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const errorHandler =
require("./middleware/error.middleware");

app.use(errorHandler);

module.exports = app;