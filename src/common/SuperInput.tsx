import React, {ChangeEvent, KeyboardEvent} from 'react';
import styled, {keyframes} from "styled-components";
type PropsType = {
    title: string,
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}
export const SuperInput:React.FC<PropsType> = (props) => {
    const {title, callBack, onKeyDown} = props
    return (
        // <input value={title} type="text"  onChange={callBack} onKeyDown={onKeyDown}/>
        <InputBox>
            <input value={title} type="text"  onChange={callBack} onKeyDown={onKeyDown} required={true} />
                <span>Your Text</span>
                <i></i>
        </InputBox>
    );
};

const InputAnim = keyframes`
  0%{background-position-x: 0;}
  100%{background-position-x: 250px;}
`

const InputBox = styled.div`
  position: relative;
  width: 250px;
  height: 30px;
  margin-top: 20px;

  input {
    width: 100%;
    background: transparent;
    color: #fff;
    border: none;
    outline: none;
    box-shadow: none;
    letter-spacing: 0.1em;
    font-size: 18px;

    &:valid ~ span,
    &:focus ~ span {
      color: #fafafa;
      transform: translateY(-22px);
      font-size: 10px;
    }
  }

  input:valid ~ i::before,
  input:focus ~ i::before {
    left: 0;
  }

  span {
    position: absolute;
    top: -5px;
    left: 10px;
    padding: 10px 0 5px;
    color: rgba(252, 252, 252, 1);
    text-transform: uppercase;
    pointer-events: none;
    letter-spacing: 0.1em;
    transition: 0.5s ease-out;
    margin-bottom: 5px;
  }

  i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #333333;
    overflow: hidden;
    //margin-bottom: 5px;

    &::before {
      content: '';
      position: absolute;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #ff1b69);
      animation: ${InputAnim} 2s linear infinite;
      transition: 0.5s;
    }
  }
`