import React from "react";
import styled from "styled-components";

export default function Document() {
  return (
    <Background>
      <DocumentPage type="text" />
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DocumentPage = styled.textarea`
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 4rem;
  border: 1px #d3d3d3 solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: white;
`;
