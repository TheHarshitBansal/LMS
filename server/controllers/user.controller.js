import { hash } from "bcrypt";
import User from "../models/user.model.js";
import AppError from "../utils/error.js";
import generateResetPasswordEmail from "../utils/mailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import { config } from "dotenv"; 
import asyncHandler from '../middlewares/asyncHandler.middleware.js'
config();

const cookieOptions = {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    secure: false,
    sameSite: 'none',
}

const register = asyncHandler(async(req,res,next) => {
    const {name, email, password} = req.body;
     
    if(!name || !email || !password){
        return next(new AppError(500, 'All fields are required'))
    }

    const userExists = await User.findOne({email});
    if(userExists){
        return next(new AppError(406, 'User with this email already exists'));
    }

    const imgPath = req.file ? req.file.path : undefined

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url: imgPath,
        }
    })

    if(!user){
        return next(new AppError(400, 'User registration failed. Please try again!'))
    }
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken()

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user,
    })
})

const login = asyncHandler(async(req,res,next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return next(new AppError(400, 'All fields are required'))
        }

        const user = await User.findOne({email}).select('+password')

        if (!user) {
            return next(new AppError(400, 'User does not exist'));
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return next(new AppError(400, 'Invalid Credentials'));
        }

        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
        })
    } catch (e) {
        return next(new AppError(500, e.message))
    }
})

const logout = (_req,res,_next) => {
    res.cookie('token', null, {
        secure:false,
        maxAge: 0,
        httpOnly:true,
        sameSite:'none'
    })

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}

const getProfile = asyncHandler(async(req,res,next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success:true,
            message: 'User Details',
            user,
        })
    } catch (error) {
        return next(new AppError(500, 'Failed to fetch user details. Please try again!S'))
    }
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    const {email} = req.body;
    if(!email){
        return next(new AppError(400, 'Email is required'))
    }

    const user = await User.findOne({email});
    if(!user){
        return next(new AppError(400, 'User with this email does not exist'))
    }

    const resetToken = await user.generateResetToken();

    // Log user instance before saving
    console.log('User before saving:', user);

    await user.save();

    // Log user instance after saving
    console.log('User after saving:', user);


    const resetPasswordURL = `${process.env.FRONTEND_URL}/v1/user/reset/${resetToken}`;

    const subject = 'Reset Password for LMS';
    const message = generateResetPasswordEmail(resetPasswordURL)

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: 'Reset link sent successfully'
        })

    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();
        return next(new AppError(500, error.message));
    }
})

const resetPassword = asyncHandler(async (req, res, next) => {
    const token = req.params.resetId;
    const password = req.body.password;

    if(!password){
        return next(new AppError(400, 'New password is required'))
    }

    const forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt:Date.now() }
    });

    if(!user){
        return next(new AppError(400, "Link is invalid or expired, please try again!"))
    }

    user.password = await hash(password, 20);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })

})

const changePassword = asyncHandler(async (req, res, next) => {
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;

    if(!oldPassword || !newPassword){
        return next(new AppError(400, "All fields are required."));
    }

    const user = await User.findById(id).select('+password');
    if(!user){
        return next(new AppError(400, "User not found"));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid){
        return next(new AppError(400, "Invalid old password, Please try again!"));
    }

    user.password = newPassword;
    await user.save();
    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })
}
)
const updateProfile = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    const {name} = req.body;

    const user = await User.findById(id);

    if(!user){
        return next(new AppError(500, "Something went wrong!"));
    }
    
    if(name){
        user.name=name;
    }

    if(req.file){
        user.avatar.secure_url = req.file.path;
    }
    await user.save();
    
    res.status(200).json({
        success: true,
        message: 'Profile updated successfully'
    })
})

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile
}