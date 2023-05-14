import React, {ChangeEvent, KeyboardEvent} from 'react';
type PropsType = {
    title: string,
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}
export const SuperInput:React.FC<PropsType> = (props) => {
    const {title, callBack, onKeyDown} = props
    return (
        <input value={title} type="text"  onChange={callBack} onKeyDown={onKeyDown}/>
    );
};