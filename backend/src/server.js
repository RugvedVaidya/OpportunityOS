require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const {
    startJobSync
} = require(
    "./jobs/jobSync.cron"
);

startJobSync();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});