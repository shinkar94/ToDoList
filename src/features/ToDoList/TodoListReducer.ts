import {API, TaskTypeAPI, TodolistType} from "./API";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {thunkTryCatch} from "../../common/utils/thunkTryCatch";
export type FilterValue = "All" | "Not to buy" | "Bought"

export type StateTasksType = TaskTypeAPI &{
    isDone: boolean
}

export type TodoType = TodolistType &{
    filter: FilterValue
    tasks: StateTasksType[]
}
const initialState:TodoType[] = [

]
const ResultCode = {
    success: 0,
    error: 1,
    captcha: 10
} as const

const THUNK_PREFIXES = {
    GET_TODO: 'todos/getTodo',
    GET_TASKS: 'todos/getTasks',
    ADD_TASK: 'todos/addTasks',
    DELETE_TASKS: 'todos/deleteTasks',
    ADD_TODO: 'todos/addTodo',
    DELETE_TODO: 'todos/deleteTodo',
    UPDATE_TODO_TITLE: 'todos/updateTodoTitle',
    UPDATE_TASK_TITLE: 'todos/updateTaskTitle',
}
const getTodo = createAppAsyncThunk(
    THUNK_PREFIXES.GET_TODO, (arg:string, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.getToDoList()
    })
)
const getTasks = createAppAsyncThunk(
    THUNK_PREFIXES.GET_TASKS, (arg:string, thunkAPI)=>thunkTryCatch(thunkAPI, async ()=>{
        return await API.getTasks(arg)
    })
)
const addTasks = createAppAsyncThunk(
    THUNK_PREFIXES.ADD_TASK, (arg:{ToDoId: string, newTitle:string}, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.addTasks(arg.ToDoId, arg.newTitle)
    })
)
const deleteTasks = createAppAsyncThunk(
    THUNK_PREFIXES.DELETE_TASKS, (arg:{ToDoId:string, id:string}, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.deleteTask(arg.ToDoId, arg.id)
    })
)
const addTodo = createAppAsyncThunk(
    THUNK_PREFIXES.ADD_TODO, (arg:string, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.addTodo(arg)
    })
)
const deleteTodo = createAppAsyncThunk(
    THUNK_PREFIXES.DELETE_TODO, (arg:string, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.deleteToDo(arg)
    })
)
const updateTodoTitle = createAppAsyncThunk(
    THUNK_PREFIXES.UPDATE_TODO_TITLE, (arg: { ToDoId: string, newTitle: string }, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.updateTitleToDo(arg.ToDoId, arg.newTitle)
    })
)
const updateTaskTitle = createAppAsyncThunk(
    THUNK_PREFIXES.UPDATE_TASK_TITLE, (arg: { ToDoId: string,id:string , newTitle: string }, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
        return await API.updateTitleTask(arg.ToDoId,arg.id, arg.newTitle)
    })
)



const slice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers:{
        changeFilter:(state:TodoType[], action:PayloadAction<{ToDoId:string, filter:FilterValue}>)=>{
            return state.map((el) => el.id === action.payload.ToDoId ? {...el, filter: action.payload.filter} : el)
        },
        changeStatus: (state:TodoType[], action:PayloadAction<{ToDoId:string, id:string, e:boolean}>) =>{
            return state.map((el) => el.id === action.payload.ToDoId ?
                {...el, tasks: el.tasks.map(task => task.id === action.payload.id? {...task, isDone: action.payload.e} : task)} : el)
        },
        updateToDoOrder: (state:TodoType[], action:PayloadAction<{thisList:TodoType, currentList:TodoType | null}>)=>{
            return state.map(list => {
                        if(list.id === action.payload.thisList.id){
                            return {...list, order: action.payload.currentList?.order ?? 0}
                        }
                        if(list.id === action.payload.currentList?.id){
                            return {...list, order: action.payload.thisList.order ?? 0}
                        }
                        return list
            })
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodo.fulfilled, (state, action)=>{
            return action.payload.data.map(todo => ({...todo, filter: "All", tasks: [], order: Math.abs(todo.order)}))
        })
        builder.addCase(getTasks.fulfilled, (state, action)=>{
            const { items } = action.payload.data;

            state.map((todo) => {
                if (todo.id === action.meta.arg) {
                    todo.tasks = items.map((t) => ({ ...t, isDone: false }));
                }
            });
        })
        builder.addCase(addTasks.fulfilled, (state, action)=>{
            return state.map((el) => el.id === action.meta.arg.ToDoId ? {...el, tasks: [...el.tasks, action.payload.data.data.item]} : el)
        })
        builder.addCase(deleteTasks.fulfilled, (state, action)=>{
            return state.map((el) => el.id === action.meta.arg.ToDoId ? {...el, tasks: el.tasks.filter(t => t.id !== action.meta.arg.id)} : el)
        })
        builder.addCase(addTodo.fulfilled, (state, action)=>{
            const filter:FilterValue = "All"
            const newTodo = {...action.payload.data.data.item, filter: filter, tasks: []}
            return [...state, newTodo]
        })
        builder.addCase(deleteTodo.fulfilled, (state, action)=>{
            return state.filter((el) => el.id !== action.meta.arg)
        })
        builder.addCase(updateTodoTitle.fulfilled, (state, action) =>{
            return state.map(todo => todo.id === action.meta.arg.ToDoId ? {...todo, title: action.meta.arg.newTitle} : todo)
        })
        builder.addCase(updateTaskTitle.fulfilled, (state, action)=>{
            return state.map((todo) => todo.id === action.meta.arg.ToDoId ?
                {...todo, tasks: todo.tasks.map(task => task.id === action.meta.arg.id ? {...task, title: action.meta.arg.newTitle} : task)} : todo)
        })
    }
})
export const todoReducer = slice.reducer;
export const todoThunks = { getTodo,getTasks,addTasks, deleteTasks, addTodo, deleteTodo, updateTodoTitle, updateTaskTitle};
export const todoAction = slice.actions;

