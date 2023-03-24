import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectFontUrl, selectFontName } from "../feature/editorSlice";

export default function PostIt() {
  const fontUrl = useSelector(selectFontUrl);
  const fontName = useSelector(selectFontName);
  const divRef = useRef(null);
  const [content, setContent] = useState("");

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

  const handleInput = () => {
    setContent(divRef.current.innerText);
  };

  return (
    <Wrapper>
      <TextBox contentEditable ref={divRef} onInput={handleInput} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;

const TextBox = styled.div`
  border: 1px solid black;
  height: 300px;
  width: 300px;
  top: 40%;
  left: 40%;
  border-radius: 5px;
  position: absolute;
  background-color: #fff000;
`;
