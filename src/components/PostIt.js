import React from "react";
import styled from "styled-components";

import { boldIcon, italicIcon, underlineIcon } from "../assets/editorIcon";

export default function PostIt() {
  const fontSizeArr = [];

  for (let i = 1; i <= 100; i += 1) {
    fontSizeArr.push(i);
  }

  return (
    <ToolStatusField>
      <select>
        <option>Arial</option>
        <option>Verdana</option>
        <option>Times New Roman</option>
        <option>Garamond</option>
        <option>Georgia</option>
        <option>Courier New</option>
        <option>cursive</option>
      </select>
      <select>
        {fontSizeArr.map((size) => {
          return <option>{size}</option>;
        })}
      </select>
      <FormatIcon>
        <Icon src={boldIcon} alt="boldIcon" />
        <Icon src={italicIcon} alt="italicIcon" />
        <Icon src={underlineIcon} alt="underlineIcon" />
      </FormatIcon>
      <FormatColor>
        <Color type="color" value="#000000" />
        <Color type="color" value="#ff0000" />
        <Color type="color" value="#0000FF" />
        <Color type="color" value="#808080" />
      </FormatColor>
    </ToolStatusField>
  );
}

const ToolStatusField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border: 1px solid black;
`;

const FormatIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  padding: 6px;
  border-radius: 10%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const FormatColor = styled.div`
  display: flex;
  align-items: center;
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
