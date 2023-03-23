import React from "react";
import styled from "styled-components";

import Document from "./Document";
import Toolbar from "./Toolbar";

export default function Editor() {
  return (
    <Wrapper>
      <DocumentWrapper>
        <Toolbar />
        <Document />
      </DocumentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;

const DocumentWrapper = styled.div`
  width: 100%;
`;
