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
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;
