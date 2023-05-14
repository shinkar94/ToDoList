import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from "../store/store"

// Use throughout your app instead of plain useDispatch and useSelector
//export const useAppDispatch = () => useDispatch<AppDispatch>() //для санок
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector