import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {TodoList} from "./Component/TodoList";
import {addTodoTC, getTodoListTC, TodoType} from "./reducer/TodoListReducer";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {ShopListSelectors} from "./reducer/selectors";
import {Header} from "./Component/Header/Header";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {dayTheme, ThemeType} from "./common/ThemeStyle";

const GlobalStyle = createGlobalStyle`
  body{
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.color};
  }
`


function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getTodoListTC())
  }, [])
  const todoList = useAppSelector(ShopListSelectors)
  console.log(todoList)
  const [theme, setTheme] = useState<ThemeType>(dayTheme)

  const [divAnimateRef] = useAutoAnimate<HTMLDivElement>()

  const [currentList, setCurrentList] = useState<TodoType | null>(null)

  const addShopList = useCallback((shoplistTitle: string) => {
    dispatch(addTodoTC(shoplistTitle))
  },[dispatch])
  const sortList = (a: TodoType, b: TodoType)=> {
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
              todoList.sort(sortList).map(list =>{
                  return(
                      <TodoList key={list.id}
                                title={list.title}
                                ToDoId={list.id}
                                thisList={list}
                                currentList={currentList}
                                setCurrentList={setCurrentList}
                                tasks={list.tasks}
                                filter={list.filter}
                      />
                  )
              })
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
  padding: 0 20px;
`