import React from 'react';
type PropsType = {
    title: string,
    callBack: () => void
}
export const SuperButton:React.FC<PropsType> = (props) => {
    const {title, callBack} = props
    const onClickBtn = ()=>{
        callBack()
    }
    return (
        <button onClick={onClickBtn}>{title}</button>
    );
};