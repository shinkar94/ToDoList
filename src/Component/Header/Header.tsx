import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import styled from "styled-components";
import {SuperInput} from "../../common/SuperInput";
import {SuperButton} from "../../common/SuperButton";
import {AddItemForm} from "../../common/AddItemForm";

type HeaderProps = {
    addShopList: (shoplistTitle: string)=>void
}

export const Header:React.FC<HeaderProps> = (props) => {
    const {addShopList} =props

    return (
        <StHeader>
            <AddItemForm callback={addShopList}/>
        </StHeader>
    );
};

const StHeader = styled.div`
  width: 100vw;
  height: 30px;
  background: black;
`