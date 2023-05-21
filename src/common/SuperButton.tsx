import React from 'react';
import styled from "styled-components";
type PropsType = {
    title: string,
    callBack: () => void
    borderRadius?:string
    height?:string
    width?:string
    pxBoxShadow?:string
    position?:string
    top?:string
    left?:string
}
export const SuperButton:React.FC<PropsType> = (props) => {
    const {title, callBack, ...style} = props

    const onClickBtn = ()=>{
        callBack()
    }
    return (
        <StButton
            onClick={onClickBtn}
            position={style.position}
            top={style.top}
            left={style.left}
            borderRadius={style.borderRadius}
            height={style.height}
            width={style.width}
            pxBoxShadow={style.pxBoxShadow}
        >{title}</StButton>
    );
};

type StButtonType = {
    borderRadius?: string
    height?:string
    pxBoxShadow?:string
    width?:string
    position?:string
    top?:string
    left?:string
}
const StButton = styled.button<StButtonType>`
  position: ${({position}) => position};
  top: ${({top}) => top};
  left: ${({left}) => left};
  border-radius: ${({borderRadius}) => borderRadius};
  height: ${({height}) => height};
  width: ${({width})=> width};
  border: 0;
  background: ${({theme})=> theme.bgItemForm};
  color: ${({theme}) => theme.colorItemForm};
  cursor: pointer;
  box-shadow: ${({pxBoxShadow}) => pxBoxShadow} ${({theme}) => theme.shadowItemForm};
`