import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {JsonTodoType, NewAPI} from "./JsonAPI";
import {AppDispatch, RootState} from "../../app/store";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";

// https://jsonplaceholder.typicode.com/
//<JsonToDOType, countPage: string>

const getJsonTodo =  createAppAsyncThunk<JsonTodoType, { countPage: string }>("json-todos/getTodo", async(arg, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const response = await NewAPI.getToDoList(arg.countPage)
        const todos = response.data
        return todos
    }catch (e:any) {
        return rejectWithValue(e)
    }
})


const InitialState:JsonTodoType[] = [

]

const slice = createSlice({
    name: 'json-todos',
    initialState:InitialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(getJsonTodo.fulfilled, (state, action) =>{
                state.push(action.payload)
            })
    }
})


export const jsonReducer = slice.reducer
export const jsonAction = slice.actions
export const jsonThunk = {getJsonTodo}