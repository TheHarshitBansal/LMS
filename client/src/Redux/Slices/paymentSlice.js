import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { closeSnackbar, enqueueSnackbar } from 'notistack';

import axiosInstance from '../../helpers/axiosInstance.js'

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: [],
    finalMonths: [],
    monthlySalesRecords: []
}

export const getRazorpayId = createAsyncThunk('/payment/getId', async()=>{
    try {
        const response = await axiosInstance.get('/payment/key');
    return response.data
    } catch (error) {
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to get Razorpay Key',
            { variant: 'error' }
          );
    }
})

export const subscribeCourse = createAsyncThunk('/payment/subscribe', async()=>{
    let loadingSnackbarKey ;
  try {
      loadingSnackbarKey = enqueueSnackbar('Subscribing. Please wait!', { variant: 'warning', persist:true});
        const response = await axiosInstance.post('/payment/subscribe');
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar('Subscribed!', { variant: 'success' });
        return response.data
        } catch (error) {
            closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to subscribe course',
            { variant: 'error' }
          );
    }
})

export const verifySubscription = createAsyncThunk('/payment/verify', async(data)=>{
    try {
        const response = await axiosInstance.post('/payment/verify', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            razorpay_subscription_id: data.razorpay_subscription_id
        });
    return response.data
    } catch (error) {
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to verify subscription',
            { variant: 'error' }
          );
    }
})

export const unsubscribeCourse = createAsyncThunk('/payment/unsubscribe', async(data)=>{
    let loadingSnackbarKey ;
  try {
      loadingSnackbarKey = enqueueSnackbar('Unsubscribing. Please wait!', { variant: 'warning', persist:true});
        const response = await axiosInstance.post('/payment/unsubscribe');
        closeSnackbar(loadingSnackbarKey)
    enqueueSnackbar('Unsubscribed!', { variant: 'success' });
    return response.data
    } catch (error) {
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to unsubscribe',
            { variant: 'error' }
          );
    }
})

export const getPaymentDetails = createAsyncThunk('/payment/details', async(data)=>{
    let loadingSnackbarKey ;
  try {
      loadingSnackbarKey = enqueueSnackbar('Fetching details. Please wait!', { variant: 'warning', persist:true});
        const response = await axiosInstance.get('/payment?count=100');
        closeSnackbar(loadingSnackbarKey)
    enqueueSnackbar('Details fetched successfully!', { variant: 'success' });
    return response.data
    } catch (error) {
        closeSnackbar(loadingSnackbarKey)
        enqueueSnackbar(
            error?.response?.data?.message || 'Failed to get details',
            { variant: 'error' }
          );
    }
})


const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getRazorpayId.fulfilled, (state, action)=>{
            state.key = action?.payload?.key;
        })
        builder.addCase(subscribeCourse.fulfilled, (state, action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        builder.addCase(verifySubscription.fulfilled, (state, action)=>{
            state.isPaymentVerified = action?.payload?.success;
        })
        builder.addCase(verifySubscription.rejected, (state, action)=>{
            state.isPaymentVerified = action?.payload?.success;
        })
        builder.addCase(getPaymentDetails.fulfilled, (state, action)=>{
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecords = action?.payload?.monthlySalesRecords;
        })
    }
})

//export const {} = paymentSlice.actions;
export default paymentSlice.reducer;