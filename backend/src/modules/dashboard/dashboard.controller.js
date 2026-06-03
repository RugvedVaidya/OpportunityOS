const dashboardService =
require("./dashboard.service");

const getDashboard =
async (req, res) => {

    try {

        const stats =
            await dashboardService
            .getDashboardStats(
                req.user.userId
            );

        return res.json({

            success: true,

            data: stats
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message:
                err.message
        });
    }
};

module.exports = {
    getDashboard
};