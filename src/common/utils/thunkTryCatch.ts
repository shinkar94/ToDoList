
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AppDispatch, RootState} from "../../store/store";

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  logic: ()=> Promise<T>,
  showGlobalError?: boolean
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const {rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue({ error: e, showGlobalError });
  }
};