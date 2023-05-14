import React, {ChangeEvent, DragEvent, memo} from 'react';
import styled, {keyframes} from "styled-components";
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
                {mappedGoods}
            </ul>
            <div className={'btnPanel'}>
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
    li{
      display: flex;
      gap: 5px;
      height: 30px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 5px ${({theme}) => theme.boxShadow};
      cursor: pointer;
    }
  }
  .btnPanel{
    position: absolute;
    bottom: 10px;
    button{
      height: 30px;
      width: 80px;
      cursor: pointer;
      background: ${({theme}) => theme.bgItemForm};
      color: ${({theme}) => theme.colorItemForm};
    }
  }
`
