import axios from "axios";

export type JsonTodoType = {
    userId: number,
    id: number,
    title: string
    completed: false
}

const newInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true,
})

export const NewAPI = {
    getToDoList(){
        return newInstance.get<JsonTodoType>('todos/1')
    }
}