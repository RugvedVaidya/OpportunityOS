const profileService = require("./profile.service");

const getMyProfile = async (req, res) => {

    const user = await profileService.getProfile(
        req.user.userId
    );

    return res.json(user);
};

const updateMyProfile = async (req, res) => {

    const profile = await profileService.updateProfile(
        req.user.userId,
        req.body
    );

    return res.json({
        success: true,
        profile
    });
};

module.exports = {
    getMyProfile,
    updateMyProfile
};