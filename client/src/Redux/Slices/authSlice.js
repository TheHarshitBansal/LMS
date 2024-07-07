import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { closeSnackbar, enqueueSnackbar } from 'notistack';

import axiosInstance from '../../helpers/axiosInstance.js'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
}

export const createAccount = createAsyncThunk('/auth/signup', async (data, { rejectWithValue }) => {
    let loadingSnackbarKey ;
    try {
        loadingSnackbarKey = enqueueSnackbar('Creating your account. Please wait!', { variant: 'warning', persist:true});

      const res = await axiosInstance.post('/user/register', data);
        closeSnackbar(loadingSnackbarKey)
      enqueueSnackbar('Account created successfully!', { variant: 'success' });
      return res.data;
    } catch (error) {
      closeSnackbar(loadingSnackbarKey)
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to create account',
        { variant: 'error' }
      );
      return rejectWithValue(error.response.data);
    }
  })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
});

//export const {} = authSlice.actions;
export default authSlice.reducer;