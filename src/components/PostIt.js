import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import CONSTANT from "../constants/constant";
import {
  setDeletePostIt,
  setPostItPosition,
  changeContents,
  selectCurrentPage,
  selectCurrentPostIt,
  setCurrentPostIt,
  selectPostIts,
} from "../feature/editorSlice";

export default function PostIt({ postItId, onMouseUp }) {
  const currentPage = useSelector(selectCurrentPage);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const currentPostIt = useSelector(selectCurrentPostIt);
  const postItInfo = useSelector(selectPostIts)[currentPage][postItId];
  const [position, setPosition] = useState(postItInfo.position);
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const textBoxRef = useRef(null);

  const replaceCaret = (element) => {
    if (element.innerText.length === 0) {
      element.focus();
    }

    const selection = window.getSelection();

    if (selection !== null) {
      const newRange = document.createRange();
      newRange.selectNodeContents(element);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  useEffect(() => {
    replaceCaret(textBoxRef.current);
  }, [postItInfo.contents]);

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
    const contents = event.target.innerText;
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
        contentEditable
        fontSize={postItInfo.fontSize}
        fontName={postItInfo.fontName}
        onInput={(event) => {
          setInputContents(event);
        }}
        onMouseUp={onMouseUp}
        onMouseDown={handleCurrentPostIt}
        ref={textBoxRef}
        dangerouslySetInnerHTML={{ __html: postItInfo.contents }}
      />
    </Group>
  );
}

const TextBox = styled.div`
  background-color: red;
  height: auto;
  width: ${CONSTANT.POST_IT_SIZE};
  flex-grow: 1;
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => `${props.fontName}`};
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
