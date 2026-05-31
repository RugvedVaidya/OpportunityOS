const prisma = require("../../config/prisma");

const getProfile = async (userId) => {

    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            profile:true
        }
    });

    return user;
};

const updateProfile = async (userId, data) => {

    const existing = await prisma.profile.findUnique({
        where: {
            userId
        }
    });

    if (existing) {

        return prisma.profile.update({
            where: {
                userId
            },
            data
        });
    }

    return prisma.profile.create({
        data: {
            ...data,
            userId
        }
    });
};

module.exports = {
    getProfile,
    updateProfile
};