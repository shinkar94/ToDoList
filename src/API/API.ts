import axios, {AxiosResponse} from "axios";


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskTypeAPI[]
}

export type TaskTypeAPI = {
    description: string
    title: string
    status: boolean
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})

export const API = {
    getToDoList(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    addTasks(todolistId: string, title:string){
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    addTodo(title: string){
        return instance.post(`todo-lists`, {title})
    },
    deleteToDo(idTodo: string){
        return instance.delete(`todo-lists/${idTodo}`)
    },
    deleteTask(idTodo: string, idTask: string){
      return instance.delete(`todo-lists/${idTodo}/tasks/${idTask}`)
    },
    updateTitleToDo(idToDo: string, title: string){
        return instance.put<ResponseType,AxiosResponse<ResponseType>, {title: string}>(`/todo-lists/${idToDo}`, {title})
    },
    updateTitleTask(idToDo: string, idTask:string, title:string){
        return instance.put(`todo-lists/${idToDo}/tasks/${idTask}`, {title})
    }
}
