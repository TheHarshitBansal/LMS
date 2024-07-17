import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { closeSnackbar, enqueueSnackbar } from "notistack";

import axiosInstance from "../../helpers/axiosInstance.js"

const initialState = {
    lectures:[],
}

export const getLectures = createAsyncThunk('/lectures/get', async(cid) => {
    try{
        const res = await axiosInstance.get(`/courses/${cid}`);
        return res.data.course;
    }catch(error){
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to load lectures',
            { variant: 'error' }
          );
    }
})

export const addLectures = createAsyncThunk('/lectures/add', async(data) => {
    let loadingSnackbarKey ;
    try {
        loadingSnackbarKey = enqueueSnackbar('Adding new Lecture. Please wait!', { variant: 'warning', persist:true});
        const formData = new FormData();
        formData.append('lecture', data.lecture)
        formData.append('title', data.title)
        formData.append('description', data.description)
        const res = await axiosInstance.post(`/courses/${data.id}`, formData);
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar('Lecture added successfully!', { variant: 'success' });
        return res.data.course;
    }catch(error){
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to add lecture',
            { variant: 'error' }
          );
    }
})

export const deleteLectures = createAsyncThunk('/lectures/delete', async(data) => {
    let loadingSnackbarKey ;
    try {
        loadingSnackbarKey = enqueueSnackbar('Deleting Lecture. Please wait!', { variant: 'warning', persist:true});
        const res = await axiosInstance.post(`/courses/${data.id}/${data.lectureId}`);
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar('Lecture deleted successfully!', { variant: 'success' });
        return res.data.course;
    }catch(error){
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to delete lecture',
            { variant: 'error' }
          );
    }
})

const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLectures.fulfilled, (state, action)=>{
            state.lectures = action?.payload?.lectures
        })
        builder.addCase(addLectures.fulfilled, (state, action)=>{
            state.lectures = action?.payload?.course?.lecture
        })
    }
})

export default lectureSlice.reducer;