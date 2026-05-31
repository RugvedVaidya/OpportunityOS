const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");
const jwtUtil = require("../../utils/jwt");

const registerUser = async (data) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if(existingUser){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword
        }
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    };
};

const loginUser = async (data) => {

    const user = await prisma.user.findUnique({
        where : {
            email : data.email
        }
    });

    if(!user){
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    );

    if(!isPasswordValid){
        throw new Error("Invalid Password");
    }

    const token = jwtUtil.generateToken(user.id);

    return {
        token,
        user : {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}
module.exports = {
    registerUser,
    loginUser
};