import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import PDFViewer from "./PDFViewer";
import { selectUserId } from "../feature/userSlice";

export default function Editor() {
  const loginUserId = useSelector(selectUserId);
  const { documentId } = useParams();

  return (
    <Wrapper>
      <Sidebar />
      <PDFViewer url={`/users/${loginUserId}/documents/${documentId}`} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;
