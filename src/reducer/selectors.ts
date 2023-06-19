import {RootState} from "../store/store";


export const TodoListSelectors = (state: RootState) => state.TodoList
export const AppSelectors = (state: RootState) => state.app