import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectFontUrl, selectFontName } from "../feature/editorSlice";

export default function PostIt() {
  const fontUrl = useSelector(selectFontUrl);
  const fontName = useSelector(selectFontName);
  const divRef = useRef(null);
  const textBoxRef = useRef(null);
  const [position, setPosition] = useState({ x: 160, y: 190 });
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState("");

  useEffect(() => {
    const getFont = async () => {
      if (fontUrl) {
        const fontFace = new FontFace(`${fontName}`, `url(${fontUrl})`);
        await fontFace.load();
        document.fonts.add(fontFace);

        const editor = textBoxRef.current;
        editor.style.fontFamily = `${fontName}`;
      }
    };

    getFont();
  }, [fontUrl]);

  const handleInput = () => {
    setContent(textBoxRef.current.innerText);
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    setInitialPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      setPosition({
        x: event.clientX - initialPosition.x,
        y: event.clientY - initialPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleDeleteClick = () => {
    divRef.current.remove();
  };

  return (
    <Wrapper>
      <Group
        ref={divRef}
        style={{ left: position.x, top: position.y }}
        onInput={handleInput}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        left={position.x}
        top={position.y}
      >
        <button type="button" onClick={handleDeleteClick}>
          X
        </button>
        <TextBox contentEditable ref={textBoxRef} />
      </Group>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;

const TextBox = styled.div`
  background-color: red;
  height: 300px;
  width: 300px;
  background-color: #fff000;

  &:focus {
    outline: 0;
  }
`;

const Group = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
  background-color: #fff000;
`;
