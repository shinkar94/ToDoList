import React, {useCallback, useState} from 'react';
import './App.css';
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {ShopList} from "./Component/ShopList";
import {AddShopListAC, changeFilterValueAC, FilterValue, GoodType, NewShopListType} from "./reducer/shopListReducer";
import {useAppSelector} from "./hooks/hooks";
import {ShopListSelectors} from "./reducer/selectors";
import {Header} from "./Component/Header/Header";
import {useDispatch} from "react-redux";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {initialStateType} from "./reducer/ThemeReducer";

const GlobalStyle = createGlobalStyle`
  body{
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.color};
  }
`


function App() {
  const shopList = useAppSelector(ShopListSelectors)
  // const theme = useAppSelector(state => state.theme)
  const [theme, setTheme] = useState<initialStateType>({
    theme: {
      background: 'skyblue',
      color: 'white',
      boxShadow: 'black'
    }
  })

  const dispatch = useDispatch()
  const [divAnimateRef] = useAutoAnimate<HTMLDivElement>()

  const [currentList, setCurrentList] = useState<NewShopListType | null>(null)

  const changeFilterValue = useCallback((shoplistId: string, filter: FilterValue) => {
    dispatch(changeFilterValueAC(shoplistId, filter))
  },[dispatch])
  const addShopList = useCallback((shoplistTitle: string) => {
    dispatch(AddShopListAC(shoplistTitle))
  },[dispatch])
  const sortList = (a: NewShopListType, b: NewShopListType)=> {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
      <ThemeProvider theme={theme.theme}>
        <ContainerApp >
          <GlobalStyle />
          <Header addShopList={addShopList} setTheme={setTheme}/>
          <ContentWrapper ref={divAnimateRef}>
            {
              shopList.sort(sortList).map(list => {
                return(
                  <ShopList
                      key={list.id}
                      shoplistId={list.id}
                      title={list.title}
                      thisList={list}
                      currentList={currentList}
                      goods={list.goods}
                      filter={list.filter}
                      setCurrentList={setCurrentList}
                      changeFilterValue={changeFilterValue}
                  />
                )})
            }
          </ContentWrapper>

        </ContainerApp>
      </ThemeProvider>
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