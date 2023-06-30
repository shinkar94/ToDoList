import {Action} from "redux";
import { todoReducer} from "../features/ToDoList/TodoListReducer";
import {ThunkAction} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";
import {jsonReducer} from "../features/ToDoList/JsonTodoSlice";

export const store = configureStore({
    reducer: {
        TodoList:todoReducer,
        JsonTodo: jsonReducer,
        app:appReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
// @ts-ignore
window.store=store