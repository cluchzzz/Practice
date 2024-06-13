import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import axios from "axios";
import {BASE_URL} from "../../axios";

export const loginUser = createAsyncThunk(
    'user/login',
    async ({username, password}) => {
        try {
            const response = await AuthService.login(username, password)

            localStorage.setItem('token', response.data.accessToken)

            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            throw Error(e.response?.data?.message)
        }
    }
)

export const registrationUser = createAsyncThunk(
    'user/registration',
    async ({username, email, password}) => {
        try {
            const response = await AuthService.registration(username, email, password)

            localStorage.setItem('token', response.data.accessToken)

            return response.data
        } catch (e) {
            console.log(e)
            throw Error(e.response?.data?.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const response = await AuthService.logout()

            localStorage.removeItem('token')

            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            throw Error(e.response?.data?.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/check',
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})

            localStorage.setItem('token', response.data.accessToken)

            console.log(response)

            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            throw Error(e.response?.data?.message)
        }
    }
)

export const UserReducer = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isAuth: false,
        loading: false,
        error: false
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action
        },

        setUser: (state, action) => {
            state.user = action
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuth = true
        })

        //registration
        builder.addCase(registrationUser.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(registrationUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(registrationUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuth = true
        })

        //logoutUser
        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = {}
            state.isAuth = false
        })

        //checkAuth
        builder.addCase(checkAuth.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuth = true
        })
    }
})

export const {setUser, setAuth, setError} = UserReducer.actions
export default UserReducer.reducer