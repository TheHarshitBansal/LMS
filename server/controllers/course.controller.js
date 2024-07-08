import Course from "../models/course.model.js"
import AppError from "../utils/error.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const showAllCourses =  asyncHandler(async (req, res, next) => {
    const courses = await Course.find({}).select('-lectures');

    res.status(200).json({
        success: true,
        message: "Courses fetched successfully",
        courses
    })
})

const showCourse =  asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const course = await Course.findById(id);

    if(!course){
        return next(new AppError(200, "Course does not exist"));
    }

    res.status(200).json({
        success: true,
        message: "Course fetched successfully",
        course
    })
})

const createCourse = asyncHandler(async (req, res, next) => {
    const {title, description, category, createdBy} = req.body;

    if(!title || !description || !category || !createdBy){
        return next(new AppError(400, "All fields are required"));
    }

    const imgPath = req.file ? req.file.path : undefined

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail:{
            public_id: title,
            secure_url: imgPath,
        }
    })

    if(!course){
        return next(new AppError(500, "Something went wrong. Please try again!"));
    }

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course created successfully',
        course
    })
})

const updateCourse = asyncHandler(async (req, res, next) => {
    const {id} = req.params;

    const course = await Course.findByIdAndUpdate(
        id,{ $set:req.body },{ runValidators:true } 
    )

    if(!course){
        return next(new AppError(400, "Course does not exist"));
    }

    if(req.file){
        lecture.lecture.secure_url = req.file.path;
    }
    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course updated successfully',
    })
})

const deleteCourse = asyncHandler(async (req, res, next) => {
    const {id} = req.params;

    try {
        const course = await Course.findByIdAndDelete(id);

        if(!course){
            return next(new AppError(400, "Course does not exists"));
        }

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
        })

    } catch (error) {
        return next(new AppError(error.status, error.message));
    }
})

const createLecture = asyncHandler(async (req, res, next) => {
    const {title, description} = req.body;
    const {id} = req.params;

    if(!title || !description){
        return next(new AppError(400, "All fields are required"));
    }

    const course = await Course.findById(id);

    if(!course){
        return next(new AppError(400, "Course not found"));
    }

    const imgPath = req.file ? req.file.path : undefined

    course.lectures.push({
        title,
        description,
        lecture:{
            public_id: title,
            secure_url: imgPath
        }
    })

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course lecture added successfully',
        course,
    })
})

const updateLecture = asyncHandler(async (req, res, next) => {
    const {id, lectureId} = req.params;

    const course = await Course.findById(id)

    if(!course){
        return next(new AppError(400, "Course does not exist"));
    }

    const lecture = course.lectures.id(lectureId)
    
    if(!lecture){
        return next(new AppError(400, "Lecture does not exist"));
    }

    if(req.file){
        lecture.lecture.secure_url = req.file.path;
    }
    lecture.set(req.body);
    
    await course.save();

    res.status(200).json({
        success: true,
        message: 'Lecture updated successfully',
    })
})

const deleteLecture = asyncHandler(async (req, res, next) => {
    const {id, lectureId} = req.params;

    const course = await Course.findById(id)

    if(!course){
        return next(new AppError(400, "Course does not exist"));
    }

    const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);

    if (lectureIndex === -1) {
        return next(new AppError(400, "Lecture does not exist"));
    }

    course.lectures.splice(lectureIndex, 1);
    course.numberOfLectures = course.lectures.length;
    await course.save();

    res.status(200).json({
        success: true,
        message: 'Lecture deleted successfully',
    })
})

const showLecture = asyncHandler(async (req, res, next) => {
    const {id, lectureId} = req.params;
    const course = await Course.findById(id);

    if(!course){
        return next(new AppError(400, "Course does not exist"));
    }

    const lecture = course.lectures.id(lectureId)
    
    if(!lecture){
        return next(new AppError(400, "Lecture does not exist"));
    }

    res.status(200).json({
        success: true,
        message: "Lecture fetched successfully",
        lecture
    })
})

export{
    showAllCourses,
    showCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    createLecture,
    updateLecture,
    deleteLecture,
    showLecture,
}