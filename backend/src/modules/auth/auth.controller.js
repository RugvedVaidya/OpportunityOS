const authService = require("./auth.service");

const register = async (req,res) => {

    try {

        const user = await authService.registerUser(req.body);

        return res.status(201).json({
            success:true,
            user
        });

    } catch(err){

        return res.status(400).json({
            success:false,
            message:err.message
        });
    }
};

const login = async(req, res) => {

    try {
        const result = await authService.loginUser(req.body);
        return res.status(200).json({
            success:true,
            ...result
        });

    } catch(err){

        return res.status(401).json({
            success:false,
            message:err.message
        });
    }
}
module.exports = {
    register,
    login
};