import React from 'react';
import styled from "styled-components";

export const Preloader = () => {
    return (
        <StSpan className="loader"></StSpan>
    );
};

const StSpan = styled.span`
  position: fixed;
  bottom: 10px;
  left: 10px;
  //transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 3px solid #c01010;
  border-radius: 50%;
  display: inline-block;
  //position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 106px;
    height: 106px;
    border-radius: 50%;
    border: 5px solid;
    border-color: #FF3D00 transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`