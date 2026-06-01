console.log("ADMIN MIDDLEWARE LOADED");

const adminMiddleware =
(req, res, next) => {

    console.log(req.user);

    if(req.user.role !== "ADMIN"){

        return res.status(403).json({
            success:false,
            message:"Admin access required"
        });
    }
    
    console.log(req.user);

    next();
};

module.exports = adminMiddleware;