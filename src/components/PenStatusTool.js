import React from "react";
import styled from "styled-components";
import width1Icon from "../assets/icon/width1.png";
import width2Icon from "../assets/icon/width2.png";
import width3Icon from "../assets/icon/width3.png";

export default function PenStatusTool() {
  return (
    <ToolStatusField>
      <WidthIcon type="image" src={width1Icon} alt="widthThinIcon" />
      <WidthIcon type="image" src={width2Icon} alt="widthBasicIcon" />
      <WidthIcon type="image" src={width3Icon} alt="widthThickIcon" />
      <div>
        <input type="range" min="0.1" max="2.0" step="0.05" />
      </div>
      <Color>
        <input type="color" />
      </Color>
    </ToolStatusField>
  );
}

const WidthIcon = styled.input`
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

const ToolStatusField = styled.div`
  display: flex;
  width: 50%;
  border: 1px solid black;
  align-items: center;
  justify-content: space-around;
`;

const Color = styled.div`
  input[type="color"] {
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
  }
`;
