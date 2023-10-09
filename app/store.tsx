import {configureStore} from '@reduxjs/toolkit'
import {blogApiSlice} from "@/app/api/blogApiSlice";
import authReducer from '@/features/auth/authSlice'
import {api} from "@/app/api/auth";

export const store = configureStore({
    reducer: {
        [blogApiSlice.reducerPath]: blogApiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch