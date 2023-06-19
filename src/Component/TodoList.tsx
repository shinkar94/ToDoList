import React, {DragEvent, memo} from 'react';
import styled from "styled-components";
import {
    addTaskTC,
    deleteTodoTC,
    FilterValue, StateTasksType,
    TodoType,
    updateTitleTC, updateToDoOrderTC
} from "../reducer/TodoListReducer";
import {EditableSpan} from "../common/EditableSpan";
import {AddItemForm} from "../common/AddItemForm";
import {SuperButton} from "../common/SuperButton";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {MappedGoods} from "./mappedGoods";
import {BtnPanel} from "./BtnPanel";
import {useAppDispatch} from "../hooks/hooks";

type PropsType ={
    title: string
    ToDoId: string
    thisList: TodoType
    currentList: TodoType | null
    setCurrentList: (currentList: TodoType | null)=>void
    tasks: StateTasksType[]
    filter: FilterValue
}

export const TodoList:React.FC<PropsType> = memo((props) => {
    const {ToDoId,title, thisList, currentList,tasks,filter, setCurrentList} = props
    const dispatch = useAppDispatch()
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const filteredTasks = ()=>{
        return filter === 'Not to buy'
            ? tasks.filter(el => el.isDone !== true)
            : filter === 'Bought' ? tasks.filter(el => el.isDone === true) : tasks
    }
    //Drop function
    function dragStartHandler(e:DragEvent<HTMLDivElement>) {
        setCurrentList(thisList)
    }
    function dragEndHandler(e:DragEvent<HTMLDivElement>) {
        // e.currentTarget.style.background = 'white'
        // console.log('end')
    }
    function dragOverHandler(e:DragEvent<HTMLDivElement>) {
        e.preventDefault()
        // e.currentTarget.style.background = 'red'
        // console.log('drag over')
    }
    function dropHandler(e:DragEvent<HTMLDivElement>) {
        e.preventDefault()
        dispatch(updateToDoOrderTC( thisList, currentList))
    }

    //HandlerFunction
    const deleteTodoListHandler = () => {
        dispatch(deleteTodoTC(ToDoId))
    }
    const updateShoplistTitleHandler = (newTitle: string) => {
        dispatch(updateTitleTC(ToDoId, newTitle))
    }
    const addGoodHandler = (newTitle: string) => {
        dispatch(addTaskTC(ToDoId, newTitle))
    }

    return (
        <StShopList
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            <h3>
                <EditableSpan oldTitle={title} callback={updateShoplistTitleHandler}/>
                <SuperButton
                    callBack={deleteTodoListHandler}
                    title={'X'}
                    position={'absolute'}
                    top={'0'}
                    left={'80%'}
                    width={'40px'}
                    borderradius={'0 0 5px 5px'}
                />
            </h3>
            <div>
                <AddItemForm
                    callback={addGoodHandler}
                    borderradius={'0 5px 5px 0px'}
                    height={'48px'}
                    pxboxshadow={'inset -2px 0 5px'}
                />
            </div>
            <ul ref={listRef}>
                <MappedGoods filteredTasks={filteredTasks} ToDoId={ToDoId}/>
            </ul>
            <BtnPanel ToDoId={ToDoId} filter={filter}/>
        </StShopList>
    );
});

const StShopList = styled.div`
  position: relative;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  cursor: grab;
  padding: 10px 10px 40px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px ${({theme}) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  ul{
    list-style-type: none;
    width: 100%;
    box-shadow: inset 0 0 5px black;
    padding: 5px;
    border-radius: 5px;
  }
`
