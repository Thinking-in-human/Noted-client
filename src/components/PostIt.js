import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFontUrl,
  selectFontName,
  selectTextContent,
  setTextContent,
} from "../feature/editorSlice";

export default function PostIt() {
  const fontUrl = useSelector(selectFontUrl);
  const fontName = useSelector(selectFontName);
  const content = useSelector(selectTextContent);

  const dispatch = useDispatch();
  const divRef = useRef(null);

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
    const getFont = async () => {
      if (fontUrl) {
        const fontFace = new FontFace(`${fontName}`, `url(${fontUrl})`);
        await fontFace.load();
        document.fonts.add(fontFace);

        const editor = divRef.current;
        editor.style.fontFamily = `${fontName}`;
      }
    };

    getFont();
  }, [fontUrl]);

  useEffect(() => {
    replaceCaret(divRef.current);
  });

  const handleInput = () => {
    dispatch(setTextContent(divRef.current.innerText));
    // console.log("div", divRef.current.innerText);
  };

  return (
    <Wrapper>
      <TextBox contentEditable ref={divRef} onInput={handleInput}>
        {content}
      </TextBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;

const TextBox = styled.div`
  border: 1px solid black;
  height: 400px;
  width: 400px;
  border-radius: 5px;
  position: absolute;
  background-color: #fff000;
`;
