import React from 'react';
import {SuperButton} from "../common/SuperButton";
import {EditableSpan} from "../common/EditableSpan";
import {SuperCheckBox} from "../common/SuperCheckBox";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {changeGoodsStatusAC, deleteGoodsAC, GoodType, updateGoodTitleAC} from "../reducer/shopListReducer";
import styled from "styled-components";
type PropsType = {
    shoplistId: string
    filteredGoods: ()=>GoodType[]
}

export const MappedGoods:React.FC<PropsType> = (props) => {
    const {shoplistId, filteredGoods} = props
    const dispatch:Dispatch = useDispatch()
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
    const mappedGoods = filteredGoods().map((el) => {

        return (
            <StLi key={el.id} className={el.inCart ? 'inCart' : ''}>
                <div>
                    <SuperButton title={'x'} callBack={()=>{deleteGoodsHandler(el.id)}} />
                    <EditableSpan oldTitle={el.title} callback={(newTitle)=>{updateGoodTitleHandler(el.id, newTitle)}}/>
                </div>
                <span>in cart: </span>
                <SuperCheckBox checked={el.inCart} callBack={(e)=>{changeGoodsStatusOnChangeHandler(el.id, e)}} />
            </StLi>
        )
    })
    return <>{mappedGoods}</>
};

const StLi = styled.li`
    display: flex;
    gap: 5px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px ${({theme}) => theme.boxShadow};
    cursor: pointer;
`
