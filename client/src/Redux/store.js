import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/authSlice.js';
import courseSliceReducer from './Slices/courseSlice.js'
import paymentSliceReducer from './Slices/paymentSlice.js';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        payment: paymentSliceReducer
    },
    devTools: true,
});

export default store;