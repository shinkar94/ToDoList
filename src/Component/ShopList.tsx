import React, {DragEvent, memo} from 'react';
import styled from "styled-components";
import {
    addGoodsAC,
    deleteShopListAC,
    FilterValue,
    GoodType,
    NewShopListType,
    updateShoplistOrder,
    updateShoplistTitleAC
} from "../reducer/shopListReducer";
import {useDispatch} from "react-redux";
import {EditableSpan} from "../common/EditableSpan";
import {AddItemForm} from "../common/AddItemForm";
import {SuperButton} from "../common/SuperButton";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {MappedGoods} from "./mappedGoods";
import {BtnPanel} from "./BtnPanel";

type PropsType ={
    title: string
    shoplistId: string
    thisList: NewShopListType
    currentList: NewShopListType | null
    setCurrentList: (currentList: NewShopListType | null)=>void
    goods: GoodType[]
    filter: FilterValue
}

export const ShopList:React.FC<PropsType> = memo((props) => {
    const {shoplistId,title, thisList, currentList,goods,filter, setCurrentList} = props
    const dispatch = useDispatch()
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const filteredGoods = ()=>{
        return filter === 'Not to buy'
            ? goods.filter(el => el.inCart !== true)
            : filter === 'Bought' ? goods.filter(el => el.inCart === true) : goods
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
        dispatch(updateShoplistOrder( thisList, currentList))
    }

    //HandlerFunction
    const deleteTodoListHandler = () => {
        dispatch(deleteShopListAC(shoplistId))
    }
    const updateShoplistTitleHandler = (newTitle: string) => {
        dispatch(updateShoplistTitleAC(shoplistId, newTitle))
    }
    const addGoodHandler = (newTitle: string) => {
        dispatch(addGoodsAC(shoplistId, newTitle))
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
                    borderRadius={'0 0 5px 5px'}
                />
            </h3>
            <div>
                <AddItemForm
                    callback={addGoodHandler}
                    borderRadius={'0 5px 5px 0px'}
                    height={'48px'}
                    pxBoxShadow={'inset -2px 0 5px'}
                />
            </div>
            <ul ref={listRef}>
                <MappedGoods filteredGoods={filteredGoods} shoplistId={shoplistId}/>
            </ul>
            <BtnPanel shoplistId={shoplistId} filter={filter}/>
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
