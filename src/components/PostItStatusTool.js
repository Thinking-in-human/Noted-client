import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { boldIcon, italicIcon, underlineIcon } from "../assets/editorIcon";
import {
  setSelectedFontUrl,
  setSelectedFontName,
  setPostItFontSize,
} from "../feature/editorSlice";

export default function PostItStatusTool() {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const fontSizeArray = Array.from({ length: 21 }, (v, i) => i + 10);

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

  const handleChangeFont = async (event) => {
    const selectedFont = event.target.value;
    dispatch(setSelectedFontName(selectedFont));
    const response = await axios.get(
      `http://localhost:4000/fonts/${selectedFont}`,
      {
        withCredentials: true,
        responseType: "arraybuffer",
      },
    );
    const fontBuffer = response.data;

    const fontBlob = new Blob([fontBuffer], {
      type: "font/woff2",
    });
    const fontUrl = URL.createObjectURL(fontBlob);

    dispatch(setSelectedFontUrl(fontUrl));
  };

  const handleChangeSize = (event) => {
    dispatch(setPostItFontSize(event.target.value));
  };

  return (
    <ToolStatusField>
      <select onChange={handleChangeFont}>
        <option>Fasthand-Regular</option>
        <option>MavenPro-Regular</option>
        <option>PlayfairDisplay-Regular</option>
        <option>Roboto-Regular</option>
        <option>Rubik-Regular</option>
        <option>RubikIso-Regular</option>
      </select>
      <select onChange={handleChangeSize} defaultValue="10px">
        {fontSizeArray.map((size) => {
          return <option key={size}>{size}px</option>;
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
