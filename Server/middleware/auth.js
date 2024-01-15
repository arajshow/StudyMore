const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.auth = async (req, res, next) => {
    try{

        // const token = req.cookies.token ||  req.body.token || req.header("Authorization").replace("Bearer ", "");
        const token = req.body.token 
                    || req.cookies.token
                    || req.header("Authorization").replace("Bearer ", "");

        if(!token || token==undefined){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }
        
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("payload", payload);
            req.user = payload;

        }
        catch(error){

            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }

        next();

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"something went wrong while verifying token"
            // message: error.message
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try{

        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"go to your domain, you don't exist here"
            })
        }

        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "user role can't be verified",
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try{
        const payload = req.user;

        if(payload.accountType !== "Instructor"){
            return res.status(500).json({
                success:false,
                message:"go to your domain, you don't exist here"
            })
        }

        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "user role can't be verified",
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try{
        const payload = req.user;

        if(payload.accountType !== "Admin"){
            return res.status(500).json({
                success:false,
                message:"go to your domain, you don't exist here"
            })
        }

        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "user role can't be verified",
        })
    }
}