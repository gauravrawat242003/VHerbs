const jwt = require('jsonwebtoken');
require('dotenv').config();

// middleware for authenticating user
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token 
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");
        
        // if token missing
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the token
        try {
            // this decode was created during login
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("verified token => decoded is: ", decode);

            // add decode to req object as user
            req.user = decode;
        } catch(err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid Please login again"
            });
        }

        // go to next middleware
        next();
    } catch(err) {
        console.log("AUTH MIDDLEWARE error...", err);
        return res.status(500).json({
            success: false,
            messsage: "Internal server error",
            error: err.message,
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.accountType !== "admin") {
            return res.status(401).json({
                success: false,
                message: "This is a preotected route for admin only",
            });
        }

        // go to next
        next();
    } catch(err) {
        console.error("IS ADMIN MIDDLEWARE error...", err);
        return res.statsu(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

exports.isUser = async (req, res, next) => {
    try {
        if(req.user.accountType !== 'user') {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for users only"
            });
        }
        
        // go to next
        next();
    } catch(err) {
        console.error("IS USER MIDDLEWARE error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}