

export type initialStateType = {
    theme: {
        background: string
        color: string
        boxShadow: string
    }
}

const initialState = {
    theme: {
        background: 'skyblue',
        color: 'white',
        boxShadow: 'black'
    }
}

export const ThemeReducer = (state:initialStateType = initialState , action:ActionType)=>{
    switch (action.type) {
        case 'CHANGE':{
            return state
        }
        default: return state
    }
}
type ActionType = updateThemeACType
type updateThemeACType = ReturnType<typeof updateThemeAC>
const updateThemeAC = (status: boolean)=>{
    return{
        type: 'CHANGE',
        payload:{
            status
        }
    }as const
}