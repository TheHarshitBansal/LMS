import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { closeSnackbar, enqueueSnackbar } from 'notistack';

import axiosInstance from '../../helpers/axiosInstance.js'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
}

//Signup Function
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

//Login function
export const login = createAsyncThunk('/auth/login', async (data, { rejectWithValue }) => {
  let loadingSnackbarKey ;
  try {
      loadingSnackbarKey = enqueueSnackbar('Logging in your account. Please wait!', { variant: 'warning', persist:true});

    const res = await axiosInstance.post('/user/login', data);
      closeSnackbar(loadingSnackbarKey)
    enqueueSnackbar('Logged in successfully!', { variant: 'success' });
    return res.data;
  } catch (error) {
    closeSnackbar(loadingSnackbarKey)
    enqueueSnackbar(
      error?.response?.data?.message || 'Failed to login',
      { variant: 'error' }
    );
    return rejectWithValue(error.response.data);
  }
})

//Logout Function
export const logout = createAsyncThunk('/auth/logout', async (_, {rejectWithValue}) => {
  let loadingSnackbarKey ;
  try {
      loadingSnackbarKey = enqueueSnackbar('Logging out. Please wait!', { variant: 'warning', persist:true});

    const res = await axiosInstance.post('/user/logout');
      closeSnackbar(loadingSnackbarKey)
      enqueueSnackbar('Logged out successfully!', { variant: 'success' });
    return res.data;
  } catch (error) {
    closeSnackbar(loadingSnackbarKey)
    enqueueSnackbar(
      error?.response?.data?.message || 'Failed to logout',
      { variant: 'error' }
    );
    return rejectWithValue(error.response.data);
  }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(createAccount.fulfilled, (state, action)=>{
        localStorage.setItem('data', JSON.stringify(action?.payload?.user))
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('role', action?.payload?.user?.role)
        state.data = action?.payload?.user;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
      })
      .addCase(login.fulfilled, (state, action)=>{
        localStorage.setItem('data', JSON.stringify(action?.payload?.user))
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('role', action?.payload?.user?.role)
        state.data = action?.payload?.user;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state)=>{
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
    }
});

//export const {} = authSlice.actions;
export default authSlice.reducer;