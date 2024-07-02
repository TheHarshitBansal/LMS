import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateProfile } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/cloudinaryUserMiddleware.js";

const router = Router();

router.post("/register", upload.single('avatar'), register);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.get("/my-profile", isLoggedIn, getProfile);
router.post("/reset", forgotPassword);
router.post("/reset/:resetId", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update-profile", isLoggedIn, upload.single('avatar'), updateProfile);

export default router;