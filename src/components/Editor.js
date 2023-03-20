import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PDFViewer from "./PDFViewer";
import { selectUserId } from "../feature/userSlice";
import Toolbar from "./Toolbar";

export default function Editor() {
  const loginUserId = useSelector(selectUserId);
  const { documentId } = useParams();

  return (
    <Wrapper>
      <Toolbar />
      <PDFViewer url={`/users/${loginUserId}/documents/${documentId}`} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;
