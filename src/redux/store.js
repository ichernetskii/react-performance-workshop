import { configureStore } from '@reduxjs/toolkit';
import logReducer from './logSlice';
import loaderReducer from './loaderSlice'


export const store = configureStore({
    reducer: {
        logItems: logReducer,
        loader: loaderReducer,
    },
})
