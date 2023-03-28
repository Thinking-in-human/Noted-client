import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectUserId } from "../feature/userSlice";
import PDFViewer from "./PDFViewer";
import Toolbar from "./Toolbar";

export default function Editor() {
  const loginUserId = useSelector(selectUserId);
  const { documentId } = useParams();

  return (
    <Wrapper>
      <Toolbar />
      {loginUserId && documentId && (
        <PDFViewer
          url={`http://localhost:4000/users/${loginUserId}/documents/${documentId}`}
          documentId={documentId}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;
