import React from 'react';
import styled from "styled-components";
type PropsType = {
    title: string,
    callBack: () => void
    borderradius?:string
    height?:string
    width?:string
    pxboxshadow?:string
    position?:string
    top?:string
    left?:string
    right?:string
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
            borderradius={style.borderradius}
            height={style.height}
            width={style.width}
            pxboxshadow={style.pxboxshadow}
            right={style.right}
        >{title}</StButton>
    );
};

type StButtonType = {
    borderradius?: string
    height?:string
    pxboxshadow?:string
    width?:string
    position?:string
    top?:string
    left?:string
    right?:string
}
const StButton = styled.button<StButtonType>`
  position: ${({position}) => position};
  top: ${({top}) => top};
  left: ${({left}) => left};
  right: ${({right}) => right};
  border-radius: ${({borderradius}) => borderradius};
  height: ${({height}) => height};
  width: ${({width})=> width};
  border: 0;
  background: ${({theme})=> theme.bgItemForm};
  color: ${({theme}) => theme.colorItemForm};
  cursor: pointer;
  box-shadow: ${({pxboxshadow}) => pxboxshadow} ${({theme}) => theme.shadowItemForm};
`