import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import PDFViewer from "./PDFViewer";
import { selectUserId } from "../feature/userSlice";
import Toolbar from "./Toolbar";
import { setSelectedDocument } from "../feature/editorSlice";
import PostIt from "./PostIt";

export default function Editor() {
  const loginUserId = useSelector(selectUserId);
  const { documentId } = useParams();
  const dispatch = useDispatch();

  dispatch(setSelectedDocument(documentId));

  return (
    <Wrapper>
      <Toolbar />
      <PostIt />
      <PDFViewer
        url={`http://localhost:4000/users/${loginUserId}/documents/${documentId}`}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;

const DocumentWrapper = styled.div`
  width: 100%;
`;
