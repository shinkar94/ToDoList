import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {SuperInput} from "./SuperInput";
type EditableSpanPropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}
export const EditableSpan:React.FC<EditableSpanPropsType> = (props) => {
    const {oldTitle, callback} = props
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(oldTitle)
    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        callback(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
        }
    }
    return (
        edit ?
            <div onBlur={onBlurHandler}>
                <SuperInput title={newTitle} onKeyDown={onKeyDownHandler} callBack={onChangeHandler} />
            </div>
            :
            <span onDoubleClick={onDoubleClickHandler}><strong>{oldTitle}</strong></span>
    );
};