import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { closeSnackbar, enqueueSnackbar } from 'notistack';

import axiosInstance from '../../helpers/axiosInstance.js'

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/courses/get", async (_,{rejectWithValue})=> {
    try {
        const response = await axiosInstance.get('/courses');
        return response.data.courses;
    } catch (error) {
        enqueueSnackbar(
            error?.response?.data?.message || 'Something went wrong',
            { variant: 'error' }
          );
          return rejectWithValue(error.response.data);
    }
})

export const createCourse = createAsyncThunk("/courses/create", async(data,{rejectWithValue})=>{
    let loadingSnackbarKey ;
    try {
        loadingSnackbarKey = enqueueSnackbar('Creating new course. Please wait!', { variant: 'warning', persist:true});

        await axiosInstance.post('/courses', data)
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar('Course created successfully!', { variant: 'success' });
    } catch (error) {
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar(
            error?.response?.data?.message || 'Something went wrong',
            { variant: 'error' }
          );
          return rejectWithValue(error.response.data);
    }
})

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action?.payload){
                state.courseData = [...action.payload]
            }
        })
        // .addCase(createCourse.fulfilled, (state, action) =>{

        // })
    }
})

export default courseSlice.reducer;