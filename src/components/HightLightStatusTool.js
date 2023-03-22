import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { width1Icon, width2Icon, width3Icon } from "../assets/editorIcon";
import {
  setHighLightWidth,
  setHighLightColor,
  selectHighlightWidth,
} from "../feature/editorSlice";

export default function HightLightStatusTool() {
  const dispatch = useDispatch();
  const highLightWidth = useSelector(selectHighlightWidth);

  const changeWidth = (width) => {
    dispatch(setHighLightWidth(width));
  };
  const changeColor = (color) => {
    dispatch(setHighLightColor(color));
  };

  return (
    <ToolStatusField>
      <FormatIcon>
        <WidthIcon
          onClick={() => changeWidth(8)}
          type="image"
          src={width1Icon}
          alt="widthThinIcon"
        />
        <WidthIcon
          onClick={() => changeWidth(14)}
          type="image"
          src={width2Icon}
          alt="widthBasicIcon"
        />
        <WidthIcon
          onClick={() => changeWidth(20)}
          type="image"
          src={width3Icon}
          alt="widthThickIcon"
        />
      </FormatIcon>
      <input
        onChange={(e) => changeWidth(e.target.value)}
        defaultValue={highLightWidth}
        type="range"
        min="8"
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
