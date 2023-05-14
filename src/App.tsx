import React, {useState} from 'react';
import './App.css';
import styled from "styled-components";
import {ShopList} from "./Component/ShopList";
import {
  addGoodsAC,
  AddShopListAC, changeFilterValueAC, changeGoodsStatusAC, deleteGoodsAC,
  deleteShopListAC, FilterValue, GoodType,
  NewShopListType, updateGoodTitleAC,
  updateShoplistTitleAC
} from "./reducer/shopListReducer";
import {useAppSelector} from "./hooks/hooks";
import {ShopListSelectors} from "./reducer/selectors";
import {Header} from "./Component/Header/Header";
import {useDispatch} from "react-redux";
import {useAutoAnimate} from "@formkit/auto-animate/react";


function App() {
  const shopList = useAppSelector(ShopListSelectors)
  const dispatch = useDispatch()
  const [divAnimateRef] = useAutoAnimate<HTMLDivElement>()

  const [currentList, setCurrentList] = useState<NewShopListType | null>(null)
  const addGoods = (shoplistId: string, title: string) => {
    dispatch(addGoodsAC(shoplistId, title))
  }
  const deleteGoods = (shoplistId: string, id: string) => {
    dispatch(deleteGoodsAC(shoplistId, id))
  }
  const changeFilterValue = (shoplistId: string, filter: FilterValue) => {
    dispatch(changeFilterValueAC(shoplistId, filter))
  }
  const changeGoodsStatus = (shoplistId: string, goodsId: string, inChecked: boolean) => {
    dispatch(changeGoodsStatusAC(shoplistId, goodsId, inChecked))
  }
  const deleteShopList = (shoplistId: string) => {
    dispatch(deleteShopListAC(shoplistId))
  }
  const addShopList = (shoplistTitle: string) => {
    dispatch(AddShopListAC(shoplistTitle))
  }
  const updateGoodTitle = (shoplistId: string, goodsId: string, newTitle: string) => {
    dispatch(updateGoodTitleAC(shoplistId, goodsId, newTitle))
  }
  const updateShoplistTitle = (shoplistId: string, newTitle: string) => {
    dispatch(updateShoplistTitleAC(shoplistId, newTitle))
  }
  const sortList = (a: NewShopListType, b: NewShopListType)=> {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <ContainerApp >
      <Header addShopList={addShopList}/>
      <ContentWrapper ref={divAnimateRef}>
        {
          shopList.sort(sortList).map(list => {
            let filteredGoods: Array<GoodType> = []
            if (list.filter === 'All') {
              filteredGoods = list.goods
            }
            if (list.filter === 'Not to buy') {
              filteredGoods = list.goods.filter(el => el.inCart !== true)
            }
            if (list.filter === 'Bought') {
              filteredGoods = list.goods.filter(el => el.inCart === true)
            }
            return(
              <ShopList
                  key={list.id}
                  shoplistId={list.id}
                  title={list.title}
                  thisList={list}
                  currentList={currentList}
                  goods={filteredGoods}
                  filter={list.filter}
                  setCurrentList={setCurrentList}
                  deleteShopList={deleteShopList}
                  updateShoplistTitle={updateShoplistTitle}
                  addGoods={addGoods}
                  deleteGoods={deleteGoods}
                  updateGoodTitle={updateGoodTitle}
                  changeFilterValue={changeFilterValue}
                  changeGoodsStatus={changeGoodsStatus}
              />
            )})
        }
      </ContentWrapper>

    </ContainerApp>
  );
}

export default App;

const ContainerApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`