import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type Status = "loading" | "close"

const initialAppState = {
    isLoading: false,
    isAppInitialized:false,
    status: "loading" as Status,
    error: null as string | null
}

export type InitialAppStateType = typeof initialAppState

const slice = createSlice({
    name: 'app',
    initialState:initialAppState,
    reducers: {
        setIsLoading: (state, action:PayloadAction<{ isLoading: boolean }>)=>{
            state.isLoading = action.payload.isLoading
        },
        setError: (state, action:PayloadAction<{ error: null | string}>)=>{
            toast.error(action.payload.error)
        },
        setAppIsLoading: (state, action:PayloadAction<{ initialized: boolean }>)=>{
            state.isAppInitialized = action.payload.initialized
        }
    },
    extraReducers: builder => {
        builder.addMatcher((action)=>{
            return action.type.endsWith('/pending');
        }, (state, action) =>{
            state.isLoading = true
        }).addMatcher((action)=>{
            return action.type.endsWith('/fulfilled');
        }, (state, action) =>{
            state.isLoading = false
        }).addMatcher((action)=>{
            return action.type.endsWith('/rejected');
        }, (state, action) =>{
            const { error, showGlobalError = true} = action.payload
            state.isLoading = false
            if(!showGlobalError) return
            let errorMessage = ""
            if (action.p instanceof AxiosError) {
                errorMessage = error?.response?.data?.error ?? error.message
            } else if (error instanceof Error) {
                errorMessage = `Native error: ${error.message}`
            } else {
                errorMessage = JSON.stringify(error)
            }
            toast.error(errorMessage)
        })
    }

})

export const appReducer = slice.reducer
export const appAction = slice.actions