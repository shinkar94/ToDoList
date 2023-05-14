import {combineReducers, legacy_createStore as createStore} from "redux";
import {shopListReducer} from "../reducer/shopListReducer";


const RootReducer=combineReducers({
    shopList:shopListReducer
})

export const store=createStore(RootReducer)
export type RootState=ReturnType<typeof RootReducer>


// @ts-ignore
window.store=store