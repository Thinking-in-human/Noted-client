import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFontUrl,
  selectFontName,
  setDeletePostIt,
  selectPostItFontSize,
  selectPostItPosition,
} from "../feature/editorSlice";

export default function PostIt({ postItId, textBoxRef, onMouseUp }) {
  const fontUrl = useSelector(selectFontUrl);
  const fontName = useSelector(selectFontName);
  const fontSize = useSelector(selectPostItFontSize);
  const postItPosition = useSelector(selectPostItPosition);
  const [position, setPosition] = useState(postItPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.style.fontSize = fontSize;
  }, [fontSize]);

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
  }, [fontUrl, fontName]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setInitialPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - initialPosition.x,
        y: event.clientY - initialPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDeleteClick = () => {
    divRef.current.remove();
    dispatch(setDeletePostIt(divRef.current.id));
  };

  return (
    <Group
      id={postItId}
      style={{ left: position.x, top: position.y }}
      ref={divRef}
      left={position.x}
      top={position.y}
    >
      <Header
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
      >
        <Button type="button" onClick={handleDeleteClick}>
          X
        </Button>
      </Header>
      <TextBox onMouseUp={onMouseUp} contentEditable textBoxRef={textBoxRef} />
    </Group>
  );
}

const TextBox = styled.div`
  background-color: red;
  height: auto;
  width: 200px;
  flex-grow: 1;
  background-color: #fff000;

  &:focus {
    outline: 0;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  min-height: 200px;
  height: auto;
  padding: 5px;
  border: 1px solid black;
  position: absolute;
  background-color: #fff000;
  z-index: 3;
`;

const Button = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 20%;
  text-align: center;
  background-color: #fff000;
`;

const Header = styled.div`
  display: flex;
  width: 200px;
  height: none;
  background-color: #fff000;
`;
