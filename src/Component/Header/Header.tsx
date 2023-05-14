import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import styled from "styled-components";
import {SuperInput} from "../../common/SuperInput";
import {SuperButton} from "../../common/SuperButton";
import {AddItemForm} from "../../common/AddItemForm";
import {initialStateType} from "../../reducer/ThemeReducer";

type HeaderProps = {
    addShopList: (shoplistTitle: string)=>void
    setTheme: (theme: initialStateType)=>void
}

export const Header:React.FC<HeaderProps> = (props) => {
    const {addShopList, setTheme} =props
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        let status = e.currentTarget.checked
        let dayTheme = {
            theme: {
                background: 'skyblue',
                color: 'white',
                boxShadow: 'black'
            }
        }
        let nightTheme =  {
            theme: {
                background: 'black',
                color: 'white',
                boxShadow: 'gray'
            }
        }
        status ? setTheme(nightTheme) : setTheme(dayTheme)

    }
    return (
        <StHeader>
            <div><AddItemForm callback={addShopList}/></div>
            <input onChange={onChangeHandler} type="checkbox"/>
        </StHeader>
    );
};

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);
  height: 30px;
  padding: 0 20px;
  background: black;
`