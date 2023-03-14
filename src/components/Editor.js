import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Document from "./Document";

export default function Editor() {
  return (
    <Wrapper>
      <Sidebar />
      <Document />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  background-color: skyblue;
  justify-content: space-between;
  /* align-items: center; */
`;
