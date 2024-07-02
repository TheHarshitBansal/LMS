import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true,'Title is required'],
        minLength: [3, 'Title must have atleast 3 characters'],
        maxLength: [49, 'Title must have less than 50 characters'],
        trim: true,
    },
    description: {
        type: String,
        required: [true,'Description is required'],
        minLength: [30, 'Description must have atleast 30 characters'],
        maxLength: [200, 'Description must have less than 200 characters'],
        trim: true,
    },
    category: {
        type: String,
        required: [true,'Category is required'],
    },
    thumbnail:{
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    lectures: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        lecture:{
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        }
    }],
    numberOfLectures: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Course = model("Course", courseSchema);

export default Course;