import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import PDFViewer from "./PDFViewer";

export default function Editor() {
  const { documentId } = useParams();
  const userId = "6411a6c3cb484f4eb7ec3ee5";
  console.log("editor_page");
  return (
    <Wrapper>
      <Sidebar />
      <PDFViewer url={`/users/${userId}/documents/${documentId}`} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;
