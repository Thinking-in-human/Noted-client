import React from "react";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Document from "./Document";
import Toolbar from "./Toolbar";

export default function Editor() {
  return (
    <Wrapper>
      <Sidebar />
      <DocumentWrapper>
        <Toolbar />
        <Document />
      </DocumentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;

const DocumentWrapper = styled.div``;
