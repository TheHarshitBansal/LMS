import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/authSlice.js';
import courseSliceReducer from './Slices/courseSlice.js'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer
    },
    devTools: true,
});

export default store;