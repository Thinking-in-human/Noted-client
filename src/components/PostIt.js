import React, { useState, useRef } from "react";
import styled from "styled-components";

export default function PostIt() {
  const [content, setContent] = useState(null);
  const divRef = useRef(null);

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
  height: 400px;
  width: 400px;
  border-radius: 5px;
  position: absolute;
  background-color: #fff000;
`;
