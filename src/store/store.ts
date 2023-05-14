import {combineReducers, legacy_createStore as createStore} from "redux";
import {shopListReducer} from "../reducer/shopListReducer";
import {ThemeReducer} from "../reducer/ThemeReducer";


const RootReducer=combineReducers({
    shopList:shopListReducer,
    theme:ThemeReducer
})

export const store=createStore(RootReducer)
export type RootState=ReturnType<typeof RootReducer>


// @ts-ignore
window.store=store