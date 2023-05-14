import React, {ChangeEvent, DragEvent, memo} from 'react';
import styled from "styled-components";
import {
    addGoodsAC, changeGoodsStatusAC, deleteGoodsAC,
    deleteShopListAC,
    FilterValue,
    GoodType,
    NewShopListType, updateGoodTitleAC,
    updateShoplistOrder, updateShoplistTitleAC
} from "../reducer/shopListReducer";
import {useDispatch} from "react-redux";
import {EditableSpan} from "../common/EditableSpan";
import {AddItemForm} from "../common/AddItemForm";
import {SuperButton} from "../common/SuperButton";
import {SuperCheckBox} from "../common/SuperCheckBox";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type PropsType ={
    title: string
    shoplistId: string
    thisList: NewShopListType
    currentList: NewShopListType | null
    setCurrentList: (currentList: NewShopListType | null)=>void
    goods: GoodType[]
    filter: FilterValue
    changeFilterValue:(shoplistId: string, filter: FilterValue)=>void

}

export const ShopList:React.FC<PropsType> = memo((props) => {
    const {shoplistId,title, thisList, currentList,goods,filter, setCurrentList,changeFilterValue,} = props
    const dispatch = useDispatch()
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    //Drop function
    let filteredGoods: Array<GoodType> = []
    if (filter === 'All') {
        filteredGoods = goods
    }
    if (filter === 'Not to buy') {
        filteredGoods =goods.filter(el => el.inCart !== true)
    }
    if (filter === 'Bought') {
        filteredGoods = goods.filter(el => el.inCart === true)
    }
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
    const deleteGoodsHandler = (id:string) =>{
        dispatch(deleteGoodsAC(shoplistId, id))
    }
    const updateGoodTitleHandler = (id:string ,newTitle:string) => {
        dispatch(updateGoodTitleAC(shoplistId, id, newTitle))
    }
    const changeGoodsStatusOnChangeHandler = (id:string, e: boolean)=>{
        dispatch(changeGoodsStatusAC(shoplistId, id, e))
    }

    //map
    const mappedGoods = filteredGoods.map((el) => {

        return (
            <li key={el.id} className={el.inCart ? 'inCart' : ''}>
                <div>
                    <SuperButton title={'x'} callBack={()=>{deleteGoodsHandler(el.id)}} />
                    <EditableSpan oldTitle={el.title} callback={(newTitle)=>{updateGoodTitleHandler(el.id, newTitle)}}/>
                </div>
                <span>in cart: </span>
                <SuperCheckBox checked={el.inCart} callBack={(e)=>{changeGoodsStatusOnChangeHandler(el.id, e)}} />
            </li>
        )
    })

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
                <button onClick={deleteTodoListHandler}>X</button>
            </h3>
            <div>
                <AddItemForm callback={addGoodHandler}/>
            </div>
            <ul ref={listRef}>
                {mappedGoods}
            </ul>
            <div>
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
            </div>
        </StShopList>
    );
});

const StShopList = styled.div`
  background: black;
  color: white;
  cursor: grab;
`
