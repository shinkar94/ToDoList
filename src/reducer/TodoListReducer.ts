import {API, TaskTypeAPI, TodolistType} from "../API/API";
import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {thunkTryCatch} from "../common/utils/thunkTryCatch";
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
const THUNK_PREFIXES = {
    GET_TODO: 'todos/getTodo',
    GET_TASKS: 'todos/getTasks',
    ADD_TASK: 'todos/addTasks',
    DELETE_TASKS: 'todos/deleteTasks',
    ADD_TODO: 'todos/addTodo',
    DELETE_TODO: 'todos/deleteTodo',
    UPDATE_TODO_TITLE: 'todos/updateTodoTitle',
    UPDATE_TASK_TITLE: 'todos/updateTaskTitle'
}
const getTodo = createAppAsyncThunk(
    THUNK_PREFIXES.GET_TODO, (arg:any, thunkAPI) => thunkTryCatch(thunkAPI, async ()=>{
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
    reducers:{},
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

// export const todoListReducer = (state:TodoType[] = initialState, action: ActionType):TodoType[]=>{
//     switch (action.type) {
//
//         case 'CHANGE-FILTER':{
//             return state.map((el) => el.id === action.payload.ToDoId ? {...el, filter: action.payload.filter} : el)
//         }
//         case 'CHANGE-STATUS':{
//             return state.map((el) => el.id === action.payload.ToDoId ?
//                 {...el, tasks: el.tasks.map(task => task.id === action.payload.TasksId ? {...task, isDone: action.payload.inChecked} : task)} : el)
//         }
//
//
//         case 'SORT-TODO':{
//             return state.map(list => {
//                         if(list.id === action.payload.dropList.id){
//                             return {...list, order: action.payload.currentList?.order ?? 0}
//                         }
//                         if(list.id === action.payload.currentList?.id){
//                             return {...list, order: action.payload.dropList.order ?? 0}
//                         }
//                         return list
//             })
//         }
//         default: return state
//     }
// }
//

// export const changeFilterValueAC = (ToDoId: string, filter: FilterValue)=>{
//     return{
//         type: 'CHANGE-FILTER',
//         payload:{
//             ToDoId,
//             filter
//         }
//     } as const
// }
// export const changeTaskStatusAC = (ToDoId: string, TasksId: string, inChecked: boolean)=>{
//     return{
//         type: 'CHANGE-STATUS',
//         payload:{
//             ToDoId,
//             TasksId,
//             inChecked
//         }
//     } as const
// }
// export const updateToDoOrderAC = (dropList: TodoType, currentList: TodoType | null)=>{
//     return{
//         type: 'SORT-TODO',
//         payload:{
//             dropList,
//             currentList
//         }
//     } as const
// }

// export const changeFilterTC = (ToDoId: string, filter: FilterValue) => (dispatch: AppDispatch) =>{
//     dispatch(changeFilterValueAC(ToDoId, filter))
// }
// export const changeTaskStatusTC = (ToDoID: string, taskID: string, check:boolean) => (dispatch: AppDispatch) =>{
//     dispatch(changeTaskStatusAC(ToDoID,taskID,check))
// }
// export const updateToDoOrderTC = (dropList: TodoType, currentList: TodoType | null)=> (dispatch: AppDispatch)=>{
//     dispatch(updateToDoOrderAC(dropList, currentList))
// }

