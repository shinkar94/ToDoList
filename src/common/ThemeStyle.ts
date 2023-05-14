export type ThemeType = {
    theme: {
        background: string
        color: string
        boxShadow: string
        shadowItemForm: string
        colorItemForm: string
        bgItemForm: string
    }
}

export const dayTheme:ThemeType = {
    theme: {
        background: 'white',
        color: 'black',
        boxShadow: 'black',
        shadowItemForm: 'black',
        colorItemForm: 'white',
        bgItemForm: '#2a8ea5'
    }
}
export const nightTheme:ThemeType =  {
    theme: {
        background: '#333',
        color: 'white',
        boxShadow: '#020202',
        shadowItemForm: 'black',
        colorItemForm: 'white',
        bgItemForm: 'brown'
    }
}