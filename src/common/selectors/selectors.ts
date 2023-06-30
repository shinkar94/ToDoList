import {RootState} from "../../app/store";


export const TodoListSelectors = (state: RootState) => state.TodoList
export const JsonTodoListSelectors = (state: RootState) => state.JsonTodo
export const AppSelectors = (state: RootState) => state.app