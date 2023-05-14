import React, {ChangeEvent} from 'react';
type PropsType={
    checked: boolean
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void
}
export const SuperCheckBox:React.FC<PropsType> = (props) => {
    const {checked, onChange} = props
    return (
        <input type="checkbox" checked={checked} onChange={onChange} />
    );
};