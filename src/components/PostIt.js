import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectFontUrl, selectFontName } from "../feature/editorSlice";

export default function PostIt({ divRef, onMouseUp }) {
  const fontUrl = useSelector(selectFontUrl);
  const fontName = useSelector(selectFontName);

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

  return (
    <TextBox onMouseUp={onMouseUp} id="text" contentEditable ref={divRef} />
  );
}

const TextBox = styled.div`
  border: 1px solid black;
  height: 400px;
  width: 400px;
  border-radius: 5px;
  position: absolute;
  background-color: #fff000;
`;
