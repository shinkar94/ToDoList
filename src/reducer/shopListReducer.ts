// import {NewShopListType} from "../App";
import {v1} from "uuid";
// import {FilterValue} from "../Typisation";
export type FilterValue = "All" | "Not to buy" | "Bought"
export type NewShopListType = {
    title: string
    filter: FilterValue
    id: string
    order: number
    goods: GoodType[]
}
export type GoodType = {
    id: string
    title: string
    expectedPrice: string
    realPrice: string
    inCart: boolean
}
const initialState:NewShopListType[] = [
    {
        title: "What to buy",
        filter: "All",
        id: v1(),
        order: 1,
        goods: [
            {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
            {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ]
    },
    {
        title: "What to buy today",
        filter: "All",
        id: v1(),
        order: 2,
        goods: [
            {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
            {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ]
    },
    {
        title: "What Test",
        filter: "All",
        id: v1(),
        order: 3,
        goods: [
            {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
            {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ]
    }
]

export const shopListReducer = (state: NewShopListType[] = initialState, action: ActionType):NewShopListType[]=>{
    switch (action.type) {
        case 'ADD-GOODS':{
            const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
            const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
            const addNewGoods = {
                id: v1(),
                title: action.payload.title,
                expectedPrice: `$${getRandomNumberForExpectedPrice}`,
                realPrice: '$' + getRandomNumberForRealPrice,
                inCart: false
            }
            return state.map((el) => el.id === action.payload.shoplistId ? {...el, goods: [...el.goods, addNewGoods]} : el)
        }
        case 'DELETE-GOODS':{
            return state.map((el) => el.id === action.payload.shoplistId ? {...el, goods: el.goods.filter(g => g.id !== action.payload.id)} : el)
        }
        case 'ADD-SHOPLIST':{
            const orderList = state.length + 1
            const newShopList: NewShopListType = {title: action.payload.shoplistTitle,id:v1(), filter: "All",order: orderList, goods: []}
            return [...state, newShopList]
        }
        case 'DELETE-SHOPLIST':{
            return state.filter((el) => el.id !== action.payload.shoplistId)
        }
        case 'CHANGE-FILTER':{
            return state.map((el) => el.id === action.payload.shoplistId ? {...el, filter: action.payload.filter} : el)
        }
        case 'CHANGE-STATUS':{
            return state.map((el) => el.id === action.payload.shoplistId ?
                {...el, goods: el.goods.map(g => g.id === action.payload.goodsId ? {...g, inCart: action.payload.inChecked} : g)} : el)
        }
        case 'UPDATE-GOODS-TITLE':{
            return state.map((el) => el.id === action.payload.shoplistId ?
                {...el, goods: el.goods.map(g => g.id === action.payload.goodsId ? {...g, title: action.payload.newTitle} : g)} : el)
        }
        case 'UPDATE-SHOPLIST-TITLE':{
            return state.map((el) => el.id === action.payload.shoplistId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'SORT-SHOPLIST':{
            return state.map(list => {
                        if(list.id === action.payload.dropList.id){
                            return {...list, order: action.payload.currentList?.order ?? 0}
                        }
                        if(list.id === action.payload.currentList?.id){
                            return {...list, order: action.payload.dropList.order ?? 0}
                        }
                        return list
            })
        }
        default: return state
    }
}
type ActionType = AddGoodsACType
    | DeleteGoodsACType
    | AddShopListACType
    | DeleteShopListACType
    | ChangeFilterValueAC
    | ChangeGoodsStatusACType
    | UpdateGoodTitleACType
    | UpdateShoplistTitleACType
    | UpdateShoplistOrderType

type AddGoodsACType = ReturnType<typeof addGoodsAC>
type DeleteGoodsACType = ReturnType<typeof deleteGoodsAC>
type AddShopListACType = ReturnType<typeof AddShopListAC>
type DeleteShopListACType = ReturnType<typeof deleteShopListAC>
type ChangeFilterValueAC = ReturnType<typeof changeFilterValueAC>
type ChangeGoodsStatusACType = ReturnType<typeof changeGoodsStatusAC>
type UpdateGoodTitleACType = ReturnType<typeof updateGoodTitleAC>
type UpdateShoplistTitleACType = ReturnType<typeof updateShoplistTitleAC>
type UpdateShoplistOrderType = ReturnType<typeof updateShoplistOrder>

export const addGoodsAC = (shoplistId: string, title: string) =>{
    return{
        type: 'ADD-GOODS',
        payload:{
            shoplistId,
            title
        }
    }as const
}
export const deleteGoodsAC = (shoplistId: string, id: string) =>{
    return{
        type: 'DELETE-GOODS',
        payload:{
            shoplistId,
            id
        }
    }as const
}
export const AddShopListAC = (shoplistTitle: string) =>{
    return{
        type: 'ADD-SHOPLIST',
        payload:{
            shoplistTitle
        }
    }as const
}
export const deleteShopListAC = (shoplistId: string)=>{
    return{
        type: 'DELETE-SHOPLIST',
        payload:{
            shoplistId
        }
    } as const
}
export const changeFilterValueAC = (shoplistId: string, filter: FilterValue)=>{
    return{
        type: 'CHANGE-FILTER',
        payload:{
            shoplistId,
            filter
        }
    } as const
}
export const changeGoodsStatusAC = (shoplistId: string, goodsId: string, inChecked: boolean)=>{
    return{
        type: 'CHANGE-STATUS',
        payload:{
            shoplistId,
            goodsId,
            inChecked
        }
    } as const
}
export const updateGoodTitleAC = (shoplistId: string, goodsId: string, newTitle: string)=>{
    return{
        type: 'UPDATE-GOODS-TITLE',
        payload:{
            shoplistId,
            goodsId,
            newTitle
        }
    } as const
}
export const updateShoplistTitleAC = (shoplistId: string, newTitle: string)=>{
    return{
        type: 'UPDATE-SHOPLIST-TITLE',
        payload:{
            shoplistId,
            newTitle
        }
    } as const
}

export const updateShoplistOrder = (dropList: NewShopListType, currentList: NewShopListType | null)=>{
    return{
        type: 'SORT-SHOPLIST',
        payload:{
            dropList,
            currentList
        }
    } as const
}

