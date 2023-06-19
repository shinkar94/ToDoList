import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type {AppDispatch, RootReducerType} from "../store/store"

// Use throughout your app instead of plain useDispatch and useSelector
//export const useAppDispatch = () => useDispatch<AppDispatch>() //для санок
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()