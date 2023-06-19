import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {todoListReducer} from "../reducer/TodoListReducer";
import {ThemeReducer} from "../reducer/ThemeReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


const RootReducer=combineReducers({
    TodoList:todoListReducer,
    theme:ThemeReducer
})

export const store=createStore(RootReducer, applyMiddleware(thunk))
export type RootReducerType=ReturnType<typeof RootReducer>
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
    >
// @ts-ignore
window.store=store