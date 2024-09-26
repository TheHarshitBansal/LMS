import { Router } from "express";
import { createCourse, createLecture, deleteCourse, deleteLecture, showAllCourses, showCourse, showLecture, updateCourse, updateLecture } from "../controllers/course.controller.js";
import { isAdmin, isLoggedIn, isSubscriber } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/cloudinaryCourseMiddleware.js";

const router = Router();

router.route("/")
    .get(showAllCourses)
    .post(isLoggedIn, isAdmin, upload.single('thumbnail'), createCourse)

router.route('/:id')
    .get(isLoggedIn ,showCourse)
    .put(isLoggedIn, isAdmin, upload.single('thumbnail'), updateCourse)
    .delete(isLoggedIn, isAdmin, deleteCourse)
    .post(isLoggedIn, isAdmin, upload.single('lecture'), createLecture)

router.route('/:id/:lectureId')
    .put(isLoggedIn, isAdmin, upload.single('lecture'), updateLecture)
    .delete(isLoggedIn, isAdmin, deleteLecture)
    .get(isLoggedIn, isSubscriber, showLecture)
    
export default router;