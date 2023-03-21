import React, { useState, useRef } from "react";
import styled from "styled-components";

import { boldIcon, italicIcon, underlineIcon } from "../assets/editorIcon";

export default function PostItStatusTool() {
  const [content, setContent] = useState("Edit me!");

  const divRef = useRef(null);
  const handleInput = () => {
    setContent(divRef.current.innerText);
    console.log(content);
  };
  const handleSelectText = (event) => {
    const selection22 = document.getSelection();

    const cloned = document.getElementById("cloned");
    const astext = document.getElementById("astext");
    console.log(cloned, astext);
    // cloned.innerHTML = astext.innerHTML = "";

    // Clone DOM nodes from ranges (we support multiselect here)
    for (let i = 0; i < selection22.rangeCount; i++) {
      cloned.append(selection22.getRangeAt(i).cloneContents());
    }

    // Get as text
    astext.innerHTML += selection22;

    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    const alltext = range.startContainer;
    const from = range.startOffset;
    const to = range.endOffset;
    const selectedText = range.toString();
    console.log("selection", selection);
    console.log("range", range);
    console.log("alltext", alltext);
    console.log("from", from);
    console.log("to", to);
    console.log("selectedText", selectedText);
  };
  const [color, setColor] = useState("");
  const fontSizeArr = [];

  for (let i = 1; i <= 100; i += 1) {
    fontSizeArr.push(i);
  }
  const handleClickBold = () => {
    const selection = document.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString(); // selection한 값
      const boldElement = document.createElement("strong"); // strong이라는 엘리먼트 추가함.
      boldElement.textContent = selectedText; // strong 엘리먼트에 select한 값 넣음.
      range.deleteContents(); // 원래 선택한 값 지우고
      range.insertNode(boldElement); // 새로 볼드한 값 넣음.
    }

    // 볼드한 글자에 다시 볼드를 적용하면 해제되도록..
  };
  return (
    <>
      <ToolStatusField>
        <FormatIcon>
          <Icon src={boldIcon} alt="boldIcon" onClick={handleClickBold} />
          <Icon src={italicIcon} alt="italicIcon" />
          <Icon src={underlineIcon} alt="underlineIcon" />
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
          }}
          contentEditable
          ref={divRef}
          onInput={handleInput}
          // onSelect={handleSelectText}
        />
      </Wrapper>
      Cloned: <span id="cloned"></span>
      <br />
      As text: <span id="astext"></span>
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
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const TextBox = styled.div`
  border: 1px solid;
  height: 500px;
  width: 500px;
  border-radius: 5px;
`;
