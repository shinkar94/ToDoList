import React from 'react';
import {SuperButton} from "../common/SuperButton";
import {EditableSpan} from "../common/EditableSpan";
import {SuperCheckBox} from "../common/SuperCheckBox";
import {
    changeTaskStatusTC,
    deleteTaskTC,
    StateTasksType,
    updateTitleTaskTC
} from "../reducer/TodoListReducer";
import styled from "styled-components";
import {useAppDispatch} from "../hooks/hooks";

type PropsType = {
    ToDoId: string
    filteredTasks: ()=>StateTasksType[]
}

export const MappedGoods:React.FC<PropsType> = (props) => {
    const {ToDoId, filteredTasks} = props
    const dispatch = useAppDispatch()
    const deleteGoodsHandler = (id:string) =>{
        dispatch(deleteTaskTC(ToDoId, id))
    }
    const updateGoodTitleHandler = (id:string ,newTitle:string) => {
        dispatch(updateTitleTaskTC(ToDoId, id, newTitle))
    }
    const changeGoodsStatusOnChangeHandler = (id:string, e: boolean)=>{
        dispatch(changeTaskStatusTC(ToDoId, id, e))
    }
    //map
    const mappedGoods = filteredTasks().map((el:StateTasksType) => {

        return (
            <StLi key={el.id} className={el.isDone ? 'inCart' : ''}>
                <SuperCheckBox checked={el.isDone} callBack={(e)=>{changeGoodsStatusOnChangeHandler(el.id, e)}} />
                <div>
                    <EditableSpan oldTitle={el.title} callback={(newTitle)=>{updateGoodTitleHandler(el.id, newTitle)}}/>
                    <SuperButton title={'x'}
                                 callBack={()=>{deleteGoodsHandler(el.id)}}
                                 position={'absolute'}
                                 right={'0'}
                                 top={'0'}
                                 width={'30px'}
                                 borderradius={'0px 5px 5px 0px'}
                                 height={'100%'}/>
                </div>
            </StLi>
        )
    })
    return <>{mappedGoods}</>
};

const StLi = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px ${({theme}) => theme.boxShadow};
    cursor: pointer;
`
