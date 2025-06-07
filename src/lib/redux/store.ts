import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "@/lib/redux/features/authSlice";
import blogReducer from '@/lib/redux/features/authSlice'

export const store = configureStore({
    reducer: {
        // define reducers config
        authUserReducer,
        blogs: blogReducer, 
    }
});

export type RootState = ReturnType<typeof store.getState>; // type untuk mendefinisikan struktur data yg tersimpan di dalam store/state.
export type AppDispatch = typeof store.dispatch; // type untuk mendefinisikan struktur data yg akan di simpan pada reducer.