import React, {ChangeEvent, DragEvent} from 'react';
import styled from "styled-components";
import {FilterValue, GoodType, NewShopListType, updateShoplistOrder} from "../reducer/shopListReducer";
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
    deleteShopList: (shoplistId: string)=>void
    updateShoplistTitle: (shoplistId: string, newTitle: string)=>void
    addGoods: (shoplistId: string, title: string)=>void
    goods: GoodType[]
    deleteGoods: (shoplistId: string, id: string)=>void
    updateGoodTitle:(shoplistId: string, goodsId: string, newTitle: string)=>void
    filter: FilterValue
    changeFilterValue:(shoplistId: string, filter: FilterValue)=>void
    changeGoodsStatus: (shoplistId: string, goodsId: string, inChecked: boolean)=>void
}
export const ShopList:React.FC<PropsType> = (props) => {
    const {shoplistId,title, thisList, currentList,goods,filter, setCurrentList,deleteShopList,updateShoplistTitle, addGoods,deleteGoods,updateGoodTitle,changeFilterValue, changeGoodsStatus} = props
    const dispatch = useDispatch()
    const [listRef] = useAutoAnimate<HTMLUListElement>()
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
        deleteShopList(shoplistId)
    }
    const updateShoplistTitleHandler = (newTitle: string) => {
        updateShoplistTitle(shoplistId, newTitle)
    }
    const addGoodHandler = (newTitle: string) => {
        addGoods(shoplistId, newTitle)
    }
    //map
    const mappedGoods = goods.map((el) => {
        const deleteGodsHandler = () =>{
            deleteGoods(props.shoplistId, el.id)
        }
        const updateGoodTitleHandler = (newTitle:string) => {
            updateGoodTitle(shoplistId, el.id, newTitle)
        }
        const changeGoodsStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
           changeGoodsStatus(shoplistId, el.id, e.currentTarget.checked)
        }
        return (
            <li key={el.id} className={el.inCart ? 'inCart' : ''}>
                <div>
                    <SuperButton title={'x'} callBack={deleteGodsHandler} />
                    <EditableSpan oldTitle={el.title} callback={updateGoodTitleHandler}/>
                </div>
                <span>in cart: </span>
                <SuperCheckBox checked={el.inCart} onChange={changeGoodsStatusOnChangeHandler} />
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
};

const StShopList = styled.div`
  background: black;
  color: white;
  cursor: grab;
`
