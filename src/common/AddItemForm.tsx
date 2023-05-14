import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {SuperInput} from "./SuperInput";
import {SuperButton} from "./SuperButton";
type PropsType = {
    callback: (title: string) => void
}
export const AddItemForm:React.FC<PropsType> = (props) => {
    const {callback} = props
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean | string>(false)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addGoodsOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                callback(title)
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }
    const addGoodsOnClickHandler = () => {
        if (title.trim() !== '') {
            if (title.split('').length < 15) {
                callback(title.trim())
            } else {
                setError('More than 15 symbols !')

            }
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }
    return (
        <>
            <SuperInput title={title} callBack={onChangeInputHandler} onKeyDown={addGoodsOnKeyDownHandler}/>
            <SuperButton title={'add'} callBack={addGoodsOnClickHandler} />
            {error && <div className={'error-message'}>{error}</div>}
            {title.length > 15 && <div>
                The length is more than 15 letters.<br/>
                Current length - <strong>{title.length}</strong>
            </div>}
        </>
    );
};