import React, {ChangeEvent} from 'react';
import styled from "styled-components";
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
        // <input type="checkbox" checked={checked} onChange={onChangeHandler} />
        <StLable>
            <input type="checkbox" checked={checked} onChange={onChangeHandler}/>
            <span className="checkmark"></span>
        </StLable>
    );
};

const StLable = styled.label`
  position: relative;
  padding-left: 24px;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .checkmark {
    background-color: #2dc501;
    border: none;
  }

  .checkmark {
    position: absolute;
    top: -10px;
    left: 4px;
    height: 20px;
    width: 20px;
    background-color: #ffffff;
    border-radius: 15px;
    border: .5px solid #ccc;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  &:hover input ~ .checkmark {
    background-color: #b20000;
    border: none;
    cursor: pointer;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 7px;
    top: 4px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`






