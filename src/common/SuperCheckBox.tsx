import React, {ChangeEvent} from 'react';
type PropsType={
    checked: boolean
    callBack: (e:boolean)=>void
}
export const SuperCheckBox:React.FC<PropsType> = (props) => {
    const {checked, callBack} = props
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={checked} onChange={onChangeHandler} />
    );
};