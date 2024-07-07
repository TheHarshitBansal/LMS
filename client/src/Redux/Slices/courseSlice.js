import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack';

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

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action?.payload){
                console.log(action?.payload);
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer;