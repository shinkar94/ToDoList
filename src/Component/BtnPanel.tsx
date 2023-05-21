import React, {useCallback} from 'react';
import {changeFilterValueAC, FilterValue} from "../reducer/shopListReducer";
import {useDispatch} from "react-redux";
import styled from "styled-components";

type PropsType = {
    shoplistId: string
    filter: FilterValue
}

export const BtnPanel:React.FC<PropsType> = (props) => {
    const {shoplistId, filter} = props
    const dispatch = useDispatch()
    const changeFilterValue = (shoplistId: string, filter: FilterValue) => {
        dispatch(changeFilterValueAC(shoplistId, filter))
    }
    return (
        <StBtnPanel>
            <button className={filter === "All" ? "activeButton" : ""}
                    onClick={() => changeFilterValue(shoplistId, "All")}
                    disabled={filter === "All"}>All
            </button>
            <button className={filter === "Not to buy" ? "activeButton" : ""}
                    onClick={() => changeFilterValue(shoplistId, "Not to buy")}
                    disabled={filter === "Not to buy"}>Not to buy
            </button>
            <button className={filter === "Bought" ? "activeButton" : ""}
                    onClick={() => changeFilterValue(shoplistId, "Bought")}
                    disabled={filter === "Bought"}>Bought
            </button>
        </StBtnPanel>
    );
};


const StBtnPanel = styled.div`
    position: absolute;
    bottom: 10px;
    button{
      height: 30px;
      width: 80px;
      cursor: pointer;
      background: ${({theme}) => theme.bgItemForm};
      color: ${({theme}) => theme.colorItemForm};
    }
`

