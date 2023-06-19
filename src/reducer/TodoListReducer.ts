import {AppDispatch} from "../store/store";
import {API, TaskTypeAPI, TodolistType} from "../API/API";
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

export const todoListReducer = (state:TodoType[] = initialState, action: ActionType):TodoType[]=>{
    switch (action.type) {
        case "GET-TODO":{
            return action.payload.todos.map(el => ({...el, filter: "All", tasks:[], order: Math.abs(el.order)}))
        }
        case "GET-TASK":{
            return state.map(el => el.id === action.payload.ToDoID ? {...el, tasks: action.payload.task} : el)
        }
        case 'ADD-TASK':{
            return state.map((el) => el.id === action.payload.ToDoId ? {...el, tasks: [...el.tasks, action.payload.newtask]} : el)
        }
        case 'DELETE-TASK':{
            return state.map((el) => el.id === action.payload.ToDoId ? {...el, tasks: el.tasks.filter(t => t.id !== action.payload.id)} : el)
        }
        case 'ADD-TODO':{
            const filter:FilterValue = "All"
            const newTodo = {...action.payload.todoList, filter: filter, tasks: []}
            return [...state, newTodo]
        }
        case 'DELETE-TODO':{
            return state.filter((el) => el.id !== action.payload.ToDoID)
        }
        case 'CHANGE-FILTER':{
            return state.map((el) => el.id === action.payload.ToDoId ? {...el, filter: action.payload.filter} : el)
        }
        case 'CHANGE-STATUS':{
            return state.map((el) => el.id === action.payload.ToDoId ?
                {...el, tasks: el.tasks.map(task => task.id === action.payload.TasksId ? {...task, isDone: action.payload.inChecked} : task)} : el)
        }
        case 'UPDATE-TASK-TITLE':{
            return state.map((todo) => todo.id === action.payload.ToDoID ?
                {...todo, tasks: todo.tasks.map(task => task.id === action.payload.TaskId ? {...task, title: action.payload.newTitle} : task)} : todo)
        }
        case 'UPDATE-TODO-TITLE':{
            return state.map((todo) => todo.id === action.payload.ToDoID ? {...todo, title: action.payload.newTitle} : todo)
        }
        case 'SORT-TODO':{
            return state.map(list => {
                        if(list.id === action.payload.dropList.id){
                            return {...list, order: action.payload.currentList?.order ?? 0}
                        }
                        if(list.id === action.payload.currentList?.id){
                            return {...list, order: action.payload.dropList.order ?? 0}
                        }
                        return list
            })
        }
        default: return state
    }
}
type ActionType = AddTaskACType
    | DeleteTaskACType
    | AddTodoACType
    | DeleteTodoACType
    | ChangeFilterValueAC
    | ChangeTaskStatusACType
    | UpdateTaskTitleACType
    | UpdateToDoTitleACType
    | UpdateToDoOrderACType
    | GetTodoListACType
    | getTaskACType

type AddTaskACType = ReturnType<typeof addTaskAC>
type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type AddTodoACType = ReturnType<typeof AddTodoAC>
type DeleteTodoACType = ReturnType<typeof deleteTodoAC>
type ChangeFilterValueAC = ReturnType<typeof changeFilterValueAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
type UpdateToDoTitleACType = ReturnType<typeof updateToDoTitleAC>
type UpdateToDoOrderACType = ReturnType<typeof updateToDoOrderAC>
type GetTodoListACType = ReturnType<typeof getTodoListAC>
type getTaskACType = ReturnType<typeof getTaskAC>

export const addTaskAC = (ToDoId: string, newtask: StateTasksType) =>{
    return{
        type: 'ADD-TASK',
        payload:{
            ToDoId,
            newtask
        }
    }as const
}
export const deleteTaskAC = (ToDoId: string, id: string) =>{
    return{
        type: 'DELETE-TASK',
        payload:{
            ToDoId,
            id
        }
    }as const
}
export const AddTodoAC = (todoList: TodolistType) =>{
    return{
        type: 'ADD-TODO',
        payload:{
            todoList
        }
    }as const
}
export const deleteTodoAC = (ToDoID: string)=>{
    return{
        type: 'DELETE-TODO',
        payload:{
            ToDoID
        }
    } as const
}
export const changeFilterValueAC = (ToDoId: string, filter: FilterValue)=>{
    return{
        type: 'CHANGE-FILTER',
        payload:{
            ToDoId,
            filter
        }
    } as const
}
export const changeTaskStatusAC = (ToDoId: string, TasksId: string, inChecked: boolean)=>{
    return{
        type: 'CHANGE-STATUS',
        payload:{
            ToDoId,
            TasksId,
            inChecked
        }
    } as const
}
export const updateTaskTitleAC = (ToDoID: string, TaskId: string, newTitle: string)=>{
    return{
        type: 'UPDATE-TASK-TITLE',
        payload:{
            ToDoID,
            TaskId,
            newTitle
        }
    } as const
}
export const updateToDoTitleAC = (ToDoID: string, newTitle: string)=>{
    return{
        type: 'UPDATE-TODO-TITLE',
        payload:{
            ToDoID,
            newTitle
        }
    } as const
}
export const updateToDoOrderAC = (dropList: TodoType, currentList: TodoType | null)=>{
    return{
        type: 'SORT-TODO',
        payload:{
            dropList,
            currentList
        }
    } as const
}
const getTodoListAC = (todos:TodolistType[] )=>{
    return{
        type: "GET-TODO",
        payload:{
            todos
        }
    }as const
}
const getTaskAC = (ToDoID: string, task: StateTasksType[])=>{
    return{
        type: "GET-TASK",
        payload: {
            ToDoID,
            task
        }
    }as const
}

export const getTodoListTC = () => async (dispatch: AppDispatch)=>{
    try {
        let result = await API.getToDoList()
        dispatch(getTodoListAC(result.data))
        result.data.map(todo => dispatch(getTaskTC(todo.id)))
    }catch (e){
        console.log(e)
    }
}
export const getTaskTC = (ToDoID: string) => async (dispatch: AppDispatch)=>{
    try {
        let result = await API.getTasks(ToDoID)
        // let task = result.data.items.filter(el => el.todoListId === ToDoID)
        let task = result.data.items.map(el => ({...el, isDone: false}))
        dispatch(getTaskAC(ToDoID, task))
    }catch (e) {
        console.log(e)
    }
}
export const addTaskTC = (ToDoID: string, title: string) => async (dispatch: AppDispatch) =>{
    try {
        let result = await API.addTasks(ToDoID, title)
        dispatch(addTaskAC(ToDoID, result.data.data.item))
    }catch (e) {
        console.log(e)
    }
}
export const addTodoTC = (title: string) => async (dispatch: AppDispatch)=>{
    try {
        let response = await API.addTodo(title)
        dispatch(AddTodoAC(response.data.data.item))
    }catch (e){
        console.log(e)
    }
}
export const deleteTodoTC = (idToDO: string) => async (dispatch: AppDispatch)=>{
    try {
        let response = await API.deleteToDo(idToDO)
        dispatch(deleteTodoAC(idToDO))
    }catch (e) {
        console.log(e)
    }
}
export const deleteTaskTC = (idToDo: string, idTask: string) => async (dispatch: AppDispatch) =>{
    try {
        let response = await API.deleteTask(idToDo, idTask)
        dispatch(deleteTaskAC(idToDo, idTask))
    }catch (e) {
        console.log(e)
    }
}
export const changeFilterTC = (ToDoId: string, filter: FilterValue) => (dispatch: AppDispatch) =>{
    dispatch(changeFilterValueAC(ToDoId, filter))
}
export const changeTaskStatusTC = (ToDoID: string, taskID: string, check:boolean) => (dispatch: AppDispatch) =>{
    dispatch(changeTaskStatusAC(ToDoID,taskID,check))
}
export const updateTitleTC = (ToDoID:string, newTitle: string)=> async (dispatch: AppDispatch) =>{
    try {
        let response = await API.updateTitleToDo(ToDoID, newTitle)
        dispatch(updateToDoTitleAC(ToDoID,newTitle))
    }catch (e) {
        console.log(e)
    }
}
export const updateTitleTaskTC = (ToDoID:string, taskID:string, newTitle: string)=> async (dispatch: AppDispatch)=>{
    try {
        let response = await API.updateTitleTask(ToDoID,taskID,newTitle)
        dispatch(updateTaskTitleAC(ToDoID,taskID,newTitle))
    }catch (e) {
        console.log(e)
    }
}
export const updateToDoOrderTC = (dropList: TodoType, currentList: TodoType | null)=> (dispatch: AppDispatch)=>{
    dispatch(updateToDoOrderAC(dropList, currentList))
}

