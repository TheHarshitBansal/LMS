import User from "../models/user.model.js";
import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";
import asyncHandler from './asyncHandler.middleware.js'

const isLoggedIn = asyncHandler(async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    
    if(!token){
        return next(new AppError(401, 'User not logged in'))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();
})

const isAdmin = (req, res, next) => {
    if(req.user.role !== 'ADMIN'){
        return next(new AppError(401, 'Unauthorized Access'))
    }
    next();
}

const isSubscriber = asyncHandler(async(req, res, next) => {
    const {id} = req.user;
    const user = await User.findById(id);
    if(user.subscription.status !== 'ACTIVE'){
        return next(new AppError(401, 'Unauthorized Access'))
    }
    next();
})

export{
    isLoggedIn,
    isAdmin,
    isSubscriber
}