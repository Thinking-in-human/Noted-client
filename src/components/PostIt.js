import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";

import CONSTANT from "../constants/constant";
import {
  selectFontUrl,
  selectFontName,
  setDeletePostIt,
  selectPostItFontSize,
  selectPostItPosition,
  setPostItPosition,
  changeContents,
  selectCurrentPage,
  selectCurrentPostIt,
  setCurrentPostIt,
  selectPostIts,
} from "../feature/editorSlice";

export default function PostIt({ postItId, textBoxRef, onMouseUp }) {
  const fontUrl = useSelector(selectFontUrl);
  const fontName = useSelector(selectFontName);
  const fontSize = useSelector(selectPostItFontSize);
  const postItPosition = useSelector(selectPostItPosition);
  const currentPage = useSelector(selectCurrentPage);
  const [position, setPosition] = useState(postItPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const currentPostIt = useSelector(selectCurrentPostIt);
  const postItInfo = useSelector(selectPostIts)[currentPage][postItId];
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const getFont = async () => {
      try {
        if (fontUrl) {
          const fontFace = new FontFace(`${fontName}`, `url(${fontUrl})`);
          await fontFace.load();
          document.fonts.add(fontFace);

          const editor = divRef.current;
          editor.style.fontFamily = `${fontName}`;
        }
      } catch (error) {
        showBoundary(error);
      }
    };
    getFont();
  }, [fontUrl, fontName, divRef]);

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
    dispatch(setPostItPosition({ currentPage, currentPostIt, position }));
  };

  const handleDeleteClick = () => {
    dispatch(setDeletePostIt({ currentPostIt, currentPage }));
  };

  const setInputContents = (event) => {
    const contents = event.target.textContent;
    dispatch(changeContents({ currentPage, currentPostIt, contents }));
  };

  const handleCurrentPostIt = () => {
    dispatch(setCurrentPostIt(divRef.current.id));
  };

  return (
    <Group
      id={postItId}
      style={{ left: position.x, top: position.y }}
      ref={divRef}
      left={position.x}
      top={position.y}
      fontSize={postItInfo.fontSize}
      onMouseDown={handleCurrentPostIt}
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
      <TextBox
        onInput={(event) => {
          setInputContents(event);
        }}
        type="text"
        onMouseUp={onMouseUp}
        contentEditable
        onMouseDown={handleCurrentPostIt}
        textBoxRef={textBoxRef}
      />
    </Group>
  );
}

const TextBox = styled.div`
  background-color: red;
  height: auto;
  width: ${CONSTANT.POST_IT_SIZE};
  flex-grow: 1;
  background-color: #fff000;

  &:focus {
    outline: 0;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONSTANT.POST_IT_SIZE}px;
  min-height: ${CONSTANT.POST_IT_SIZE}px;
  height: auto;
  padding: 5px;
  border: 1px solid black;
  position: absolute;
  font-size: ${(props) => props.fontSize};
  background-color: #fff000;
  z-index: 3;
  opacity: 0.9;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${CONSTANT.POST_IT_CLOSE_BOX_SIZE}px;
  height: ${CONSTANT.POST_IT_CLOSE_BOX_SIZE}px;
  font-size: ${CONSTANT.POST_IT_CLOSE_TEXT_SIZE}px;
  background-color: #fff000;
`;

const Header = styled.div`
  display: flex;
  width: ${CONSTANT.POST_IT_SIZE}px;
  height: none;
  background-color: #fff000;
`;
