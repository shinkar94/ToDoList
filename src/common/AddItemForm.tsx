import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {SuperInput} from "./SuperInput";
import {SuperButton} from "./SuperButton";
import styled from "styled-components";
type PropsType = {
    callback: (title: string) => void
    borderRadius?: string
    height?:string
    pxBoxShadow?: string
}
export const AddItemForm:React.FC<PropsType> = (props) => {
    const {callback, borderRadius, height, pxBoxShadow} = props
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
        <StItemForm>
            <SuperInput title={title} callBack={onChangeInputHandler} onKeyDown={addGoodsOnKeyDownHandler}/>
            <SuperButton
                title={'Add'}
                callBack={addGoodsOnClickHandler}
                borderRadius={borderRadius}
                height={height}
                pxBoxShadow={pxBoxShadow}
            />
            {error && <div className={'error-message'}>{error}</div>}
            {title.length > 15 && <div>
                The length is more than 15 letters.<br/>
                Current length - <strong>{title.length}</strong>
            </div>}
        </StItemForm>
    );
};

const StItemForm = styled.div`
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 10px black;
  border-radius: 5px;
  background: #7F7F7F;
`