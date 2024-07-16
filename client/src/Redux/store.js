import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/authSlice.js';
import courseSliceReducer from './Slices/courseSlice.js'
import lectureSliceReducer from './Slices/lectureSlice.js';
import paymentSliceReducer from './Slices/paymentSlice.js';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        payment: paymentSliceReducer,
        lecture: lectureSliceReducer,
    },
    devTools: true,
});

export default store;