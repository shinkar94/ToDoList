import {Action} from "redux";
import { todoReducer} from "../reducer/TodoListReducer";
import {ThunkAction} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        TodoList:todoReducer,
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