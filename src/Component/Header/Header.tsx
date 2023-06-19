import React, {ChangeEvent, memo} from 'react';
import styled from "styled-components";
import {AddItemForm} from "../../common/AddItemForm";
import {dayTheme, nightTheme, ThemeType} from "../../common/ThemeStyle";

type HeaderProps = {
    addShopList: (shoplistTitle: string)=>void
    setTheme: (theme: ThemeType)=>void
}

export const Header:React.FC<HeaderProps> = memo((props) => {
    const {addShopList, setTheme} =props
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        let status = e.currentTarget.checked
        status ? setTheme(nightTheme) : setTheme(dayTheme)

    }
    return (
        <StHeader>
            <div>
                <AddItemForm
                    callback={addShopList}
                    borderradius={'0 5px 5px 0px'}
                    height={'48px'}
                    pxboxshadow={'inset -2px 0 5px'}
                />
            </div>
            {/*<input onChange={onChangeHandler} type="checkbox"/>*/}
            <StLabel>
                <input onChange={onChangeHandler} type="checkbox" className="check1" />
                    <span></span>
                    <i className="indicator"></i>
            </StLabel>
        </StHeader>
    );
});

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 40px);
  height: 60px;
  padding: 0 20px;
  background: ${({theme}) => theme.background};
  box-shadow: 0 2px 10px ${({theme})=> theme.boxShadow};
  //box-shadow: 0px 0px 10px black;
`

const StLabel = styled.label`
  position: relative;
  padding: 5px 0;
  cursor: pointer;
  input{
    appearance: none;
    display: none;
  }
  input:checked ~ .indicator{
    left: 40px;
  }
  .indicator::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    transition: 00.5s;
    box-shadow: 0 0 2px red,
    0 0 5px red,
    0 0 10px red,
    0 0 15px red,
    0 0 20px red,
    0 0 25px red,
    0 0 30px red,
    0 0 35px red,
    0 0 40px red;
  }
  input:checked ~ .indicator::before{
    background: green;
    box-shadow: 0 0 2px green,
    0 0 5px green,
    0 0 10px green,
    0 0 15px green,
    0 0 20px green,
    0 0 25px green,
    0 0 30px green,
    0 0 35px green,
    0 0 40px green;
  }
  span{
    position: relative;
    display: block;
    width: 80px;
    height: 40px;
    background-color: gray;
    border-radius: 40px;
    box-shadow: inset 0 2px 15px rgba(0, 0, 0, 0.2),
    inset 0 2px 2px rgba(0, 0, 0, 0.2),inset -1px 1px 1px rgba(0, 0, 0, 0.2);
  }
  .indicator{
    position: absolute;
    top: 5px;
    left: 0;
    width: 40px;
    height: 40px;
    background: linear-gradient(to bottom, #444, #222);
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
    transition: 0.5s;
    transform: scale(0.9);
  }
`