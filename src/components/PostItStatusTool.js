import React, { useState, useRef } from "react";
import styled from "styled-components";

import { boldIcon, italicIcon, underlineIcon } from "../assets/editorIcon";

export default function PostItStatusTool() {
  const [content, setContent] = useState(null);
  const [color, setColor] = useState("");
  const divRef = useRef(null);

  const handleInput = () => {
    setContent(divRef.current.innerText);
  };

  const fontSizeArray = Array.from({ length: 100 }, (v, i) => i + 1);

  const handleClickBold = () => {
    const selection = document.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const boldElement = document.createElement("strong");
      boldElement.textContent = selectedText;
      range.deleteContents();
      range.insertNode(boldElement);
    }
  };

  const handleClickItalic = () => {
    const selection = document.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const italicElement = document.createElement("em");
      italicElement.textContent = selectedText;
      range.deleteContents();
      range.insertNode(italicElement);
    }
  };

  const handleClickUnderLine = () => {
    const selection = document.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const underLineElement = document.createElement("u");
      underLineElement.textContent = selectedText;
      range.deleteContents();
      range.insertNode(underLineElement);
    }
  };

  return (
    <>
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
          <Icon src={boldIcon} alt="boldIcon" onClick={handleClickBold} />
          <Icon src={italicIcon} alt="italicIcon" onClick={handleClickItalic} />
          <Icon
            src={underlineIcon}
            alt="underlineIcon"
            onClick={handleClickUnderLine}
          />
        </FormatIcon>
        <FormatColor>
          <Color
            type="color"
            defaultValue="#000000"
            onChange={(e) => setColor(e.target.value)}
          />
          <Color
            type="color"
            defaultValue="#ff0000"
            onChange={(e) => setColor(e.target.value)}
          />
          <Color
            type="color"
            defaultValue="#0000FF"
            onChange={(e) => setColor(e.target.value)}
          />
          <Color
            type="color"
            defaultValue="#808080"
            onChange={(e) => setColor(e.target.value)}
          />
        </FormatColor>
      </ToolStatusField>
      <Wrapper>
        <div
          id="input22"
          style={{
            border: "1px solid",
            height: "400px",
            width: "400px",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: "#ffff33",
          }}
          contentEditable
          ref={divRef}
          onInput={handleInput}
        />
      </Wrapper>
    </>
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

const Wrapper = styled.div`
  width: 100vw;
`;
