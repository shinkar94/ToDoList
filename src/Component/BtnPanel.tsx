import React from 'react';
import {FilterValue, todoAction} from "../reducer/TodoListReducer";
import styled from "styled-components";
import {useAppDispatch} from "../hooks/hooks";

type PropsType = {
    ToDoId: string
    filter: FilterValue
}

export const BtnPanel:React.FC<PropsType> = (props) => {
    const {ToDoId, filter} = props
    const dispatch = useAppDispatch()
    const changeFilterValue = (ToDoId: string, filter: FilterValue) => {
        dispatch(todoAction.changeFilter({ToDoId, filter}))
    }
    return (
        <StBtnPanel>
            <button className={filter === "All" ? "activeButton" : ""}
                    onClick={() => changeFilterValue(ToDoId, "All")}
                    disabled={filter === "All"}>All
            </button>
            <button className={filter === "Not to buy" ? "activeButton" : ""}
                    onClick={() => changeFilterValue(ToDoId, "Not to buy")}
                    disabled={filter === "Not to buy"}>Not to buy
            </button>
            <button className={filter === "Bought" ? "activeButton" : ""}
                    onClick={() => changeFilterValue(ToDoId, "Bought")}
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

