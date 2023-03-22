import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { width1Icon, width2Icon, width3Icon } from "../assets/editorIcon";
import {
  setPencilWidth,
  setPencilColor,
  selectPencilWidth,
} from "../feature/editorSlice";

export default function PenStatusTool() {
  const dispatch = useDispatch();
  const pencilWidth = useSelector(selectPencilWidth);

  const changeWidth = (width) => {
    dispatch(setPencilWidth(width));
  };
  const changeColor = (color) => {
    dispatch(setPencilColor(color));
  };

  return (
    <ToolStatusField>
      <FormatIcon>
        <WidthIcon
          onClick={() => changeWidth(2)}
          type="image"
          src={width1Icon}
          alt="widthThinIcon"
        />
        <WidthIcon
          onClick={() => changeWidth(5)}
          type="image"
          src={width2Icon}
          alt="widthBasicIcon"
        />
        <WidthIcon
          onClick={() => changeWidth(8)}
          type="image"
          src={width3Icon}
          alt="widthThickIcon"
        />
      </FormatIcon>
      <input
        onMouseUp={(e) => changeWidth(e.target.value)}
        type="range"
        defaultValue={pencilWidth}
        min="2"
        max="40"
      />
      <Color onChange={(e) => changeColor(e.target.value)} type="color" />
    </ToolStatusField>
  );
}

const FormatIcon = styled.div`
  display: flex;
  align-items: center;
`;

const WidthIcon = styled.input`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  border-radius: 10%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const ToolStatusField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border: 1px solid black;
`;

const Color = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;

  &::-webkit-color-swatch {
    border-radius: 50%;
  }
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;
