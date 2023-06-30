import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {TodoList} from "./Component/TodoList";
import {todoThunks, TodoType} from "./features/ToDoList/TodoListReducer";
import {useAppDispatch, useAppSelector} from "./common/hooks/hooks";
import {AppSelectors, JsonTodoListSelectors, TodoListSelectors} from "./common/selectors/selectors";
import {Header} from "./Component/Header/Header";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {dayTheme, ThemeType} from "./common/ThemeStyle";
import {ToastContainer} from "react-toastify";
import {Preloader} from "./common/Preloader";
import {jsonThunk} from "./features/ToDoList/JsonTodoSlice";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.color};
  }
`

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(todoThunks.getTodo(""))
        dispatch(jsonThunk.getJsonTodo({countPage: '2'}))
    }, [])
    let todoList = useAppSelector(TodoListSelectors)
    const jsonTodo = useAppSelector(JsonTodoListSelectors)
    const appState = useAppSelector(AppSelectors)


    const [theme, setTheme] = useState<ThemeType>(dayTheme)

    const [divAnimateRef] = useAutoAnimate<HTMLDivElement>()

    const [currentList, setCurrentList] = useState<TodoType | null>(null)

    const addTodo = useCallback((TodolistTitle: string) => {
        dispatch(todoThunks.addTodo(TodolistTitle))
    }, [dispatch])
    const sortList = (a: TodoType, b: TodoType) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }
    const sortedList = [...todoList].sort(sortList)

    return (
        <ThemeProvider theme={theme.theme}>
            <ContainerApp>
                <GlobalStyle/>
                <Header addTodo={addTodo} setTheme={setTheme}/>
                <ContentWrapper ref={divAnimateRef}>
                    {
                        sortedList.map(list => {
                            return (
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
                    {
                        jsonTodo.map(todos => {
                            return(
                                <>
                                    <p>{todos.id}</p>
                                    <p>{todos.title}</p>
                                    <p>{todos.completed}</p>
                                    <p>{todos.userId}</p>
                                </>

                            )
                        })
                    }
                </ContentWrapper>
                {appState.isLoading && <Preloader/>}
            </ContainerApp>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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