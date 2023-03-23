import React, { useState, useRef } from "react";
import styled from "styled-components";

import { boldIcon, italicIcon, underlineIcon } from "../assets/editorIcon";

export default function PostItStatusTool() {
  const [color, setColor] = useState("");

  const fontSizeArray = Array.from({ length: 100 }, (v, i) => i + 1);

  const handleSelection = () => {
    const selection = document.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
    }
  };

  const handleClickBold = () => {
    handleSelection();
  };

  const handleClickItalic = () => {
    handleSelection();
  };

  const handleClickUnderLine = () => {
    handleSelection();
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

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
        {fontSizeArray.map((size) => {
          return <option key={size}>{size}</option>;
        })}
      </select>
      <FormatIcon>
        <Icon src={boldIcon} alt="Bold Button Icon" onClick={handleClickBold} />
        <Icon
          src={italicIcon}
          alt="Italic Button Icon"
          onClick={handleClickItalic}
        />
        <Icon
          src={underlineIcon}
          alt="Underline Button Icon"
          onClick={handleClickUnderLine}
        />
      </FormatIcon>
      <FormatColor>
        <Color
          type="color"
          defaultValue="#000000"
          onChange={handleChangeColor}
        />
        <Color
          type="color"
          defaultValue="#ff0000"
          onChange={handleChangeColor}
        />
        <Color
          type="color"
          defaultValue="#0000FF"
          onChange={handleChangeColor}
        />
        <Color
          type="color"
          defaultValue="#808080"
          onChange={handleChangeColor}
        />
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
