import React, { useState, useRef } from "react";
import styled from "styled-components";

export default function PostIt() {
  const [content, setContent] = useState("Edit me!");
  const divRef = useRef(null);
  const handleInput = () => {
    setContent(divRef.current.innerText);
    console.log(content);
  };
  // text box에 글을 쓰면 글이 반영된다. setContent
  // text를 selection으로 잡아서 볼드 버튼을 클릭하면 <b></b>가 적용됨.

  const handleSelectText = (event) => {
    console.log("select");

    const selection = document.getSelection();
    const cloned = document.getElementById("cloned");
    const astext = document.getElementById("astext");
    console.log(cloned, astext);
    // cloned.innerHTML = astext.innerHTML = "";

    // Clone DOM nodes from ranges (we support multiselect here)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Get as text
    astext.innerHTML += selection;
    // const range = selection.getRangeAt(0);
    // const newNode = document.createElement("strong");
    console.log("selection", selection);
    // from.value = area.selectionStart;
    // to.value = area.selectionEnd;
    // console.log("range", range);
    // console.log("newNode", newNode);
    // newNode.innerText = range;
    // range.deleteContents();
    // range.insertNode(newNode);
    // range.setStartAfter(newNode);
    // selection.removeAllRanges();
    // selection.addRange(range);
    // setContent(event.target.innerHTML);
  };

  return (
    <>
      <Wrapper>
        <TextBox
          contentEditable
          ref={divRef}
          onInput={handleInput}
          onSelect={handleSelectText}
        />
      </Wrapper>
      Cloned: <span id="cloned"></span>
      As text: <span id="astext"></span>
    </>
  );
}

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
