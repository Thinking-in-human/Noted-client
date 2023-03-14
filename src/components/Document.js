import React from "react";
import styled from "styled-components";

export default function Document() {
  return (
    <Background>
      <DocumentPage type="text"></DocumentPage>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  background-color: purple;
  justify-content: center;
`;

const DocumentPage = styled.textarea`
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 1rem;
  border: 1px #d3d3d3 solid;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;
