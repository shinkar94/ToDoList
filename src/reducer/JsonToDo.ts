import {createSlice} from "@reduxjs/toolkit";

// https://jsonplaceholder.typicode.com/
const slice = createSlice({
    name: 'json-todos',
    initialState:{},
    reducers:{},
    extraReducers:{}
})


export const jsonReducer = slice.reducer
export const jsonAction = slice.actions