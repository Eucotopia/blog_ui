import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from '../store'

export interface UserV0 {
    id: number
    email: string
    username: string
    token: string
}

export interface User {
    id: number
    username: string
    password: string
    registrationDate: string
    email: string
    biography:string
    profileImage:string
    roles: string[]
}


export interface UserResponse<T> {
    code: string
    data: T
    message: string
}

export interface LoginRequest {
    email: string
    password: string
}

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/user',
        prepareHeaders: (headers, {getState}) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.user?.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        // 用户登录
        login: builder.mutation<UserResponse<UserV0>, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        // 根据 ID 获取用户
        getUserById: builder.query<void, number>({
            query: (id) => ({url: `/${id}`}),
        }),
        getUsers: builder.query<UserResponse<User[]>,void>({
            query: () => ({url: ``}),
        })
    }),
})

export const {useLoginMutation, useGetUserByIdQuery,useGetUsersQuery} = authApi
