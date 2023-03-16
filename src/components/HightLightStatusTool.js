import React from "react";
import styled from "styled-components";

import { width1Icon, width2Icon, width3Icon } from "../assets/editorIcon";

export default function HightLightStatusTool() {
  return (
    <ToolStatusField>
      <FormatIcon>
        <WidthIcon type="image" src={width1Icon} alt="widthThinIcon" />
        <WidthIcon type="image" src={width2Icon} alt="widthBasicIcon" />
        <WidthIcon type="image" src={width3Icon} alt="widthThickIcon" />
      </FormatIcon>
      <input type="range" min="0.1" max="2.0" />
      <Color type="color" value="#F9F54B" />
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
